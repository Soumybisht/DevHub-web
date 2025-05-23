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
            dispatch(addFeed(res.data));
            console.log(res.data);
        }
        catch(err){
            console.log(err.message);
        }
        
    }

    useEffect(()=>{
        fetchFeed();
    },[]);
  return (
    userFeed&&
    <div className='flex justify-center items-center'>
        <FeedCard user={userFeed.data[0]} />
    </div>
  )
}

export default Feed;
