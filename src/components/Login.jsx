import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/BASE_URL';

const Login = ()=>{

    const [isLogin,setIsLogin] = useState(true);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logIn =async ()=>{
        try{
            const res = await axios.post(BASE_URL+"/login",{
                emailId:emailId,
                password:password
            },{withCredentials:true})
            dispatch(addUser(res.data));
            return navigate("/feed");
        }catch(err){
            setError("Invalid User Credentials!!");
        }
    }


    const signUp =async ()=>{
        try{
            const res = await axios.post(BASE_URL+"/signup",{
                firstName:firstName,
                lastName:lastName,
                emailId:emailId,
                password:password
            },{withCredentials:true})
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        }catch(err){
            setError("Invalid User Credentials!!");
        }
    }

  return (
    <section className="bg-gray-50 dark:bg-base-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-base-200 rounded-xl">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isLogin?"Login in to your account":"Sign-Up Account"}
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => {
                    e.preventDefault();  // Prevent form default submit
                    isLogin?logIn():signUp()            // Call your login function
                }}>

              {!isLogin&&<>
              
                <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  FirstName
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your FirstName"
                  required
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  LastName
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your LastName"
                  required
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </div> 
              </>}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={emailId}
                  onChange={(e)=>setEmailId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <p className='text-red-500'>{error}</p>
              
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLogin?"Login":"Sign In"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isLogin?"Don't have an account yet? ":"Already have an account? "}
                <button  className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={()=>setIsLogin((value)=>!value)}>
                  {isLogin?"Sign up":"Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
