import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from "./redux/slice/job-slice.js";
import Filters from './components/Filters/Filters';
import Cardlist from './components/CardList/Cardlist.jsx';
import "./App.css"

function App() {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10); 
  const [allJobs, setAllJobs] = useState([]); 
  const [initialFetched, setInitialFetched] = useState(false);

  const handleFetchJobs = (offsetToFetch) => {
    dispatch(fetchJobs({ limit, offset: offsetToFetch }));
  };

  const jobData = useSelector(state => state.jobData.data);

  useEffect(() => {
    if (!initialFetched) {
      handleFetchJobs(0);
      setInitialFetched(true);
    }
  }, [initialFetched]); 

  useEffect(() => {
    if (jobData.length > 0) {
      if (offset === 0) {
        setAllJobs(jobData);
      } else {
        setAllJobs(prevJobs => [...prevJobs, ...jobData]);
      }
    }
  }, [jobData, offset]); 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 
      ) {
        setOffset(prevOffset => prevOffset + limit);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [limit]); 

  useEffect(() => {
    if (offset > 0) {
      handleFetchJobs(offset);
    }
  }, [offset]); 

  const handleFilter = (filters) => {
    
    const filteredJobs = allJobs.filter(job => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; 
        switch (key) {
          case 'minExperience':
            return job.minExp >= value;
          case 'minBasePay':
            return job.minJdSalary >= value;
          case 'companyName':
            return job.companyName.toLowerCase().includes(value.toLowerCase());
          case 'location':
            return job.location.toLowerCase().includes(value.toLowerCase());
          case 'role':
            return job.jobRole.toLowerCase().includes(value.toLowerCase());
            case 'remote':
  if (value === 'remote') {
    return job.location.toLowerCase() === 'remote';
  } else {
    return job.location.toLowerCase() !== 'remote';
  }
          default:
            return true;
        }
      });
    });
    setFilteredData(filteredJobs);
  };

  return (
    <div className="App">
      <div className='main-logo'>
        <span className='logo-content'>Weekday <span className='logo-dot'>.</span></span>
      </div>
      <Filters onFilter={handleFilter} />
      {filteredData.length > 0 ? (
        <Cardlist jobData={filteredData} />
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}

export default App;
