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
        setProfiles: (state, action) => {
            const { id, ...newData } = action.payload; // Destructure id and new data from payload
            const index = state.profile.findIndex(profile => profile.id === id); // Find the index of the profile with the matching ID
            
            if (index !== -1) {
                // If a matching profile is found, update it with new data
                state.profile[index] = { ...state.profile[index], ...newData };
            } else {
                // If no matching profile is found, push the new profile
                state.profile.push(action.payload);
            }
        },

    }
})



export const  {setchatuser, setusers, setProfiles} = ChatSlices.actions

export default ChatSlices.reducer