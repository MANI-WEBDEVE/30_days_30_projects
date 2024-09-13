"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,

  CardDescription,
  CardFooter,

  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

export default function ColorPicker() {
  const { toast } = useToast();
  const [setColor, setSetColor] = useState<string>("#000000");
  const [rgb1, setRgb1] = useState("#fff");
  const [rgb2, setRgb2] = useState("#000");

  const hexVal = () => {
    let colors = "#";
    const hex = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      colors += hex[Math.floor(Math.random() * 16)];
    }
    return colors;
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSetColor(e.target.value);
  };

  const copyClipBoard = () => {
    navigator.clipboard.writeText(setColor);
    toast({
      description: "Copied to clipboard",
      style: {
        color: `${setColor}`,
        fontWeight: "bold",
        backgroundColor: `white`,
        border: "1px solid black",
        borderRadius: "5px",
      },
    });
  };

  const handleButtonRBG1 = () => {
    setRgb1(hexVal());
    console.log(rgb1);
  };
  const handleButtonRBG2 = () => {
    setRgb2(hexVal());
  };

  const copyGridiantColor = () => {
    navigator.clipboard.writeText(`linear-gradient(45deg, ${rgb1} 0%, ${rgb2} 25%, ${rgb1} 50%, ${rgb2} 75%, ${rgb2} 50%)`);
    toast({
      description: "Copied to gridiant own your  clipboard",
      style: {
        color: `${rgb2}`,
        fontWeight: "bold",
        backgroundColor: `white`,
        border: "1px solid black",
        borderRadius: "5px",
      },
    });
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen  dark:bg-gray-900
    `}
    style={{ backgroundImage: `linear-gradient(45deg, ${rgb1} 0%, ${rgb2} 25%, ${rgb1} 50%, ${rgb2} 75%, ${rgb2} 50%)` }}
    >
      <Card className="w-full max-w-md mx-auto p-8 grid gap-8" >
        <div className="text-center space-y-2">
          <CardTitle>Color Picker</CardTitle>
          <CardDescription>
            Select a color and copy the hex and RGB values.
          </CardDescription>
        </div>
        <div className="grid gap-4">
          <div
            className="w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-800"
            style={{ backgroundColor: setColor }}
          />
          <div className="grid gap-2 text-center">
            <div className="text-2xl font-semibold">{setColor}</div>
            <div className="text-gray-500 dark:text-gray-400">
              RGB: {parseInt(setColor.slice(1, 3), 16)},{" "}
              {parseInt(setColor.slice(3, 5), 16)},{" "}
              {parseInt(setColor.slice(5, 7), 16)}
            </div>
            <Button
              onClick={copyClipBoard}
              variant="default"
              className="w-full"
            >
              Copy to Clipboard
            </Button>
          </div>
          <Input
            type="color"
            value={setColor}
            onChange={handleColorChange}
            className="w-full h-16 p-0 border-0 rounded-md cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center  gap-4">
          <Button className="px-6 py-2" onClick={() => handleButtonRBG1()}>{rgb1}</Button>
          <Button className="px-6 py-2" onClick={() => handleButtonRBG2()}>{rgb2}</Button>
        </div>
        <div className="w-full ">
          <Button onClick={copyGridiantColor} className="w-full">Copy Gridiant Color</Button>
        </div>
        
        <CardFooter> <p className="text-blue-400 text-center w-full">Developed by <a href="https://github.com/MANI-WEBDEVE" target="_blank">Muhammad Inam</a></p></CardFooter>
      </Card>
    </div>
  );
}
