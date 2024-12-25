import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';


const EditBook = () => {
  const[title, setTitle]=useState('');
  const[author, setAuthor]=useState('');
  const[publishYear, setPublishYear]=useState('');
  const navigate=useNavigate();
  const{id}=useParams();

  useEffect(()=>{
    axios.get(`https://books-app-server-ten.vercel.app/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setTitle(response.data.title);
    }).catch((error)=>{
       alert('an error happened.Please Check console');
       console.log(error);
  });

  },[])
 
  const handleEditBook=()=>{
   const data={
    title,
    author,
    publishYear,
   };

   axios.put(`https://books-app-server-ten.vercel.app/books/${id}`,data)
    .then(()=>{
        navigate('/home')
    })
    .catch((error)=>{
      console.log(error);
    });
  }


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

     <button className="btn btn-primary btn-lg" onClick={handleEditBook}>
        Save
     </button>

    </div>
  )
}

export default EditBook