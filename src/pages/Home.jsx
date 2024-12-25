import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';


const Home = () => {
  const [books, setBooks]=useState([]);
  const navigate=useNavigate();

  const usernameLocal=localStorage.getItem('user');
  console.log(usernameLocal);
  //To prevent access to this page without login
  if(usernameLocal==null){
   navigate('/')
  }

  const handleLogOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };



  useEffect(()=>{
   axios
      .get('https://books-app-server-ten.vercel.app/books')
      .then((response)=>{
        setBooks(response.data.data);
      })
      .catch((error)=>{
        console.log(error);
      });

  },[]);

  return (
    <div className="container p-4">
      <div className="flex justify-content-between align-items-center">
        <h1 className="lead display-4 mt-5">Books List</h1>
          <Link to='/books/create' >
             <MdOutlineAddBox  style={{width:30,height:30}}/>
          </Link>
          <span className="mx-2">Welcome, {usernameLocal}!</span>
          <button className="btn btn-primary my-3"
          onClick={handleLogOut}>
            Log Out
          </button>
      </div>

      <BooksTable books={books} />
    </div>
  )
}

export default Home