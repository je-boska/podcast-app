import { createSlice } from '@reduxjs/toolkit'

const subsciptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
  },
  reducers: {
    addSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.concat(action.payload)
    },
  },
})

export const { addSubscription } = subsciptionsSlice.actions

export const selectSubscriptions = state => state.subscriptions.subscriptions

export default subsciptionsSlice.reducer
