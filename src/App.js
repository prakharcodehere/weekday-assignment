
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
 
      Object.entries(filters).forEach(([key, value]) => {
      
        if (!value) return;
     
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
        
      });
      return passFilter;
    });
    
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