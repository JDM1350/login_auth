import React, { useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
const Addnote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const[note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();

        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added succesfully","success")
    }
    const onChange=(e)=>{

        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
          <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description'value={note.description}  onChange={onChange}   minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}   minLength={5} required/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
            </form>
      
    </div>
  )
}

export default Addnote
