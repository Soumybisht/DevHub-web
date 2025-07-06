import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';
import { removeUser } from '../utils/userSlice';
import { removeConnection } from '../utils/connectionSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      dispatch(removeConnection());
      navigate("/login");
    }catch(err){

    }
  }
  const user = useSelector((store)=>store.user);
  return (
    <div className="navbar bg-base-300 rounded-md ">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">DEVHUB</Link>
  </div>
  <div className="flex-none gap-2 mx-5">
    {user&&<p className=''>Welcome, {user.firstName}</p>}
    {user&&<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {user&&(<div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photo} />
        </div>)}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/login" onClick={()=>handleLogout()} >Logout</Link></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default NavBar
