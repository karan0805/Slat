import { createSlice } from '@reduxjs/toolkit';

export const orgSlice = createSlice({
  name: 'org',
  initialState: {
    activeOrg: null,
    orgDetails: null,
  },
  reducers: {
    login: (state, action) => {
      (state.activeOrg = action.payload.activeOrg),
        (state.orgDetails = action.payload.orgDetails);
    },

    switchOrg: (state, action) => {
      (state.activeOrg = action.payload.activeOrg),
        (state.orgDetails = action.payload.orgDetails);
    },

    logout: (state) => {
      (state.activeOrg = null), (state.orgDetails = null);
    },
  },
});

export const { login, switchOrg, logout } = orgSlice.actions;

export const selectActiveOrg = (state) => state.org.activeOrg;
export const selectActiveOrgDetails = (state) => state.org.orgDetails;

export default orgSlice.reducer;
