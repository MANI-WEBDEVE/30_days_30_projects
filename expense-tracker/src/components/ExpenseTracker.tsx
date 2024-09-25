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
import { FilePenIcon, icons, PlusIcon, TrashIcon } from "lucide-react";
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

const ExpenseTrackerApp = () => {
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
    console.log(expenseTracker)
    setExpenseTracker([
      ...expenseTracker,
      {
        id: expenseTracker.length + 1,
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
    console.log(id);
    setExpenseTracker(expenseTracker.filter((expanse) => expanse.id !== id));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewExpanse((prev) => ({
      ...prev,
      [id]:
        id === "amount"
          ? parseFloat(value)
          : id === "date"
          ? new Date(value)
          : value,
    }));
  };
  const totalExpenses = expenseTracker.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="flex h-screen flex-col ">
      <header className="bg-primary text-primery-foreground  py-4 px-5 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold ">Expense Tracker</h1>
          <div className="text-2xl font-medium">Total {totalExpenses} </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <ul className="space-y-6">
          {expenseTracker.map((expense: Expense) => (
            <li
              key={expense.id}
              className="bg-card p-4 rounded-lg shadow flex justify-between items-center text-black transition-all ease-in-out animate-[wiggle_1s_ease-in-out_infinite] hover:scale-95 duration-300  bg-gray-100 hover:bg-gray-300"
            >
              <div >
                <h3 className="text-lg font-medium uppercase">{expense.name}</h3>
                <p className="text-muted-foreground text-black">
                  {expense.amount} - {format(expense.date.toLocaleDateString(), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="flex  gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditExpense(expense.id)}
                >
                  <FilePenIcon className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <TrashIcon className="w-6 h-6" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="rounded-full shadow-lg"
          onClick={() => {
            setShowModal(true);
            setisEditing(false);
            resetForm();
          }}
        >
          <PlusIcon className="w-6 h-6" />
        </Button>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="text-white  w-full max-w-md p-6 bg-card bg-black">
          <DialogHeader >
            <DialogTitle className="text-xl font-bold">{isEditing ? "Edit Expanse" : "Add Expanse"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Expense Name">Expense Name</Label>
              <Input value={newExpanse.name} id="name" onChange={handleInput} />
            </div>
           

              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  value={newExpanse.amount}
                  id="amount"
                  type="number"
                  onChange={handleInput}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  value={newExpanse.date.toISOString().slice(0, 10)}
                  id="date"
                  type="date"
                  onChange={handleInput}
                />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="secondary" className="bg-blue-700 text-bold" onClick={isEditing ? handleSaveEditExpense : handleAddExpense}>{isEditing ? "Save Edit" : "Add Expense"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseTrackerApp;
