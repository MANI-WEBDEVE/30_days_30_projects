"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// type NumberGuessingState = {
//   gameStarted: boolean;
//   gameOver: boolean;
//   paused: boolean;
//   targetNumber: number;
//   userGuess: number | string;
//   attempts: number;
// };

/**
 * The Number Guessing Game component
 *
 * This component renders a game where the user has to guess a number between 1 and 10.
 * The user can start the game, pause and resume it, and submit their guess.
 * The component displays the number of attempts the user has made and the result of the game.
 */
function GuessNumber(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [pausedGame, setPausedGame] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>();
  const [userGuessNumber, setUserGuessNumber] = useState<number | string>("");
  const [attempUser, setAttempUser] = useState<number>(0);

  // useEffect to generate a new target number when the game starts or resumes
  useEffect(() => {
    console.log("Strat now")
    if (gameStarted && !pausedGame) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      console.log(randomNumber)
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, pausedGame]);

  const handleStartGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setPausedGame(false)
    setAttempUser(0)
  };

  const handlePauseGame = () => {
    setPausedGame(true)
  };

  const handleResumeGame = () => {
    setPausedGame(false)
  };

  const handleGuess = (): void => {
    if (
      typeof userGuessNumber === "number" &&
      userGuessNumber === targetNumber
    ) {
      setGameOver(true);
      // setPausedGame(true);
    } else {
      setAttempUser(attempUser + 1);
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuessNumber("");
    setAttempUser(0);
  };

  const handleUserGuess = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserGuessNumber(Number(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-700 to-black w-full">
      <div className="bg-neutral-700/30 rounded-lg shadow-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-whie">
          Number Guessing Game
        </h1>
        <p className="text-center text-white mb-4">
          Try to guess the number between 1 and 10!
        </p>
        {/* 
          If the game has not started, show the start game button 
          When the user click the button, the game will start and the start game button will disappear
          The input field and the pause button will appear
        */}
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-gray-900 hover:bg-gray-700 rounded px-4 py-2"
            >
              Start Game
            </Button>
          </div>
        )}
        {/* 
          If the game has started and the game is not over, show the input field and the pause button 
          When the user click the pause button, the game will pause and the pause button will change to resume button
        */}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {/* 
                If the game is paused, show the resume button. Otherwise, show the pause button 
                When the user click the pause button, the game will pause and the pause button will change to resume button
              */}
              {pausedGame ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              {/* 
                Show the input field for the user's guess 
                When the user type something in the input field, the value of the input field will be updated
              */}
              <Input
                type="number"
                value={userGuessNumber}
                onChange={handleUserGuess}
                className="bg-gray-100 border  text-black border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs font-semibold"
                placeholder="Enter your guess"
              />
              {/* 
                Show the button to submit the guess 
                When the user click the button, the guess will be submitted and the number of attempts will be increased
              */}
              <Button
                onClick={handleGuess}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-neutral-100 font-medium">
              {/* 
                Show the number of attempts 
                When the user submit a guess, the number of attempts will be increased
              */}
              <p>Attempts: {attempUser}</p>
            </div>
          </div>
        )}
        {/* 
          If the game is over, show the game over message and the try again button 
          When the user click the try again button, the game will restart and the game over message will disappear
        */}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-white">
              <h1 className="text-4xl font-extrabold mb-3 text-green-600">You Win <span className="text-3xl mb-5 text-center"> 👌 </span></h1>
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in <span className="font-bold "> {attempUser}</span> attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        <p className="text-blue-400 text-center w-full">Developed by <a href="https://github.com/MANI-WEBDEVE" target="_blank">Muhammad Inam</a></p>

      </div>
    </div>
  );
}

export default GuessNumber;
