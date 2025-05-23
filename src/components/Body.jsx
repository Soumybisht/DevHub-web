import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';
import { addUser } from '../utils/userSlice';

const Body = () => {

  const fetchData = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser =async ()=>{

    try{
      const res = await axios.get(BASE_URL+"/profile",{
      withCredentials:true
    });
    dispatch(addUser(res.data));

    }
    catch(err){
      
      navigate("/login");
    }
    
  }

  useEffect(()=>{
    
    fetchUser();
  },[]);

  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
