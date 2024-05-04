
import './App.css';
import Filters from './components/Filters/Filters';

import { useSelector, useDispatch} from 'react-redux';
import{fetchJobs} from "./redux/slice/job-slice.js"
import Cards from "./components/Cards/Cards.jsx"
import { useState } from 'react';
import Cardlist from './components/CardList/Cardlist.jsx';

function App() {
  const dispatch = useDispatch();
 


  const handleFetchJobs = () => {
   const data = dispatch(fetchJobs({ limit: 10, offset: 0 }));

  };


  const jobData = useSelector(state => state.jobData.data)
  console.log("jobData:",jobData)






  
  return (
    <div className="App">
     hello
     <Filters/>
     <div>
     <button onClick={handleFetchJobs}> fetch</button> 


     </div>
<Cardlist jobData={jobData}/>
    </div>
  );
}

export default App;
