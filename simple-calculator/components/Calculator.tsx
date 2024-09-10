"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";

function Calculator() {
    const [firstInput, setFirstInput] = useState<string>("");
    const [secondInput, setSecondInput] = useState<string>("");
    const [result, setResult] = useState<string>("");

    /**
     * Handles changes to the first input field.
     *
     * @param {ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleFirstInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setFirstInput(e.target.value);
    };

    /**
     * Handles changes to the first input field.
     *
     * @param {ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleSecondInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setSecondInput(e.target.value);
    };

    const handleAdd = (): void => {
        setResult((parseFloat(firstInput) + parseFloat(secondInput)).toString());
    };

    const handleSubtract = (): void => {
        setResult((parseFloat(firstInput) - parseFloat(secondInput)).toString());
    };
    const handleMultiply = (): void => {
        setResult((parseFloat(firstInput) * parseFloat(secondInput)).toString());
    };
    const handleDivide = (): void => {
        if (parseFloat(secondInput) !== 0) {
            setResult((parseFloat(firstInput) / parseFloat(secondInput)).toString());
        } else {
            setResult("Error: Division by zero");
        }
    };

    const handleClear = (): void => {
        console.log("lo");
        setFirstInput("");
        setSecondInput("");
        setResult("");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-500/50 w-full">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Calculator</CardTitle>
                    <CardDescription>Simple Calculator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="max-w-md p-8 bg-white w-full rounded-lg shadow-xl text-black">
                        <div className=" flex items-center justify-center gap-2 mt-3">
                            <div>
                                <Label htmlFor="num1">Number 1</Label>
                                <Input
                                    value={firstInput}
                                    onChange={handleFirstInput}
                                    type="number"
                                    placeholder="Enter the First Number"
                                />
                            </div>
                            <div>
                                <Label htmlFor="num1">Number 2</Label>
                                <Input
                                    value={secondInput}
                                    onChange={handleSecondInput}
                                    type="number"
                                    placeholder="Enter the Second Number"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center  gap-4 mt-4">
                            <div className=" ">
                                <Button
                                    className="bg-white border-[1px]   border-gray-500 hover:bg-slate-300 shadow-xl text-black px-8 py-2"
                                    onClick={handleAdd}
                                >
                                    +
                                </Button>
                            </div>
                            <div className=" ">
                                <Button
                                    className="bg-white border-[1px]   border-gray-500 hover:bg-slate-300 shadow-xl text-black px-8 py-2"
                                    onClick={handleSubtract}
                                >
                                    {" "}
                                    -{" "}
                                </Button>
                            </div>
                            <div className=" ">
                                <Button
                                    className="bg-white border-[1px]   border-gray-500 hover:bg-slate-300 shadow-xl text-black px-8 py-2"
                                    onClick={handleMultiply}
                                >
                                    {" "}
                                    *{" "}
                                </Button>
                            </div>
                            <div className=" ">
                                <Button
                                    className="bg-white border-[1px]    border-gray-500 hover:bg-slate-300 shadow-xl text-black px-8 py-2"
                                    onClick={handleDivide}
                                >
                                    {" "}
                                    /{" "}
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-full mt-4 ">
                            <Input placeholder="Result" value={result} />
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <Button
                                className="bg-white border-[1px]   border-gray-500 hover:bg-slate-300 shadow-xl text-black px-8 py-2 mt-4"
                                onClick={handleClear}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Calculator;
