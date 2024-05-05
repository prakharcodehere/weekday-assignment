
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


//data👇

  const jobData = useSelector(state => state.jobData.data);
  console.log("jobData:", jobData);

  

  useEffect(() => {
    handleFetchJobs();
  }, [offset]); 

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




  const handleFilter = (filters) => {
    const filteredJobs = allJobs.filter(job => {
      let passFilter = true;
      // Loop through each filter criteria provided by the user
      Object.entries(filters).forEach(([key, value]) => {
        // Skip empty filter values
        if (!value) return;
        // Check if the job passes the current filter criteria
        if (key === 'minExperience' && job.minExp < value) {
          passFilter = false;
        } else if (key === 'minBasePay' && job.minJdSalary < value) {
          passFilter = false;
        } else if (key === 'companyName' && job.companyName.toLowerCase().indexOf(value.toLowerCase()) === -1) {
          passFilter = false;
        } else if (key === 'location' && job.location.toLowerCase().indexOf(value.toLowerCase()) === -1) {
          passFilter = false;
        } else if (key === 'role' && job.jobRole.toLowerCase().indexOf(value.toLowerCase()) === -1) {
          passFilter = false;
        }
        // Add more filter criteria similarly
      });
      return passFilter;
    });
    // Update the state with filtered jobs
    setFilteredData(filteredJobs);
  };
  



  return (
    <div className="App">
      <h1>Hello</h1>
      <Filters onFilter={handleFilter}/>
      
      <Cardlist jobData={filteredData.length > 0 ? filteredData : allJobs} />
    </div>
  );
}

export default App;