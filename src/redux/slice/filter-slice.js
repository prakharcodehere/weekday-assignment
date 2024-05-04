
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobListings: [],
  
  dropdownOptions: {},
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setJobListings(state, action) {
      state.jobListings = action.payload;
    },
    setDropdownOptions(state, action) {
      state.dropdownOptions = action.payload;
    },
  },
});

export const { setJobListings, setDropdownOptions } = filtersSlice.actions;
export default filtersSlice.reducer;
