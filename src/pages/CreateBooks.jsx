//import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const[title, setTitle]=useState('');
  const[author, setAuthor]=useState('');
  const[publishYear, setPublishYear]=useState('');
  const[image,setImage]=useState(null);
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();

  const handleSaveBook=()=>{
     const data={
       title,
       author,
       publishYear,
       image,
     };
     axios
     .post('https://books-app-server-one.vercel.app/books',data,{
        headers:{
          'Content-Type':'multipart/form-data',
        }
     })
     .then(()=>{
      enqueueSnackbar("Book created Successfully");
        navigate('/home')//to send us back to home page
     })
     .catch((error)=>{
        //alert('An error happened.Please Check console');
        console.log(error);
     });
  };

//localhost server====>http://localhost:5555/books
//vercel host=====>https://books-app-server-one.vercel.app/books

  return (
    <div className="p-4">
    <BackButton />
       <h1 className="my-4">Create Book</h1>

         <div className="my-4">
           <label className="mx-4">Title</label>
           <input type="text" 
           value={title} 
           onChange={(e)=>setTitle(e.target.value)}
           className="mx-5 px-4 py-2"/>
         </div>
       
         <div className="my-4">
           <label className="mx-4">Author</label>
           <input type="text" 
           value={author} 
           onChange={(e)=>setAuthor(e.target.value)}
           className="mx-4 px-4 py-2"/>
         </div>
       
       
     <div className="my-4">
       <label className="mx-2">Publish Year</label>
       <input type="number" 
       value={publishYear} 
       onChange={(e)=>setPublishYear(e.target.value)}
       className="mx-3 px-4 py-2"/>
     </div>
      
      <div className="my-4">
         <label className="text-xl mr-4 text-gray-500 me-3">Image</label>
         <input type="file" 
         onChange={(e)=>setImage(e.target.files[0])}
         className=" border border-2 border-gray-500 px-4 py-2 w-full" />
      </div>

     <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>
        Save
     </button>

    </div>
  )
}

export default CreateBooks