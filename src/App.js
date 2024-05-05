
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
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // If filter value is empty, pass the filter
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
          default:
            return true;
        }
      });
    });
    setFilteredData(filteredJobs);
  };
  



  return (
    <div className="App">
      <h1>Hello</h1>
      <Filters onFilter={handleFilter}/>
      
      {filteredData.length > 0 ? (
        <Cardlist jobData={filteredData} />
      )  : (
        <>
        
        <p>No search results found.</p>
        </>
          
        )
       }
    </div>
  );
}

export default App;