import React, { useEffect } from 'react'
import FeedCard from './FeedCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';
import { addFeed } from '../utils/feedSlice';
const Feed = () => {

    const userFeed = useSelector((store)=>store.feed);
    const dispatch = useDispatch();
    const fetchFeed = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
            dispatch(addFeed(res?.data?.data));
            console.log(res.data);
        }
        catch(err){
            console.log(err.message);
        }
        
    }

    useEffect(()=>{
        fetchFeed();
    },[]);

    if(!userFeed) return;
    if(userFeed.length<=0) return <h1 className='text-5xl font-bold m-8 text-center'>No more Developers Found</h1>
  return (
    userFeed&&
    <div className='flex justify-center items-center'>
        <FeedCard user={userFeed[0]} />
    </div>
  )
}

export default Feed;
