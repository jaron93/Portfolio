import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   announcement: [{
      id: 1,
      date: "2021-09-01T11:59:06.191Z",
      text: "test",
      seen: false
   }],
}

const announcementSlice = createSlice({
   name: 'announcement',
   initialState,
   reducers: {
      setAnnouncement: (state, { payload }: PayloadAction<any>) => {
         state.announcement = payload
      },
   }
})


export default announcementSlice.reducer

export const { setAnnouncement } = announcementSlice.actions;
