import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../../types'

interface ContactI {
  id : string
  name : string
  email : string
}

interface userI {
  userName : string
  contacts : ContactI[]
  rooms : Array<{
    name : string
    id : string
  }>
  email : string
  _id : string
}

const initialState : userI = {
  userName : '',
  contacts : [],
  rooms : [],
  email : '',
  _id : ''
}

const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers : {
    setUser(state,action:PayloadAction<userI>){
      const {userName,contacts,email,rooms,_id} = action.payload
      state._id = _id
      state.userName = userName
      state.contacts = contacts
      state.email = email
      state.rooms = rooms
    }
  }
})

export const selectUser = (state:RootState) => state.user

export const { setUser} = userSlice.actions
export default userSlice.reducer