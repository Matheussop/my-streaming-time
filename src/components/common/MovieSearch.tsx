"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StreamingCard } from "./StreamingCard";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { IMovie } from "@interfaces/movie";
import { findOrAddMovie } from "@app/api/movies";
import { useRouter } from "next/navigation";

const MovieSearch = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([] as IMovie[]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchMovies = useCallback(
    async (pageNumber: number, searchTitle: string) => {
      try {
        const response = await findOrAddMovie(searchTitle, pageNumber, limit);
        console.log(response);
        if (response.movies) {
          if (response.movies.length < limit) {
            setHasMore(false);
          }
          setMovies((prevMovies: IMovie[]) => [
            ...prevMovies,
            ...response.movies,
          ]);
          setPage(response.page);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setHasMore(false);
      }
    },
    [limit],
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
  }, [title, debouncedFetchMovies]);

  const loadMoreMovies = () => {
    fetchMovies(page + 1, title);
  };

  const handleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleRedirectToDetail = (id: string) => {
    router.push(`/streaming-detail/${id}`);
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
          className="rounded-2xl border-2 border-zinc-400 bg-dark-600 bg-opacity-85 outline-none ring-offset-transparent focus:ring-0 focus-visible:border-primary"
        />

        <Button type="button" onClick={() => debouncedFetchMovies(title)}>
          <Search />
        </Button>
      </form>
      <div
        className="hide-scrollbar mb-4 flex-grow overflow-y-auto"
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
                <div className="mx-4 mb-4 border-t-2 border-primary"></div>

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
                    type={"Action"}
                    rate={movie.rating}
                    imageUrl={movie.url}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="flex text-center">
            <p>TODO, Listar os mais novos Streamings. </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
