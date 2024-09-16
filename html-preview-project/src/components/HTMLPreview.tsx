"use client";
import { ChangeEvent, useState } from "react";
// import { predefinedHtml } from "./predefinedHtml";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
const HTMLPreview = () => {
  const [htmlCode, setHtmlCode] = useState<string | null>("");
  const [previewCodeHTML, setPreviewCodeHTML] = useState<string | null>("");

  const handlePreview = (): void => {
    setPreviewCodeHTML(htmlCode);
  };

  const handlePasteHtml = (): void => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beautiful HTML Card</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150vh;
            margin: 0;
        }
        .card {
            background-color: #ffffff;
            width: 100%;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease-in-out;
        }
        .card:hover {
            transform: scale(1.05);
        }
        .card-header {
            background: linear-gradient(135deg, #00b894, #00d1b2);
            padding: 20px;
            text-align: center;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }
        .card-body {
            padding: 20px;
        }
        .card-body h3 {
            color: #333;
            margin-bottom: 15px;
        }
        .card-body p {
            color: #777;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        .card-footer {
            background-color: #00b894;
            padding: 10px;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .card-footer button {
            background-color: #00d1b2;
            color: #ffffff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .card-footer button:hover {
            background-color: #00b894;
        }
    </style>
</head>
<body>

    <div class="card">
        <div class="card-header">
            Welcome to the HTML Preview
        </div>
        <div class="card-body">
            <h3 style="font-family: 'Pacifico', cursive; font-size: 2.5rem; font-weight: normal; letter-spacing: 0.1rem; text-shadow: 2px 2px 2px rgba(0,0,0,0.1); text-align: center; color: #333; margin-bottom: 15px;">Muhammad Inam</h3>
            <p style="font-family: 'Open Sans', sans-serif; font-size: 1rem; line-height: 1.5; color: #555; text-align: center;">This is an HTML card. I am a web developer and I love to develop web applications.</p>
        </div>
        <div class="card-footer">
         <a href="https://github.com/MANI-WEBDEVE" target="_blank" style="color: black;">  <button style="color: black;">MY GITHUB</button></a> 
        </div>
    </div>

</body>
</html>
`);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setHtmlCode(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-black ">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-card">
        <h1 className="text-3xl font-bold tracking-tighter text-center">
          HTML Preview
        </h1>
        <p>Paste your HTML here and see the result</p>
        <div className="grid ga-4">
          <Textarea
            value={htmlCode || ""}
            onChange={handleChange}
            placeholder="Paste your HTML here"
            rows={8}
            className="p-4 rounded-lg border border-input bg-background text-foreground"
          />
          <div className="flex justify-center">
            <div className="flex gap-7 mt-7 mb-7">
              <Button
                className="rounded-xl bg-lime-500"
                onClick={handlePreview}
              >
                Generate Preview
              </Button>
              <Button onClick={handlePasteHtml}>Paste HTML</Button>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-input bg-backgrounde text-foreground">
            <div dangerouslySetInnerHTML={{ __html: previewCodeHTML || "" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLPreview;
