"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

export default function ColorPicker() {
  const { toast } = useToast();
  const [setColor, setSetColor] = useState<string>("#000000");

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSetColor(e.target.value);
  };

  const copyClipBoard = () => {
    navigator.clipboard.writeText(setColor);
    toast({
        description: "Copied to clipboard",
        style:{
            color: `${setColor}`,
            fontWeight: "bold",
           backgroundColor: `white`,
           border: "1px solid black",
           borderRadius: "5px"
        },
       
    })
    
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto p-8 grid gap-8">
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
      </Card>
    </div>
  );
}
