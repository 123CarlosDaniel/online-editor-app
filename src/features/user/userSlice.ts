import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../../types'

interface userI {
  userName : string
  contacts : string[]
  rooms : string[]
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
      state = {userName,contacts,email,rooms,_id}
    }
  }
})

export const selectAccessToken = (state:RootState) => state.user

export const { setUser} = userSlice.actions
export default userSlice.reducer