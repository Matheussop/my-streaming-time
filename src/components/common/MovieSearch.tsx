"use client";
import React, { useState, useEffect, useCallback, useMemo, use } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StreamingCard } from "./StreamingCard";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { IMovie } from "@interfaces/movie";
import {
  findOrAddMovie,
  getCommonMedia,
  ISearch_Movie_Response,
  ISearch_Serie_Response,
} from "@app/api/movies";
import { useRouter } from "next/navigation";
import { useAppContext } from "@app/context/AppContext";
import { toast } from "sonner";

const MovieSearch = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([] as IMovie[]);
  const [topStreamings, setTopStreamings] = useState<IMovie[]>([] as IMovie[]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { getStreamingTypeContext } = useAppContext();

  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const isMovieResponse = (
    response: ISearch_Movie_Response | ISearch_Serie_Response,
  ): response is ISearch_Movie_Response => {
    return (response as ISearch_Movie_Response).movies !== undefined;
  };

  const fetchTopStreaming = useCallback(async () => {
    try {
      const response = await getCommonMedia(getStreamingTypeContext);
      const data = response.media;

      if (data) {
        setTopStreamings(data);
      }
    } catch (err) {
      toast.error(`Erro ao buscar ${getStreamingTypeContext}`);
    }
  }, [getStreamingTypeContext]);

  const fetchMovies = useCallback(
    async (pageNumber: number, searchTitle: string) => {
      try {
        const response = await findOrAddMovie(
          getStreamingTypeContext,
          searchTitle,
          pageNumber,
          limit,
        );
        setTopStreamings([]);
        const data = isMovieResponse(response)
          ? response.movies
          : response.series;

        if (data) {
          if (data.length < limit) {
            setHasMore(false);
          }
          setMovies((prevMovies: IMovie[]) => [...prevMovies, ...data]);
          setPage(response.page);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        toast.error(`Erro ao buscar ${getStreamingTypeContext}`);
        setHasMore(false);
      }
    },
    [limit, getStreamingTypeContext],
  );

  const debouncedFetchMovies = useMemo(
    () =>
      debounce((searchTitle: string) => {
        setMovies([]);
        setPage(1);
        setHasMore(true);
        fetchMovies(1, searchTitle);
      }, 500),
    [fetchMovies],
  );

  useEffect(() => {
    if (title) {
      debouncedFetchMovies(title);
    }

    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [title, debouncedFetchMovies, getStreamingTypeContext]);

  useEffect(() => {
    fetchTopStreaming();
  }, [fetchTopStreaming]);
  const loadMoreMovies = () => {
    fetchMovies(page + 1, title);
  };

  const handleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleRedirectToDetail = (id: string) => {
    router.push(
      `/streaming-detail/${id}?typeStreaming=${getStreamingTypeContext}`,
    );
  };

  return (
    <div className="mb-4 flex h-[84vh] w-[15vw] flex-col p-2">
      <form
        className="mb-4 flex items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Pesquisar"
          className="bg-dark-600 outline-hidden focus-visible:border-primary rounded-2xl border-2 border-zinc-400 bg-opacity-85 ring-offset-transparent focus:ring-0"
        />

        <Button type="button" onClick={() => debouncedFetchMovies(title)}>
          <Search />
        </Button>
      </form>
      <div
        className="hide-scrollbar mb-4 grow overflow-y-auto"
        id="movie-list-box"
      >
        {movies.length !== 0 ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMoreMovies}
            hasMore={hasMore}
            scrollableTarget="movie-list-box"
            style={{ overflow: "hidden" }}
            loader={<LoadingSpinner />}
            endMessage={
              <div className="mt-4 text-center">
                <div className="border-primary mx-4 mb-4 border-t-2"></div>

                <p>Sem mais streamings para serem mostrados</p>
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-2">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="cursor-pointer pb-2"
                  onClick={() => handleRedirectToDetail(movie._id)}
                >
                  <StreamingCard
                    title={movie.title}
                    type={
                      typeof movie.genre[0] === "object"
                        ? movie.genre[0].name
                        : "Unknown"
                    }
                    rate={movie.rating}
                    imageUrl={movie.url}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : topStreamings.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {topStreamings.map((movie, index) => (
              <div
                key={index}
                className="cursor-pointer pb-2"
                onClick={() => handleRedirectToDetail(movie._id)}
              >
                <StreamingCard
                  title={movie.title}
                  type={
                    typeof movie.genre[0] === "object"
                      ? movie.genre[0].name
                      : "Unknown"
                  }
                  rate={movie.rating}
                  imageUrl={movie.url}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 text-center">
            <div className="border-primary mx-4 mb-4 border-t-2"></div>

            <p>Sem mais streamings para serem mostrados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
