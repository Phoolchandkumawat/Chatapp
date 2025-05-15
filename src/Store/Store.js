import {configureStore} from '@reduxjs/toolkit'
import chatReducers from './slices/ChatSlices'

export const Store = configureStore({
    reducer:chatReducers
})