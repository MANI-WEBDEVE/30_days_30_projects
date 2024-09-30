"use client";
import { useState, useEffect, ChangeEvent } from "react";
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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ExChangeRate = {
    [key: string]: number;
};
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "PKR";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState<number | null>(null);
    const [sourceCurrency, setSourceCurrency] = useState<Currency>("USD");
    const [targetCurrency, setTargetCurrency] = useState<Currency>("PKR");
    const [exChangeRate, setExChangeRate] = useState<ExChangeRate>({});
    const [convertedAmount, setConvertedAmount] = useState<string>("0.00");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrencyRate = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    "https://api.exchangerate-api.com/v4/latest/USD"
                );
                const data = await response.json();
                return setExChangeRate(data.rates);
            } catch (error) {
                setError("Failed to fetch currency rate");
            } finally {
                setLoading(false);
            }
        };
        fetchCurrencyRate();
    }, []);

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target.value));
    };

    const handleSourceCurrencyChange = (value: Currency) => {
        setSourceCurrency(value);
    };

    const handleTargetCurrencyChange = (value: Currency) => {
        setTargetCurrency(value);
    };
    const handleCalculatedAmountConversion = () => {
        if (sourceCurrency && targetCurrency && amount && exChangeRate) {
            const rate =
                sourceCurrency === "USD"
                    ? exChangeRate[targetCurrency]
                    : exChangeRate[targetCurrency] / exChangeRate[sourceCurrency];
            const result = amount * rate;
            setConvertedAmount(result.toFixed(2).toString());
        }
    };
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200 ">
            <Card className="w-full max-w-md bg-white shadow-xl space-y-8 p-8">
                <CardHeader>
                    <h1 className="text-3xl font-bold text-center mt-2">
                        Currency Convertor
                    </h1>
                    <p className="text-medium font-light text-center mt-2">
                        Enter the amount to be converted
                    </p>
                </CardHeader>
                <CardContent>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <div className="flex flex-col gap-4 items-center ">
                        <div className="flex items-center justify-center gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount || ""}
                                onChange={handleAmountChange}
                            />
                            <Select
                                value={sourceCurrency}
                                onValueChange={handleSourceCurrencyChange}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="USD" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                        <SelectItem value="JPY">JPY</SelectItem>
                                        <SelectItem value="AUD">AUD</SelectItem>
                                        <SelectItem value="CAD">CAD</SelectItem>
                                        <SelectItem value="PKR">PKR</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Label htmlFor="amount">To</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={convertedAmount}
                                // onChange={handleAmountChange}
                            />
                            <Select
                                value={targetCurrency}
                                onValueChange={handleTargetCurrencyChange}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="USD" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                        <SelectItem value="JPY">JPY</SelectItem>
                                        <SelectItem value="AUD">AUD</SelectItem>
                                        <SelectItem value="CAD">CAD</SelectItem>
                                        <SelectItem value="PKR">PKR</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <Button
                        variant="default"
                        className=""
                        onClick={handleCalculatedAmountConversion}
                    >
                        Convert Amount
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CurrencyConverter;
