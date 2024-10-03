"use client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { FilePenIcon, TrashIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
type Note = {
  id: number;
  title: string;
  content: string;
};

const defaultNotes: Note[] = [
  {
    id: 1,
    title: "Grocery List",
    content: "Milk, Eggs, Bread, Apples",
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Discuss new project timeline, assign tasks to team",
  },
  {
    id: 3,
    title: "Idea for App",
    content: "Develop a note-taking app with a clean and minimalist design",
  },
];

const NoteTracker = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", defaultNotes);
  const [newNotes, setNewNotes] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [editableNoteId, setEditableNoteId] = useState<null | number>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddNote = ():void => {
    if (newNotes.title.trim() && newNotes.content.trim()){
        const newNotesWithId = { id: Date.now() , ...newNotes };
        setNotes([newNotesWithId, ...notes])
        setNewNotes({title: "", content: ""})
    }
  }
  const handleEditNotes = (id:number):void => {
        const noteToEdit = notes.find((notes) => (notes.id === id))
        if (noteToEdit) {
           setNewNotes({title:noteToEdit?.title, content:noteToEdit?.content})
           setEditableNoteId(id)
        }
  }

  const handleUpdateNote = ():void => {
    if (newNotes.title.trim() && newNotes.content.trim()){
        setNotes(
            notes.map((notes) => (
                notes.id === editableNoteId ? {id:notes.id, title:newNotes.title, content:newNotes.content} : notes
            ))
        )
        setNewNotes({ title: "", content: "" });
        setEditableNoteId(null);
    }
  }

  const handleDeleteNote = (id:number):void => {
    setNotes(notes.filter((notes) => (notes.id !== id)))
  }
 
  return (
    <div className=" w-full h-full bg-white text-black">
      <nav className="w-full h-14 bg-gray-200 flex items-center p-4 border-b-2 border-slate-600">
        <h1 className="text-2xl font-bold uppercase">Note Tracker</h1>
      </nav>
      <section>
        <div className="flex flex-col  m-4">
          <Input className="mr-4" placeholder="Enter Title" value={newNotes.title} onChange={(e) => setNewNotes({...newNotes, title: e.target.value})}/>
          <Textarea
            className="mr-4 mt-4"
            placeholder="Enter Note Content here"
            rows={5}
            value={newNotes.content} onChange={(e) => setNewNotes({...newNotes, content: e.target.value})}
          />
        </div>
        {editableNoteId === null ? (
            <Button onClick={handleAddNote} className="mt-2 ml-6">
              Add Note
            </Button>
          ) : (
            <Button onClick={handleUpdateNote} className="mt-2 ml-6">
              Update Note
            </Button>
          )}
      </section>
      <section className="flex justify-center  flex-col gap-3 m-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardContent>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold mt-2">{note.title}</h1>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="ghost"
                    className="border-[1px] border-gray-400"
                    onClick={() => handleEditNotes(note.id)}
                  >
                    <FilePenIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteNote(note.id)}
                    variant="ghost"
                    className="border-[1px] border-gray-400"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 font-normal text-lg">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default NoteTracker;
