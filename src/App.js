// App.js

import './App.css';
import Filters from './components/Filters/Filters';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from "./redux/slice/job-slice.js";
import Cardlist from './components/CardList/Cardlist.jsx';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [allJobs, setAllJobs] = useState([]);

  const handleFetchJobs = () => {
    dispatch(fetchJobs({ limit: limit, offset: offset }));
  };

  const jobData = useSelector(state => state.jobData.data);
  console.log("jobData:", jobData);

  const handleFilter = () => {
    // Implement filtering logic here
    setFilteredData(jobData); // For now, setting filteredData to jobData
  };

  useEffect(() => {
    handleFetchJobs();
  }, [offset]); // Fetch data when offset changes

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffset(prevOffset => prevOffset + limit);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [limit]); 

  useEffect(() => {
    if (jobData.length > 0) {
      setAllJobs(prevJobs => [...prevJobs, ...jobData]);
    }
  }, [jobData]);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Filters onFilter={handleFilter} />
      <div>
        <button onClick={handleFetchJobs}>Fetch</button>
      </div>
      <Cardlist jobData={allJobs} />
    </div>
  );
}

export default App;
