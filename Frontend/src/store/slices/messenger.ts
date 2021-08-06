import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   conversations: [],
   messages: [],
}


const messengerSlice = createSlice({
   name: 'messenger',
   initialState,
   reducers: {
      setConversations: (state, { payload }: PayloadAction<any>) => {
         state.conversations = payload
      },
      setMessages: (state, { payload }: PayloadAction<any>) => {
         state.messages = payload
      },
   }
})


export default messengerSlice.reducer

export const { setConversations, setMessages } = messengerSlice.actions;
