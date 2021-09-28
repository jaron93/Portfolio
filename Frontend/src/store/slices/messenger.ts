import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   currentChat: [],
   currentTitle: "Conversation"
}

const messengerSlice = createSlice({
   name: 'messenger',
   initialState,
   reducers: {
      setCurrentChat: (state, { payload }: PayloadAction<any>) => {
         state.currentChat = payload
      }
   }
})



export default messengerSlice.reducer

export const { setCurrentChat } = messengerSlice.actions;
