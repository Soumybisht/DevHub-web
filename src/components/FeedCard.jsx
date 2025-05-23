import React from 'react'

const FeedCard = ({user}) => {

    const {firstName,lastName,age,gender,about,photo} = user;
  return (
    
    <div className="flex flex-col bg-base-300 shadow-sm border border-slate-200 rounded-lg my-6 w-96">
      <div className="m-2.5 overflow-hidden rounded-md h-72 flex justify-center items-center">
        <img
          className="w-full h-full object-cover"
          src={photo}
          alt="profile"
        />
      </div>
      <div className="p-6 text-center">
        <h4 className="mb-1 text-xl font-semibold text-white">
          {firstName} {lastName}
        </h4>
        <p className="text-sm font-semibold text-white uppercase">
          Product Manager
        </p>
        <pre className="text-base text-white mt-4 font-light text-center">
            Age: {age}     Gender: {gender}
        </pre>
        <p  className="text-base text-white mt-4 font-light">
            {about}
        </p>
      </div>
      <div className="flex justify-center p-6 pt-2 gap-7">
        <button
          type="button"
          className="min-w-32 rounded-md bg-primary py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-blue-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Ignore
        </button>
        <button
          type="button"
          className="min-w-32 rounded-md bg-secondary py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-pink-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Interested
        </button>
      </div>
    </div>
  )
}

export default FeedCard
