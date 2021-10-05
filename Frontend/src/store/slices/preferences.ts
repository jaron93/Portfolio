import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const preferencesSlice = createSlice({
   name: 'preferences',
   initialState: {
      /*     locale: 'en-us',
          muted: false, */
      sidebarOpen: true,
      selectedConversation: false,
   },
   reducers: {
      isConversationSelected: (state, { payload }: PayloadAction<any>) => {
         state.selectedConversation = payload;
      },
      toggleBar(state) {
         state.sidebarOpen = !state.sidebarOpen;
      },
      hideBar(state) {
         state.sidebarOpen = false;
      },
   },
});

export const { toggleBar, hideBar, isConversationSelected } =
   preferencesSlice.actions;

export default preferencesSlice.reducer;
