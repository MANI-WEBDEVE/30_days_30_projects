"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

// interface JokeType {
//   setup: string;
//   punchline: string;
// }

function GenerateJokes() {
  const [jokeSetup, setJokeSetup] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      const joke = `${data.setup} - ${data.punchline}`;
      setJokeSetup(joke);


    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex text-black justify-center items-center h-screen w-full bg-gradient-to-tl from-[#FF9E0D] to-[#FF7951] px-8">
      <div className=" max-w-md space-y-8 p-8 bg-white rounded-lg">
        <h1 className="text-3xl font-bold tracking-tighter ">Random Jokes Generator</h1>
        <div className="p-8 bg-gray-400/10 rounded-lg font-mono ">
          {jokeSetup}
        </div>
        <div>
          <Button className="font-bold px-4 py-3 rounded-xl bg-[#43A147] hover:bg-[#1d802a]" onClick={() => fetchJoke()}>Generate New jOke 🤪</Button>
          {error && <p>{error}</p>}
        </div>

        <p className="text-blue-400 text-center w-full">Developed by <a href="https://github.com/MANI-WEBDEVE" target="_blank">Muhammad Inam</a></p>

      </div>
    </div>
  );
}

export default GenerateJokes;
