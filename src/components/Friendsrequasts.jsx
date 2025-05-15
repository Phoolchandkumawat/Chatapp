import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import Requests from './Requests'
import { Avatar } from '@radix-ui/react-avatar'
import { UserAvatar } from './UserAvatar'

function Friendsrequasts({...props}) {
  return (
    <div className="w-full h-full" {...props}>
        <div className="w-full p-2 h-20 flex items-center ">  
            <div className="flex items-center w-full h-full px-2 rounded-2xl justify-between cursor-pointer hover:bg-[var(--secondary)]">
                <div className="flex gap-5">
                    <UserAvatar src={"/lovable-uploads/fa857c60-a4a4-4492-a389-c2c41857bf21.png"}
                    fallback={"rea"}
                    />
                    <div className="text">
                        <h3>Friends Requests</h3>
                        <span className='text-[12px]'>No New Requests</span>
                    </div>
                </div>
                <div className="mr-5">
                    <ArrowRight/>
                </div>
            </div> 
            <div className={`hidden`}>
                <Requests/>
            </div>
        </div>
    </div>
  )
}

export default Friendsrequasts