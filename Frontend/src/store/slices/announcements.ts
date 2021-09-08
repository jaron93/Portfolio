import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   announcements: [{
      id: 1,
      date: "2021-09-01T11:59:06.191Z",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      seen: false,
   },
   {
      id: 2,
      date: "2020-09-01T11:59:06.191Z",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      seen: true,
   }
   ],
}

const announcementsSlice = createSlice({
   name: 'announcements',
   initialState,
   reducers: {
      toggleSeen(state, action) {
         const index = state.announcements.findIndex((a) => a.id === action.payload.id);
         state.announcements[index].seen = true
         console.log(index);

      }
   }
})


export default announcementsSlice.reducer

export const { toggleSeen } = announcementsSlice.actions;
