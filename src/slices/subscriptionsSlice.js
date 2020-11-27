import { createSlice } from '@reduxjs/toolkit'

const subsciptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
  },
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload
    },
    addSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.concat(action.payload)
    },
    removeSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.filter(
        subscription =>
          subscription.collectionId !== action.payload.collectionId
      )
    },
  },
})

export const {
  setSubscriptions,
  addSubscription,
  removeSubscription,
} = subsciptionsSlice.actions

export const selectSubscriptions = state => state.subscriptions.subscriptions

export default subsciptionsSlice.reducer
