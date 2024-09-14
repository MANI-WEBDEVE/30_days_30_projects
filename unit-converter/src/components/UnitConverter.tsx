import { useState , useEffect, ChangeEvent} from 'react'
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
        setOutputUnit(value);
      };
      const handleOutputUnitChange = (value: string) => {
        setOutputUnit(value);
      };

      const handleInputValue = (event: ChangeEvent<HTMLInputElement>)  => {
        setInputValue(parseFloat(event.target.value));
      } 
      const convertValue = (): void => {
  if (inputValue !== null && inputUnit && outputUnit) {
    let unitCategory: string | null = null;

for (const category in unitTypes) {
      if (
        unitTypes[category].includes(inputUnit) &&
        unitTypes[category].includes(outputUnit)
      ) {
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
    <div>
      
    </div>
  )
}

export default UnitConverter
