import React from 'react'

const ConnectionCard = ({user}) => {

    const {firstName,lastName,age,gender,about,photo} = user;
  return (
    <div className="py-8 px-8 w-1/3 mx-auto bg-base-300 border border-slate-300 rounded-xl shadow-lg cursor-pointer space-y-2 m-3 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="block mx-auto h-24 w-24 rounded-full sm:mx-0 sm:shrink-0"
        src={photo}
        alt="Woman's Face"
      />
      <div className="flex flex-col  text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-white font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-slate-500 font-medium">
            {age} {gender}
          </p>
        </div>
        <p className="py-1 text-sm text-white ">
          {about}
        </p>
      </div>
    </div>
  )
}

export default ConnectionCard;
