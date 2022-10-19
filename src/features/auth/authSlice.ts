import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../types'

interface authI {
  accessToken: string
}

const initialState: authI = {
  accessToken: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<authI>) {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
  },
})

export const selectAccessToken = (state: RootState) => state.auth

export const { setAuth } = authSlice.actions
export default authSlice.reducer
