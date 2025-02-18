import React,{useState} from 'react'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')

    const handleEmailChange=(e)=>setEmail(e.target.value)
    const handlePasswordChange=(e)=>setPassword(e.target.value)
    const handleFullNameChange=(e)=>setFullName(e.target.value)
    const handleComfirmPaswordChange=(e)=>setComfirmPassword(e.target.value)
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        console.log(email,password)
        setLoading(false)}
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" /> */}
          <h2 className="mt-6 text-center text-4xl font-bold leading-9 tracking-tight text-GRAY-600">
            Welcome
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow shadow-red-200 sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={fullName}
                    onChange={handleFullNameChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
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
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Comfirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={comfirmPassword}
                    onChange={handleComfirmPaswordChange}
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

export default RegisterScreen
