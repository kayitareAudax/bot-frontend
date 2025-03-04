import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    // const navigate=useNavigate()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const handleUsernameChange=(e)=>setUsername(e.target.value)
    const handlePasswordChange=(e)=>setPassword(e.target.value)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          const resp=await axios.post('users/login/',{username,password})
          console.log(resp.data);    
          if(resp.data.success){
            localStorage.setItem('token',resp.data.message)
            localStorage.setItem('username',resp.data.username)
           return navigate('/')
          }
          
        } catch (error) {
          console.log(error);
          
        }
      }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" /> */}
          <h2 className="mt-6 text-center text-4xl font-bold leading-9 tracking-tight text-GRAY-600">
            Welcome Back
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow shadow-red-200 sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-danger hover:text-orange">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
              <button
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V1.5"
                        ></path>
                      </svg>
                      Sign In...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              <div className="justify-center align-center items-center">
                <p className="text-center">
                  Don't have an account?
                  <a href="/register">
                    <span className="text-secondary font-bold ml-2">Sign up</span>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default LoginScreen
