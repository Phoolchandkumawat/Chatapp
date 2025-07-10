import React, { useState } from 'react'
import authService from '../supabase/supabase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setusers } from '../Store/slices/ChatSlices'
function Login() {
    const [user, setUser] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function getLog(e){
        e.preventDefault()
        setError(null)
        try {
            const data = await authService.login({password:password, email:user})
            if(data){
                navigate('/')
                const datauser = await authService.fetchUserProfile()
                const user = await authService.getCurrentUser()
                dispatch(setusers({user:user["data"].user, display:datauser}))
                
            }
        } catch (error) {
            setError(error)
        }
    }
  return (
    <div className='bg-background w-full h-screen flex items-center justify-center'>
        <div className="w-[360px] h-4/6 border-[1px] border-foreground rounded-sm">
            <div className="w-full h-full p-2">
                <h4 className='mt-2 text-center text-3xl capitalize text-[var(--foreground)]'>Log in</h4>
                <form onSubmit={getLog}>
                    <div className="flex flex-col gap-5 w-5/6 mx-auto mt-10">
                        <div className="input relative inpufo w-full h-full">
                            <input id='email' type="text"  required value={user} onChange={e=> setUser(e.target.value)} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'/>
                            <label htmlFor="email" className='absolute top-1/2 -translate-y-1/2 left-5 -z-10'>User Email</label>
                        </div>
                        <div className="input relative inpufo mt-5 w-full h-full">
                            <input type="password" id='pass' required value={password} onChange={e=> setPassword(e.target.value)} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'/>
                            <label htmlFor="pass" className='absolute top-1/2 -translate-y-1/2 left-5 -z-10'>User Password</label>
                        </div>
                    </div>
                    <div className='mt-5 ml-5 hover:underline cursor-pointer'>Forgot Password ?</div>
                    <div className="mt-10 w-full flex items-center justify-center">
                        <input type="checkbox" />
                        <span className='ml-2'>Remember Me</span>
                    </div>

                    <button type='submit' className='bg-[var(--green-500)] w-full py-2 mt-2 cursor-pointer hover:scale-95 transition-all'>Log In</button>

                    <div className="text-center mt-5">
                        <button type='button'>Don't Have A Account <span className='underline cursor-pointer' onClick={()=> navigate("/signup")}>Create A Account</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login