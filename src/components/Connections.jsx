import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants/BASE_URL'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import ConnectionCard from './ConnectionCard'

const Connections = () => {

    const dispatch = useDispatch();
    const getConnections = useSelector((store)=>store.connections);

    const fetchConnections = async () =>{

        try{
        const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        //console.log(res.data);
        dispatch(addConnection(res.data.data));
        }catch(err){
            throw new Error(err.message);
        }
        
    }
    
    useEffect(()=>{
        fetchConnections();
    },[]);

  return Array.isArray(getConnections) && getConnections.length > 0 ?  (

    <div className='flex flex-col justify-center m-4'>
        <div>
            <p className='text-5xl font-bold m-8 text-center'>Connections</p>
        </div>

        {
            getConnections.map((con)=>{
                return <ConnectionCard key={con._id} user={con} />
            })
        }
        
    </div>
  ): (
  <h1 className='text-bold text-center text-2xl m-10'>No Connections Available</h1>
  );
  
}

export default Connections;
