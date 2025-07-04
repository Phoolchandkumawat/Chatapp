import { ArrowLeft, UserCircle2} from 'lucide-react'
import React from 'react'
import { UserAvatar } from './UserAvatar'
import authService from '../supabase/supabase'
import { Navigate } from 'react-router-dom'

function ProfileSettings({setShow}) {
  const navigate = Navigate()
  const logoutProfile = async()=>{
    // console.log("lcik log")
    try {
      const logout = authService.logout()
      if(logout){
        navigate('/home')
        
      }
      // console.log('ddfe222')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-80 h-screen bg-[var(--card)]'>
      <div className="flex gap-2 p-2 cursor-pointer">
        <ArrowLeft onClick={()=>setShow(false)}/>
        <span>Back</span>
      </div>

      <div className="proflie flex items-center justify-center h-20">
      <UserAvatar
                src={""}
                fallback={"p"}
                size="sm"
                
      />
      <div className="text">
        <span>Aam Adami</span>
      </div>
      </div>
      <div className="list-settings items-center flex justify-center">
        <ul className='grid grid-cols-1 gap-2 h-full overflow-y-scroll scrollthumb'>
          <li><a href="">
                <div className="flex hover:bg-[var(--bgac)] items-center justify-center gap-2 rounded-md p-2 gap-1">
                  <UserCircle2/>
                  <div className="grid">
                    <span>Accounts</span>
                    <span className='text-[13px]'>Security notifications, Change Number</span>
                  </div>
                </div>
          </a></li>
          <li><a href="">
                <div className="flex flex-col hover:bg-[var(--bgac)] rounded-md p-2 gap-1">
                  <span>Privacy</span>
                  <span className='text-[13px]'>Block contacts, disappearing messages</span>
                </div>
          </a></li>
          <li><a href="">
                <div className="flex flex-col hover:bg-[var(--bgac)] rounded-md p-2 gap-1">
                  <span>Chats</span>
                  <span className='text-[13px]'>Theme, wallpapers, chat history</span>
                </div>
          </a></li>
          <li><a href="">
                <div className="flex flex-col hover:bg-[var(--bgac)] rounded-md p-2 gap-1">
                  <span>Storage and data</span>
                  <span className='text-[13px]'>Network usage, auto-download</span>
                </div>
          </a></li>
          <li><a href="">
                <div className="flex flex-col hover:bg-[var(--bgac)] rounded-md p-2 gap-1">
                  <span>App language</span>
                  <span className='text-[13px]'>English</span>
                </div>
          </a></li>
          <li><a href="">
                <div className="flex flex-col hover:bg-[var(--bgac)] rounded-md p-2 gap-1">
                  <span>Help</span>
                  <span className='text-[13px]'>Help center, contect us, privacy policy</span>
                </div>
          </a></li>
          <li><a href="" className='p-2'>Invite a friend</a></li>
          <li><button onClick={logoutProfile} className='p-2 text-red-600 cursor-pointer' type='button'>Log Out</button></li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileSettings