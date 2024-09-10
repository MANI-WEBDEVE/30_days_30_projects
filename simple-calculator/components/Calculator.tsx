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
    const [result, setResult] = useState<string>("")


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
    }

    const handleAdd = () => {
        setResult((parseFloat(firstInput)) + (parseFloat(secondInput)).toString());
    }


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


    return (
        <div>

        </div>
    )
}

export default Calculator
