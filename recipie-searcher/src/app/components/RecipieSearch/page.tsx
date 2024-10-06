'use client'
import { Button } from '@nextui-org/button';
import React, { useState } from 'react'

 
interface Recipe {
    uri: string;
    label: string;
    image: string;
    ingredientLines: string[];
    ingredients: { text: string }[];
    url: string;
  }
  
  const examples = [  "Biryani",  "Chicken Karahi",  "Nihari",  "Haleem",  "Chapli Kabab",];
const RecipieSearch = () => {
    const [query, setQuery] = useState<string>("");
    const [recipie, setRecipie] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const handleSearch = async () => {
        setIsLoading(true);
        setIsSearch(true);
        try {
            const response = await fetch(`https://api.edamam.com/search?q=biryani&app_id=${process.env.NEXT_PUBLIC_API_ID}&app_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            const data = await response.json();
            console.log(data)
        } catch (erro) {
            console.log(erro)
        } finally {
            setIsLoading(false)
            setIsSearch(false)
        }
    }

  return (
    <div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default RecipieSearch
