import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slice/filter-slice'; 
import jobDataReducer from "./slice/job-slice"
const store = configureStore({
  reducer: {
  
    jobData: jobDataReducer,
  },
});

export default store;








// filters: filtersReducer,