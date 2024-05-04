// jobSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
 data: [],
  loading: false,
  error: null,
};



export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ limit, offset }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({ limit, offset });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const data = await response.json();
      return data.jdList;
    } catch (error) {
  throw new Error(error)
    }
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  
 
  extraReducers: builder => {
    builder
      .addCase(fetchJobs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default jobSlice.reducer;
