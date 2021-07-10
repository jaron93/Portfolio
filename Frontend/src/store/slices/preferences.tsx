import { createSlice, /* PayloadAction */ } from '@reduxjs/toolkit';

const preferencesSlice = createSlice({
   name: 'preferences',
   initialState: {
      /*     locale: 'en-us',
          muted: false, */
      sidebarOpen: true,
   },
   reducers: {
      /* toggleMuted(state) {
        state.muted = !state.muted;
      },
      setLanguage(state, action: PayloadAction<ILocale>) {
        state.locale = action.payload;
      }, */
      toggleBar(state) {
         state.sidebarOpen = !state.sidebarOpen;
      },
      hideBar(state) {
         state.sidebarOpen = false;
      },
   },
});

export const { /* toggleMuted, setLanguage, */ toggleBar, hideBar } =
   preferencesSlice.actions;

export default preferencesSlice.reducer;