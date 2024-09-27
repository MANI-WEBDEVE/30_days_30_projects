"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
import { CalendarIcon, StarIcon } from "lucide-react";

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
        `https://www.omdbapi.com/?t=${searchMovieName}&apikey=fc7a7a60`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
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

  const searchVal = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchMovieName(event.target.value);
  };

  return (
    <div className="w-full h-full">
      <div className="w-1/2 mt-4  flex items-center justify-center gap-5">
        <Input type="email" variant={variants} label="Movie Name" value={searchMovieName} onChange={searchVal}/>
        <Button onClick={handleSearch} variant="ghost" className="mt-4">
          Search
        </Button>
      </div>
      {isLoading && (
          <Card className="w-[280px] h-[280px] space-y-5 p-4 mt-6" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-6">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">  
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      )}
      {isError && (
        <div className="text-red-500 text-center mb-4">
          {isError}. Please try searching for another movie.
        </div>
      )}
      {movieDetails && (
         <Card className="py-4 w-[280px] mt-6 flex flex-col items-center">
         <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
           <p className="text-tiny uppercase font-bold">
           Genre: <span className="text-default-500">{movieDetails.Genre}</span>
           </p>
           <small className="text-default-500 flex flex-row gap-2 mt-3">
           <span className="flex items-center justify-center gap-2"><CalendarIcon className="w-4 h-4" /> {movieDetails.Released}</span><span className="flex items-center justify-center gap-2"> <StarIcon className="fill-yellow-500 w-4 h-4"/> {movieDetails.imdbRating}</span>
           </small>
           <h1 className="font-bold text-xl mt-3">{movieDetails.Title}</h1>
         </CardHeader>
         <CardBody className="overflow-visible pt-2 ">
           <Image
             alt="Card background"
             className="object-cover rounded-xl"
             src={   movieDetails.Poster !== "N/A"
                ? movieDetails.Poster
                : "/placeholder.svg"}
             width={250}
             height={100}
           />
          
         </CardBody>
       </Card>
      )}
    </div>
  );
}

export default page;
//https://www.omdbapi.com/?i=tt3896198&apikey=fc7a7a60
//  `https://www.omdbapi.com/?t=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
