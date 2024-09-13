"use client";
import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function BmiCalculate() {
  const {toast} =  useToast()
    const [heigthInput, setHeigthInput] = useState<string>("")
    const [weightInput, setWeightInput] = useState<string>("")
    const [totalBmi, setTotalBmi] = useState<string | null>(null);
    const [totalBMICategory, setTotalBMICategory] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleWeigthInput = (event: ChangeEvent<HTMLInputElement>) => {
        setWeightInput(event.target.value)
    }
    const handleHeigthInput = (event: ChangeEvent<HTMLInputElement>) => {
        setHeigthInput(event.target.value)
    }

    const totalBMI = () => {  
        if (!heigthInput || !weightInput) {
            setError("Please enter your height and weight")
            return;
        } 

        let heigth = parseFloat(heigthInput) / 100 ;
        let weight = parseFloat(weightInput);

        if (isNaN(heigth) || isNaN(weight)) {
            setError("please enter the valid number for height and weight")
            return;
        }

        if (heigth <= 0) {
            setError("please Enter the positive value for height")
            return;
        }
        if (weight <= 0){
            setError("please Enter the positive value for weight")
            return;
        }

        const totalBMICalculate = weight / (heigth * heigth);
        let category = "";
        if (totalBMICalculate <= 18.5) {
            category = "Underweight";
        } else if (totalBMICalculate >= 18.5 && totalBMICalculate <= 24.9) {
            category = "Normal Weight";
        } else if (totalBMICalculate >= 25 && totalBMICalculate <= 29.9) {
            category = "Overweight";
        } else if (totalBMICalculate >= 30) {
            category = "Obesity";
        }
        
        setTotalBmi(`${totalBMICalculate.toFixed(2)}`)
        setTotalBMICategory(category)
        toast({
            title: "Success",
            description: `Your BMI is calculated successfully & your category is ${category} & your BMI is ${totalBMICalculate.toFixed(2)}`,
            style: {
                color: "white",
                backgroundColor: "black",
                borderRadius: "5px",
                border: "1px solid white",
            }
        })
        setError("")
    }



  return (
    <div className="flex justify-center items-center h-screen w-full bg-slate-200">
      <Card className="max-w-md w-full p-8 bg-white">
        <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>Calculate your body mass index (BMI)</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center flex-col gap-4">
            <div className="w-full" >
                <Input placeholder="Enter Your Height" onChange={handleHeigthInput} value={heigthInput} type="number" />
            </div>
            <div className="w-full">
                <Input placeholder="Enter Your Weight" onChange={handleWeigthInput} value={weightInput} type="number"/>
            </div>
            <Button onClick={totalBMI} className="w-full">Calculate BMI</Button>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flexd justify-center items-center flex-col">
            {totalBmi && <p className="text-black  text-2xl text-center font-bold w-full ">{totalBmi}</p>}
           <p className="text-slate-500  text-xl text-center font-medium w-full ">{totalBMICategory}</p>
            </div>
        </CardContent>
        <CardFooter>
            <p className="text-blue-400 text-center w-full">Developed by <a href="https://github.com/MANI-WEBDEVE" target="_blank">Muhammad Inam</a></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BmiCalculate
