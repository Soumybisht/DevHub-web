import React, { useState } from 'react';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../constants/BASE_URL';
import FeedCard from './FeedCard';
import { useDispatch } from 'react-redux';

const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age||"");
  const [gender, setGender] = useState(user.gender||"");
  const [photo, setPhoto] = useState(user.photo);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast,setShowToast] = useState(false);
  const dispatch = useDispatch();

  
  const saveChanges = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName, lastName, age, gender, photo, about
      }, { withCredentials: true });

      dispatch(addUser(res?.data.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },3000);
    } catch (err) {
      setError("PLease fill the data correctly");
    }
   
  };
  return (
    <>
    {showToast&&<div className="toast toast-top toast-center">
        <div className="alert alert-success">
        <span>Profile Updated successfully.</span>
        </div>
    </div>}
    <div className='flex justify-evenly items-start'>
      <section className="bg-base-50 dark:bg-base-100">
        <div className="flex flex-col items-center justify-center px-2 py-4 mx-auto min-h-[80vh] min-w-96">
          <div className="w-full bg-base-200 rounded-xl  shadow dark:border sm:max-w-sm p-6 dark:bg-base-200 dark:border-base-200">
            <div className="space-y-3 bg-base-200 rounded-xl">
              <h1 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                Edit Profile
              </h1>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveChanges();
                }}
              >
                <div className='p-1'>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="text-sm p-2 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white dark:bg-gray-700 dark:text-white"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className='p-1'>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="text-sm p-2 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white dark:bg-gray-700 dark:text-white"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className='p-1'>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    className="text-sm p-2 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white dark:bg-gray-700 dark:text-white"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className='p-1'>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Gender
                  </label>
                  <div className="flex justify-around">
                    {["male", "female", "others"].map((g) => (
                      <label key={g} className="text-sm text-gray-700 dark:text-white">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          className="mr-1"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                <div className='p-1'>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photo"
                    className="text-sm p-2 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white dark:bg-gray-700 dark:text-white"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </div>

                <div className='p-1'>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    About
                  </label>
                  <textarea
                    name="about"
                    className="text-sm p-2 w-full rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-white dark:bg-gray-700 dark:text-white"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={3}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700 text-sm py-2 rounded-md"
                >
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <FeedCard user={{firstName,lastName,age,gender,photo,about}} />
    </div>
    </>
  );
};

export default EditProfile;
