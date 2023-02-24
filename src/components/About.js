import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About=()=>{
 
    const a=useContext(NoteContext)
  //  useEffect(()=>{
  //      a.update()
   // },[])
    return(
 
        <div>
          this about {a.title} and his age is{a.date}
            </div>
           
    )
}
export default About;

