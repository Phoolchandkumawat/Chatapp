import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    users:[],
    profile:[],
    chat:false
}


const ChatSlices = createSlice({
    initialState,
    name:'chat',
    reducers:{
        setusers: (status, action)=>{
            status.users = {user:action.payload.user, display:action.payload.display}
        },
        setchatuser:(status, action)=>{
                status.chat = action.payload
        },


    }
})



export const  {setchatuser, setusers} = ChatSlices.actions

export default ChatSlices.reducer