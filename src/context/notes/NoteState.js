
import React, { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {

  const host="http://localhost:5000"
  const state=[]

  //get all notes

const getNotes=async()=>{
  const response=await fetch(`${host}/api/notes/fetchallnotes`,{
    method:"GET",
    headers:{
      "content-Type":"application/json",
      auth:localStorage.getItem("token")
    },

  
  });

  const json= await response.json()
  
  setNotes(json)
}
// add note
const addNote=async(title,description,tag)=>{
  // to do api call
  const response=await fetch(`${host}/api/notes/addnote`,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
      auth:localStorage.getItem("token")
    },
      body:JSON.stringify({title,description,tag})
   

  });
  
const note=await response.json();
 
setNotes(notes.concat(note))
}
// delete note
const deleteNote=async(id)=>{


  const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:"DELETE",
    headers:{
      "content-Type":"application/json",
      auth:localStorage.getItem("token")
    },
   

  });
  
const json=response.json();
console.log(json)

  console.log("deleteing notes with id"+id)
  const  newNotes=notes.filter((note)=>{ return note._id!==id})
  setNotes(newNotes)

}
// edit note
const editNote=async(id,title,description,tag)=>{
  //api call
  const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
    method:"PUT",
    headers:{
      "content-Type":"application/json",
      auth:localStorage.getItem("token")
    },
    body:JSON.stringify({title,description,tag})

  });
  
const json=response.json();
console.log(json);

let newNotes=JSON.parse(JSON.stringify(notes))
// logic to edit in forntend

 for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if(element._id===id){
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
    break;
  }
  
  
 }
 setNotes(newNotes);


}

const [notes,setNotes]=useState(state)
  
  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;