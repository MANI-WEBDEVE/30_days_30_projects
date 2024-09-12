"use client"
import React, { useState } from 'react'
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
  


function TipCalculator() {
    const [billAmount, setBillAmount] = useState<number | null>(null);
    const [tipPercentage, setTipPercentage] = useState<number | null>(null)
    const [tipAmount, setTipAmount] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)


    const handleInputBillAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBillAmount(parseFloat(event.target.value));
    }
    const handleInputTipPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipPercentage(parseFloat(event.target.value) );
    }



     const handleTipAmount = () => {
        if (billAmount !== null && tipPercentage !== null) {
            const tip = billAmount * (tipPercentage / 100);
            setTipAmount(tip)
            setTotalAmount(billAmount + tip);
        }
     }


  return (
    <div className='flex justify-center items-center w-full bg-zinc-200 h-screen '>
      <Card className='w-full max-w-md p-8 shadow-xl'>
        <CardHeader>
            <CardTitle>Calculate Tip</CardTitle>
            <CardDescription>Enter bill amount and tip percentage</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
        <div className="grid gap-2">
            <Label htmlFor='bill amount' >Billing Amount</Label>
            <Input
             id="bill-amount"
             type="number"
             placeholder="Enter bill amount"
            value={billAmount !== null ? billAmount : ''}
            onChange={handleInputBillAmount}
            />
        </div>
        <div className="grid gap-2">
            <Label htmlFor='tip amount' >Tip Amount</Label>
            <Input
             id="Tip-amount"
             type="number"
             placeholder="Enter tip amount"
            value={tipPercentage !== null ? tipPercentage : ''}
            onChange={handleInputTipPercentage}
            />
        </div>
        <Button className='bg-purple-700/90 hover:bg-purple-600/60 font-bold hover:text-black hover:scale-110 transition-all  ease-in-out  duration-500' onClick={handleTipAmount} >Calculate Tip</Button>
        </CardContent>
        <CardFooter className='grid gap-2'>
            <div className='flex justify-between items-center gap-4   '>
                <span>Tip Amount:</span>
                <span className='font-bold'>${tipAmount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center gap-4'>
                <span>Total Amount:</span>
                <span className='font-bold'>${totalAmount.toFixed(2)}</span>
            </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TipCalculator
