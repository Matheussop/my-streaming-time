"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StreamingCard } from "./StreamingCard";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";
import { useStreamingType } from "context/AppContext";
import { toast } from "sonner";
import { getCommonMediaByType } from "api/commonContents";
import { ICommonMedia } from "@interfaces/commonMedia";
import { findOrAddMovie, ISearch_Serie_Response } from "api/movies";
import { ISearch_Movie_Response } from "api/movies";

const MovieSearch = () => {
  const [title, setTitle] = useState("");
  const [streaming, setStreaming] = useState<ICommonMedia[]>(
    [] as ICommonMedia[],
  );
  const [topStreamings, setTopStreamings] = useState<ICommonMedia[]>(
    [] as ICommonMedia[],
  );
  const [page, setPage] = useState(1);
  const router = useRouter();
  const currentStreamingType = useStreamingType();

  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const isMovieResponse = (
    response: ISearch_Movie_Response | ISearch_Serie_Response,
  ): response is ISearch_Movie_Response => {
    return (response as ISearch_Movie_Response).movies !== undefined;
  };

  const fetchTopStreaming = useCallback(async () => {
    try {
      const response = await getCommonMediaByType(currentStreamingType);
      const data = response;

      if (data) {
        setTopStreamings(data);
      }
    } catch (err) {
      toast.error(`Erro ao buscar ${currentStreamingType}`);
    }
  }, [currentStreamingType]);

  const fetchStreaming = useCallback(
    async (pageNumber: number, searchTitle: string) => {
      try {
        const response = await findOrAddMovie(
          currentStreamingType,
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
          setStreaming((prevStreaming: ICommonMedia[]) => [
            ...prevStreaming,
            ...data,
          ]);
          setPage(response.page);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        toast.error(`Erro ao buscar ${currentStreamingType}`);
        setHasMore(false);
      }
    },
    [limit, currentStreamingType],
  );

  const debouncedFetchStreaming = useMemo(
    () =>
      debounce((searchTitle: string) => {
        setStreaming([]);
        setPage(1);
        setHasMore(true);
        fetchStreaming(1, searchTitle);
      }, 500),
    [fetchStreaming],
  );

  useEffect(() => {
    if (title) {
      debouncedFetchStreaming(title);
    }

    return () => {
      debouncedFetchStreaming.cancel();
    };
  }, [title, debouncedFetchStreaming, currentStreamingType]);

  useEffect(() => {
    fetchTopStreaming();
  }, [fetchTopStreaming]);
  const loadMoreStreaming = () => {
    fetchStreaming(page + 1, title);
  };

  const handleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleRedirectToDetail = (id: string) => {
    router.push(
      `/streaming-detail/${id}?typeStreaming=${currentStreamingType}`,
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
          className="bg-dark-600 focus-visible:border-primary bg-opacity-85 rounded-2xl border-2 border-zinc-400 ring-offset-transparent outline-hidden focus:ring-0"
        />

        <Button type="button" onClick={() => debouncedFetchStreaming(title)}>
          <Search />
        </Button>
      </form>
      <div
        className="hide-scrollbar mb-4 grow overflow-y-auto"
        id="movie-list-box"
      >
        {streaming.length !== 0 ? (
          <InfiniteScroll
            dataLength={streaming.length}
            next={loadMoreStreaming}
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
              {streaming.map((movie, index) => (
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
                    rate={movie.rating ?? 0}
                    imageUrl={movie.url ?? ""}
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
                  rate={movie.rating ?? 0}
                  imageUrl={movie.url ?? ""}
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
