import React from 'react'
import { BASE_URL } from '../constants/BASE_URL';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';
import axios from 'axios';

const RequestCard = ({user}) => {

    const dispatch = useDispatch();
    const reviewRequest =async (status,_id)=>{

        const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeRequest(_id));
    }

    const {firstName,lastName,age,gender,about,photo} = user.fromUserId;
  return (
    <div className="flex justify-evenly items-center  py-8 px-8 w-1/2 mx-auto bg-base-300 border border-slate-300 rounded-xl shadow-lg cursor-pointer space-y-2 m-3 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="block mx-auto h-20 w-20 rounded-full sm:mx-0 sm:shrink-0"
        src={photo}
        alt="Woman's Face"
      />
      <div className="flex flex-col  text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-white font-semibold">
            {firstName} {lastName}
            <span className="text-slate-500 font-medium text-sm mx-3">
            {age} {gender}
          </span>
          </p>
          
        </div>
        <p className=" text-sm text-white max-w-72">
          {about}
        </p>
      </div>
      <div className='pl-1'>
        <button className="btn btn-active btn-primary mx-2" onClick={()=>reviewRequest("rejected",user._id)}>Reject</button>
        <button className="btn btn-active btn-secondary mx-2" onClick={()=>reviewRequest("accepted",user._id)}>Accept</button>
      </div>
    </div>
  )
}

export default RequestCard;
