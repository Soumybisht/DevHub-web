import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants/BASE_URL'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import RequestCard from './RequestCard'

const Requests = () => {

    const dispatch = useDispatch();
    const getRequests = useSelector((store)=>store.request);

    const fetchRequests = async () =>{

        try{
        const res = await axios.get(BASE_URL+"/user/request/received",{withCredentials:true});
        //console.log(res.data);
        dispatch(addRequest(res.data.data));
        }catch(err){
            throw new Error(err.message);
        }
        
    }

    useEffect(()=>{
        fetchRequests();
    },[]);

    if(getRequests.length===0) return <h1 className='text-5xl font-bold m-8 text-center'>No Pending Request</h1>

  return Array.isArray(getRequests) && getRequests.length > 0 ?  (

    <div className='flex flex-col justify-center m-4'>
        <div>
            <p className='text-5xl font-bold m-8 text-center'>Pending Requests</p>
        </div>

        {
            getRequests.map((req)=>{
                return (<RequestCard key={req._id} user={req} />)
            })
        }
        
    </div>
  ): (
  <h1 className='text-bold text-center text-2xl m-10'>Loading requests...</h1>
  );
  
}

export default Requests;
