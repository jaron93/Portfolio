import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   announcements: [],
}

const announcementsSlice = createSlice({
   name: 'announcements',
   initialState,
   reducers: {
      setAnnouncements: (state, { payload }: PayloadAction<any>) => {
         state.announcements = payload
      },
      toggleSeen(state, action) {
         /*  const index = state.announcements.findIndex((a) => a.id === action.payload.id);
          state.announcements[index].seen = true */
      }
   }
})


export default announcementsSlice.reducer

export const { toggleSeen, setAnnouncements } = announcementsSlice.actions;
