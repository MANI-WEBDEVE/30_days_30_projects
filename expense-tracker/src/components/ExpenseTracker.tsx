"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FilePenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { format } from "date-fns";

type Expense = {
    id: number;
    name: string;
    amount: number;
    date: Date;
}

const intialExpanse : Expense[] = [
    {
        id: 1,
        name: "rent",
        amount: 1000,
        date: new Date()
    },
    {
        id: 2,
        name: "food",
        amount: 500,
        date: new Date()
    },
    {
        id: 3,
        name: "travel",
        amount: 2000,
        date: new Date()
    },
    {
        id: 4,
        name: "rent",
        amount: 1000,
        date: new Date()
    },
]


const ExpenseTracker = () => {
    const [ExpenseTracker, setExpenseTracker] = useState<Expense[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEditing, setisEditing] = useState<boolean>(false);
    const [currentExpanse, setCurrentExpanse] = useState<number | null>(null)
    const [newExpanse, setNewExpanse] = useState<{name:string, amount:number, date:Date}>({
        name: "",
        amount: 0,
        date: new Date()
    })

    useEffect(() => {
        const storedExpense = localStorage.getItem("expense");
        if (storedExpense) {
            setExpenseTracker(JSON.parse(storedExpense).map((expense: Expense) => ({ ...expense, date: new Date(expense.date) })));
        } else {
            setExpenseTracker(intialExpanse)
        }
    },[])
  return (
    <div>
      let code start
    </div>
  )
}

export default ExpenseTracker
