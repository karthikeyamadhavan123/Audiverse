import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Sign from '../images/Sign.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/Authcontext';

const Register = () => {

  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
    country: ''
  });

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
      const response = await axios.post('http://localhost:8080/api/register', {
        details
      }
      )
      
      if (response.status === 201) {
        const { username, token } = response.data;

        // Update the auth context
        const newAuth = { username, token };
        setAuth(newAuth);
        localStorage.setItem('auth', JSON.stringify(newAuth));
        
        navigate('/songs');
        

      }


    } catch (error) {
      toast(error.response.data.message);
      console.log(error);
    }
    setDetails({
      username: '',
      email: '',
      password: '',
      country: ''
    })
  }

  return (
    <div className='bg-custom-dark-blue h-full text-white flex gap-20 pt-10  justify-center items-center'>

      <div>

        <form className="bg-gray-800 p-8 rounded-lg shadow-lg  space-y-6 w-[560px] h-[700px]" onSubmit={onsumbit}>
          <div className='pr-3 flex gap-4' >
            <img src="" alt="#" />
            <Link to='/' className='font-press'><h1 className='text-3xl'>Audio Verse</h1></Link>
          </div>
          <div>
            <h1 className='font-bold text-3xl'>Create your Account</h1>
            <div className='flex  gap-2 '>
              <p className=''>Start your website in seconds. Already have an account? </p>
              <Link className='text-blue-500 hover:underline' to='/api/login'>Login here.</Link>
            </div>

          </div>
          <div className='grid grid-cols-2 items-center gap-3'>
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required onChange={onchange} value={details.email} name='email'
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="fullName">User Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="e.g. Bonnie Green"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required name='username' value={details.username} onChange={onchange}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="country">Country</label>
              <select
                id="country"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                name="country"
                value={details.country}
                onChange={onchange}
              >
                <option value="">Select a country</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="•••••••••"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required name='password' value={details.password} onChange={onchange}
              />
            </div>
          </div>

          <div className="text-gray-400 text-center my-4">or</div>
          <div className="flex flex-col space-y-4">
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
          <div className="text-gray-400 text-sm mt-6">
            <div>
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms">
                By signing up, you are creating a Flowbite account, and you agree to Flowbite's{' '}
                <Link to="/" className="text-blue-500">Terms of Use</Link> and{' '}
                <Link to="/" className="text-blue-500">Privacy Policy</Link>.
              </label>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="updates" className="mr-2" required />
              <label htmlFor="updates">
                Email me about product updates and resources.
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create an account
          </button>
        </form>
      </div>
      <div >
        <img src={Sign} alt="" className='w-96 h-[600px]' />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register
