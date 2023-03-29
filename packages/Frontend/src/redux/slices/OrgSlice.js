import { createSlice } from '@reduxjs/toolkit';

export const orgSlice = createSlice({
  name: 'org',
  initialState: {
    activeOrg: null,
    orgDetails: null,
  },
  reducers: {
    orgLogin: (state, action) => {
      (state.activeOrg = action.payload.activeOrg),
        (state.orgDetails = action.payload.orgDetails);
    },

    switchOrg: (state, action) => {
      (state.activeOrg = action.payload.activeOrg),
        (state.orgDetails = action.payload.orgDetails);
    },

    orgLogout: (state) => {
      (state.activeOrg = null), (state.orgDetails = null);
    },
  },
});

export const { orgLogin, switchOrg, orgLogout } = orgSlice.actions;

export const selectActiveOrg = (state) => state.org.activeOrg;
export const selectActiveOrgDetails = (state) => state.org.orgDetails;

export default orgSlice.reducer;
