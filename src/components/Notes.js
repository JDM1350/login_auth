import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
const Notes = (props) => {
    const context = useContext(noteContext);
    let history=useNavigate();
    const { notes, getNotes,editNote } = context;

    const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    useEffect(() => {
        if(localStorage.getItem("token")){

            getNotes();
        }
        else{

            history("/login")
        }
        
        //eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {

        ref.current.click();
        setNote({
            id:currentNote._id,
            etitle:currentNote.title,
            edescription:currentNote.description,
            etag:currentNote.tag
        })
        

    }

    const ref = useRef(null)
    const refclose=useRef(null);
    const handleClick=(e)=>{
        console.log("updating notes",note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        props.showAlert("updated succesfully","success")


       
    }
    const onChange=(e)=>{

        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <>

            <Addnote  showAlert={props.showAlert}/>

            <button  type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">EDIT NOTE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} minLength={5}  required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange}  minLength={5} required/>
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5|| note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>

                <h2>your notes</h2>
                <div className="container">
                    {notes.length===0 && "No notes to display"}
                </div>

                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}


            </div>

        </>
    )
}

export default Notes
