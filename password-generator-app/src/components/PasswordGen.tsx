"use client"

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
import { Checkbox, CheckedState } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PasswordGen = () => {
  const { toast } = useToast();
  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true);
  const [includeSpecailChar, setIncludeSpecailChar] = useState<boolean>(true);
  const [includeNumber, setIncludeNumber] = useState<boolean>(true);
  const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(true);
  const [lengthPass, setLengthPass] = useState<number>(16);
  const [password, setPassword] = useState<string>("");

  /**
   * Handles changes to the input field that contains the password.
   *
   * This function is called whenever the user types something in the input field.
   * It gets the value of the input field from the event.target.value and sets it as the password state.
   * The password state is the value that is displayed in the readonly input field below the password generator form.
   * This is done so that the user can see what the generated password is.
   * @param {ChangeEvent<HTMLInputElement>} event - The event that is passed in whenever the user types something in the input field.
   */
  const handlePasswordVal = (event: ChangeEvent<HTMLInputElement>) => {
    // Get the value of the input field
    const passwordVal = event.target.value;

    // Set the password state to the value of the input field
    
  };

  const handlePasswordLength = (event: ChangeEvent<HTMLInputElement>) => {
    setLengthPass(Number(event.target.value));
  };

  const handleCheckedBox =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  const handleGeneratedPassword = (): void => {
    
    const UpperCaes = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
    const LowerCase = "abcdefghijklmnopqrstuvwxyz";
    const Number = "1234567890";
    const SpecialChar = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allChar = "";
    if (includeLowerCase) allChar += LowerCase;
    if (includeUpperCase) allChar += UpperCaes;
    if (includeNumber) allChar += Number;
    if (includeSpecailChar) allChar += SpecialChar;
    if (allChar === "") {
      toast({
        title: "Password Generated Error",
        description: "Please check the checkBox",
      });
    }
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      let character = Math.floor(Math.random() * allChar.length);
      generatedPassword += allChar[character];
    }
    console.log(generatedPassword)
    setPassword(generatedPassword);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-300">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>Generate a secure password</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Input
              value={lengthPass}
              onChange={handlePasswordLength}
              placeholder="Password Length"
              type="number"
              min="8"
              max="32"
            />
          </div>
          <div className="space-y-2 grid gap-2">
            <Label>Include:</Label>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={includeUpperCase}
                onCheckedChange={handleCheckedBox(setIncludeUpperCase)}
              />
              <Label htmlFor="uppercase">Include Uppercase</Label>
            </div>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={includeLowerCase}
                onCheckedChange={handleCheckedBox(setIncludeLowerCase)}
              />
              <Label htmlFor="lowercase">Include LowerCase</Label>
            </div>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={includeSpecailChar}
                onCheckedChange={handleCheckedBox(setIncludeSpecailChar)}
              />
              <Label htmlFor="special char">Include Special Char</Label>
            </div>
            <div className="flex items-center justify-center">
              <Checkbox
                checked={includeNumber}
                onCheckedChange={handleCheckedBox(setIncludeNumber)}
              />
              <Label htmlFor="Number">Include Number</Label>
            </div>
          
          </div>
          <Button onClick={handleGeneratedPassword}>Generate Password</Button>
        </CardContent>
        <CardFooter>
            <div>
                <Input value={password} onChange={handlePasswordVal}/>
                <Button>Copy ClipBoard</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordGen;
