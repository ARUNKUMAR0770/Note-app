import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../api/axios.js";
import { Trash2 } from 'lucide-react';



const dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [id, setId] = useState("");
  const [editingId, setEditingId] = useState("");



  //getting data from the db
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes");
        setNotes(res.data);
        setIndex(0);
      } catch (err) {
        console.log(err)
      }
    }
    fetchNotes();
  }, []);
  //deleting notes
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));// filtering only not equal to id
      setShowAlert(false)
    } catch (err) {
      console.log(err);
    }
  }
  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await API.put(`/notes/${editingId}`, {
          title,
          content: note,
        })
        setNotes((prev) => prev.map((note) => note._id === editingId ? res.data : note));
        setOpen(false);
        setEditingId("");
        setTitle("");
        setNote("");
        return;
      } else {
        const res = await API.post("/notes", {
          title,
          content: note,
        });
        setNotes((prev) => [...prev, res.data]);
        setTitle("Title");
        setNote("");
        setOpen(false);
      }


    } catch (err) {
      console.log(err);
    }

  };
  //handleDelete button
  const handleDeleteButton = (id) => {
    setShowAlert(true);
    setId(id)
  }



  return (
    <>
      <div className="sm:grid max-sm:flex flex-col grid-cols-3 gap-4 p-4">
        {notes.length > 0 && (
          notes.map((n) => (
            <div key={n._id} className="box flex justify-between items-center p-4 gap-2 ">
              <div className="flex flex-col gap-2">
                <h1 className="font-extrabold capitalize">{n.title}</h1>
                <p>{n.content.length > 60
                  ? n.content.slice(0, 60) + "..."
                  : n.content}</p>
                
              </div>
              <div className="flex gap-4 items-center justify-center">
                <button className='border bg-blue-500 px-3 py-1 rounded-xl cursor-pointer hover:bg-blue-800 text-white '
                  onClick={() => {
                    // we can also do like this, without creating new function
                    setEditingId(n._id);
                    setTitle(n.title);
                    setNote(n.content);
                    setOpen(true);
                  }}
                >edit</button>
                <Trash2 className='cursor-pointer hover:text-red-500' onClick={() => handleDeleteButton(n._id)} />
              </div>
              
            </div>

          ))
        )}
        {/* adding new note */}
        <div className="box text-center text-3xl cursor-pointer hover:bg-blue-500 hover:text-white" onClick={() => setOpen(true)}>
          +
        </div>
      </div>
      {open && (
        <div className="w-full h-screen bg-black/40 fixed top-0 left-0 flex
       justify-center items-center ">

          <div className="bg-blue-100 text-black w-[50%] max-sm:w-90 fixed
       top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg">
            <form onSubmit={handleSumbit} className='flex flex-col gap-4'>
              <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' className='border rounded py-2 px-3' value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="note">Note</label>
                <textarea rows={6} id='note' type="text" className='border rounded p-3 resize-none' value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <div className="flex justify-left">
                <button type="submit" className=' border text-right mt-2 px-3 py-2 rounded bg-blue-500 text-white borde-white cursor-pointer hover:bg-blue-700'>Save</button>
              </div>
            </form>
          </div>

        </div>

      )}
      {showAlert && (
        <div className="fixed top-0 right-0 w-full h-screen bg-black/40 flex items-center justify-center">
          <div className="bg-blue-500 w-80 px-4 py-10 flex flex-col gap-5 justify-center rounded-2xl " >
            <p className="text-white text-center">Are you sure you want to delete this note?</p>
            <div className="flex items-center justify-center gap-5">
              <button className="bg-green-500 boder px-5 py-1 rounded cursor-pointer hover:bg-green-700" onClick={() => setShowAlert(false)}>No</button>
              <button className='bg-red-500 border px-5 py-1 rounded cursor-pointer hover:bg-red-700' onClick={() => handleDelete(id)}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default dashboard
