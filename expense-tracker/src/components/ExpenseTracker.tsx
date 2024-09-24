"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FilePenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { format } from "date-fns";

type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
};

const intialExpanse: Expense[] = [
  {
    id: 1,
    name: "rent",
    amount: 1000,
    date: new Date(),
  },
  {
    id: 2,
    name: "food",
    amount: 500,
    date: new Date(),
  },
  {
    id: 3,
    name: "travel",
    amount: 2000,
    date: new Date(),
  },
  {
    id: 4,
    name: "rent",
    amount: 1000,
    date: new Date(),
  },
];

const ExpenseTracker = () => {
  const [expenseTracker, setExpenseTracker] = useState<Expense[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setisEditing] = useState<boolean>(false);
  const [currentExpanseId, setCurrentExpanseId] = useState<number | null>(null);
  const [newExpanse, setNewExpanse] = useState<{
    name: string;
    amount: number;
    date: Date;
  }>({
    name: "",
    amount: 0,
    date: new Date(),
  });

  useEffect(() => {
    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) {
      setExpenseTracker(
        JSON.parse(storedExpense).map((expense: Expense) => ({
          ...expense,
          date: new Date(expense.date),
        }))
      );
    } else {
      setExpenseTracker(intialExpanse);
    }
  }, []);

  useEffect(() => {
    if (expenseTracker.length > 0) {
      localStorage.setItem("expense", JSON.stringify(expenseTracker));
    }
  }, [expenseTracker]);

  const handleAddExpense = () => {
    setExpenseTracker([
      ...expenseTracker,
      {
        id: ExpenseTracker.length + 1,
        name: newExpanse.name,
        amount: Number(newExpanse.amount),
        date: new Date(newExpanse.date),
      },
    ]);
    setNewExpanse({ name: "", amount: 0, date: new Date() });
    setShowModal(false);
  };

  const handleEditExpense = (id: number) => {
    const editExpense = expenseTracker.find((expanse) => expanse.id === id);
    if (editExpense) {
      setNewExpanse({
        name: editExpense.name,
        amount: editExpense.amount,
        date: new Date(editExpense.date),
      });
      setCurrentExpanseId(id);
      setShowModal(true);
      setisEditing(true);
    }
  };
  const handleSaveEditExpense = (): void => {
    setExpenseTracker(
      expenseTracker.map((expense) =>
        expense.id === currentExpanseId
          ? { ...expense, ...newExpanse, amount: Number(newExpanse.amount) }
          : expense
      )
    );
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setNewExpanse({ name: "", amount: 0, date: new Date() });
    setCurrentExpanseId(null);
    setisEditing(false);
  };

  const handleDeleteExpense = (id: number): void => {
    setExpenseTracker(expenseTracker.filter((expanse) => expanse.id !== id));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewExpanse((prev) => ({
      ...prev,
      [id]: id === "amount" ? value : new Date(value),
    }));
  };
  const totalExpenses = expenseTracker.reduce((total, expense) => total + expense.amount, 0);

  return <div>let code start</div>;
};

export default ExpenseTracker;
