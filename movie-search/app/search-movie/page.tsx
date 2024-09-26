"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

type MovieDetails = {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
};

function page() {
  const [searchMovieName, setSearchMovieName] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const variants = "underlined";

  const handleSearch = async (): Promise<void> => {
    setIsLoading(true);
    setIsError("");
    setMovieDetails(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=hulk&apikey=fc7a7a60`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "false") {
        throw new Error(data.Error);
      }
      setMovieDetails(data);
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const serachVal = (event:ChangeEvent<HTMLInputElement>) => {
    setSearchMovieName(event.target.value)
  }

  return (
    <div className="w-1/2 mt-4  flex items-center justify-center gap-5">
      <Input type="email" variant={variants} label="Movie Name" />
      <Button onClick={handleSearch} variant="ghost" className="mt-4">
        Search
      </Button>
    </div>
  );
}

export default page;
//https://www.omdbapi.com/?i=tt3896198&apikey=fc7a7a60
//  `https://www.omdbapi.com/?t=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
