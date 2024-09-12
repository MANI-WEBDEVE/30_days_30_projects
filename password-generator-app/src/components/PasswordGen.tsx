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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";

const PasswordGen = () => {
  const { toast } = useToast();
  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true);
  const [includeSpecailChar, setIncludeSpecailChar] = useState<boolean>(true);
  const [includeNumber, setIncludeNumber] = useState<boolean>(true);
  const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(true);
  const [lengthPass, setLengthPass] = useState<number>(8);
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
    for (let i = 0; i < lengthPass; i++) {
      let character = Math.floor(Math.random() * allChar.length);
      generatedPassword += allChar[character];
    }
    setPassword(generatedPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Password Copied",
      description: "Your password has been copied to your clipboard",
      style: {
        color: "white",
        backgroundColor: "black",
        border: "1px solid white",
      }
    });
  }

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
              minLength= {8}
              maxLength= {32}
            />
          </div>
          <div className="space-y-2 flex items-start justify-between gap-2  flex-col">
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
          <Button onClick={handleGeneratedPassword} className="mt-4">Generate Password</Button>
        </CardContent>
        <CardFooter className="grid gap-3 w-full">
            <div className="flex items-center justify-center gap-4">
              <div className="w-full">
                <Input className="" value={password} onChange={handlePasswordVal} placeholder="Generated Password Here"/>
              </div>
              <div className="">
                <Button onClick={() => handleCopyPassword()}>Copy ClipBoard</Button>
              </div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordGen;
