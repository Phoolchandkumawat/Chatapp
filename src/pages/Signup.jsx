import React, { useEffect, useState } from 'react';
import authService from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setusers } from '../Store/slices/ChatSlices';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function signup (){
    try {
      const data = await authService.createAccount({email, password, name: username})
      return data
    } catch (error) {
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert('Passwords do not match');
    } else {

        try {
            const signupdata = await signup(); // Await the signup function
            // const { user, profile } = await authService.createAccount({ email, password, name: username });
            console.log('Sign up successful', signupdata);
            if(signupdata){
                navigate('/')
                const userData = await authService.fetchUserProfile();
                const session = await authService.getCurrentUser()
                console.log(session)
                console.log(userData)
                dispatch(setusers({user:session["data"].user, display:userData}))
            }
        } catch (error) {
            console.error("Error during sign up:", error); // Log the error
            alert("Sign up failed: " + error.message); // Show an alert with the error message
        }
    }
};

  useEffect(()=>{
    function checkInput(){
      if(username.length>10){
        setError("User Name Should Be Under 10 Words")
      }else{
        setError(null)
      }
    }
    checkInput()

  },[username])

  return (
    <div className="flex justify-center bg-background items-center h-screen">
      <div className="relative border-[var(--foreground)] border-[1px] p-10 rounded-lg shadow-md w-1/2">
        <h1 className="text-3xl text-[var(--foreground)] text-center font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-foreground text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-foreground text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-foreground text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-foreground text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className={`${error != null ? "flex": "hidden"} mb-2 text-red-500`}>
            <span>{error}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;