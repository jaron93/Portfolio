import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../services/api';

export interface IAnnouncement {
   _id: string,
   receiver: Array<string>,
   is_read: boolean,
   sender: string,
   message: string,
   created_at: string
}

export interface AnnouncementsState {
   announcements: IAnnouncement[]
}

const initialState: AnnouncementsState = {
   announcements: []
}

const announcementsSlice = createSlice({
   name: 'announcements',
   initialState,
   reducers: {
      setAnnouncements: (state, { payload }: PayloadAction<IAnnouncement[]>) => {
         state.announcements = payload
      },
      toggleSeen(state, action) {
         const index = state.announcements.findIndex((a) => a._id === action.payload._id);
         state.announcements[index].is_read = true
      },
      deleteNotification(state, action) {
         const index = state.announcements.findIndex((a) => a._id === action.payload._id);
         state.announcements.splice(index, 1)

         const deleteFromApi = async () => {
            await api.delete("/api/notification/" + action.payload)
         }
         deleteFromApi()

      }
   }
})





export default announcementsSlice.reducer

export const { toggleSeen, setAnnouncements, deleteNotification } = announcementsSlice.actions;
