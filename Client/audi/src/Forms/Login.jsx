import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Table from '../images/Login.png';
import axios from 'axios'
import { AuthContext } from '../Context/Authcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [details, setDetails] = useState({
    email: '',
    password: '',

  });
  const navigate=useNavigate()
  const onchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDetails((details) => {
      return {
        ...details,
        [name]: value
      }

    })

  }
  const onsumbit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:8080/api/login', {
        details
      }
      )
      
      if (response.status === 201) {
        const { username, token } = response.data;
        setAuth({ username, token });
        localStorage.setItem('Auth', JSON.stringify({ username, token }));
        navigate('/songs');
        
      }
      


    } catch (error) {
      toast(error.response.data.message);
      console.log(error);
    }
    setDetails({
    
      email: '',
      password: '',
     
    })
  }
  return (
    <>
    <div className='bg-custom-dark-blue h-full text-white flex p-16 gap-10'>
      <div>
        <form className="bg-gray-800 p-8 rounded-lg shadow-lg  space-y-6 w-[560px] h-[600px]" onSubmit={onsumbit} >

          <div>
            <h1 className='font-bold text-3xl'>Welcome Back</h1>
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img src="path/to/google-icon.png" alt="Google" className="h-5 w-5" />
                <span>Sign up with Google</span>
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img src="path/to/apple-icon.png" alt="Apple" className="h-5 w-5" />
                <span>Sign up with Apple</span>
              </button>
            </div>
            <div className="text-gray-400 text-center my-4">or</div>

          </div>
          <div className='flex flex-col items-center gap-3'>
            <div className='block'>
              <label className="block text-gray-400 mb-2" htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-[480px] px-4 py-2 border border-gray-600 rounded-xl bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required onChange={onchange} value={details.email} name='email'
              />
            </div>


            <div>
              <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="•••••••••"
                className="w-[480px] px-4 py-2 border border-gray-600  bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl" required name='password' value={details.password} onChange={onchange}
              />
            </div>
          </div>



          <div className="text-gray-400 text-sm mt-6 flex justify-between items-center">
            <div>
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms">
                Remember Me
              </label>
            </div>
            <Link to='/api/forgot-password' className='text-indigo-500 hover:underline'>Forgot Password</Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in to your account
          </button>
          <div className='flex gap-2 items-center'>
            <span>Don't have an account?</span>
            <Link to='/api/register' className='text-indigo-500 hover:underline'>Sign Up</Link>
          </div>
        </form>
      </div>
      <div >
        <img src={Table} alt="" className='w-[500px] h-[600px]' />
      </div>

    </div>
    <ToastContainer/>
    </>
  )
}

export default Login;
