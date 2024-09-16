"use client";
import { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const UnitConverter = () => {
  const conversionRates: Record<string, Record<string, number>> = {
    length: {
      "Millimeters (mm)": 1,
      "Centimeters (cm)": 10,
      "Meters (m)": 1000,
      "Kilometers (km)": 1000000,
      "Inches (in)": 25.4,
      "Feet (ft)": 304.8,
      "Yards (yd)": 914.4,
      "Miles (mi)": 1609344,
    },
    weight: {
      "Grams (g)": 1,
      "Kilograms (kg)": 1000,
      "Ounces (oz)": 28.3495,
      "Pounds (lb)": 453.592,
    },
    volume: {
      "Milliliters (ml)": 1,
      "Liters (l)": 1000,
      "Fluid Ounces (fl oz)": 29.5735,
      "Cups (cup)": 240,
      "Pints (pt)": 473.176,
      "Quarts (qt)": 946.353,
      "Gallons (gal)": 3785.41,
    },
  };

  const unitTypes: Record<string, string[]> = {
    length: [
      "Millimeters (mm)",
      "Centimeters (cm)",
      "Meters (m)",
      "Kilometers (km)",
      "Inches (in)",
      "Feet (ft)",
      "Yards (yd)",
      "Miles (mi)",
    ],
    weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
    volume: [
      "Milliliters (ml)",
      "Liters (l)",
      "Fluid Ounces (fl oz)",
      "Cups (cup)",
      "Pints (pt)",
      "Quarts (qt)",
      "Gallons (gal)",
    ],
  };

  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>("");
  const [outputUnit, setOutputUnit] = useState<string | null>("");
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleInputUnitChange = (value: string) => {
    setInputUnit(value);
  };
  const handleOutputUnitChange = (value: string) => {
    setOutputUnit(value);
  };

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(event.target.value));
  };
  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;

      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          console.log(category);
          unitCategory = category;
          break;
        }
      }
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-200">
      <Card className="p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>Unit Converter</CardTitle>
          <CardDescription>
            Convert between different units of measurement.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="sapce-y-2 flex  items-center justify-center gap-4">
            <div className="w-full  ">
              <Label htmlFor="input-value">From</Label>
              <Select  onValueChange={handleInputUnitChange}>
                <SelectTrigger className="rounded-xl border border-black">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem value={unit} key={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor="output-value">To</Label>
              <Select onValueChange={handleOutputUnitChange}>
                <SelectTrigger className="rounded-xl border border-black">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem value={unit} key={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className=" space-y-2 col-span-2 mt-4">
            <Label htmlFor="input-value">Value</Label>
            <Input value={inputValue || ""}  onChange={handleInputValue} placeholder="Enter the Value" className="w-full"/>
          </div>
          <div className="w-full space-y-2 mt-4">
            <Button className="w-full "  onClick={convertValue}>Convert</Button>
          </div>
          <div className="text-center font-bold text-2xl mt-6 sapce-y-2">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-muted-foreground text-center mt-2">
          {outputUnit ? outputUnit : "Unit"}
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitConverter;
