"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StreamingCard } from "./StreamingCard";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { IMovie_Api } from "@app/api/movies";

const MovieSearch = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<IMovie_Api[]>([] as IMovie_Api[]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Número de itens por página
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(
    async (pageNumber: number, searchTitle: string) => {
      try {
        console.log("Chamei o fetch");
        const response = await axios.post(
          "http://localhost:5000/movies/findOrAddMovie",
          {
            title: searchTitle,
            page: pageNumber,
            limit,
          },
        );

        if (response.data.movies) {
          if (response.data.movies.length < limit) {
            setHasMore(false);
          }
          setMovies((prevMovies: IMovie_Api[]) => [
            ...prevMovies,
            ...response.data.movies,
          ]);
          setPage(response.data.page);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
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
    console.log("Passei pelo useEffect");
    if (title) {
      debouncedFetchMovies(title);
    }
    // Limpar debounce na desmontagem do componente
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

  return (
    <div className="mb-4 flex h-[84vh] w-[15vw] flex-col p-4">
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
      <div className="hide-scrollbar mb-4 flex-grow overflow-y-auto">
        {movies.length !== 0 ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMoreMovies}
            hasMore={hasMore}
            style={{ overflow: "hidden" }}
            loader={<LoadingSpinner />}
            endMessage={
              <p className="mt-4">
                <div className="mx-4 mb-4 border-t-2 border-primary"></div>
                Sem Mais Streamings para serem Mostrados
              </p>
            }
          >
            <div className="grid grid-cols-1 gap-4">
              {movies.map((movie, index) => (
                <div key={index}>
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
          <div>TODO, Listar os mais novos Streamings. </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
