
import './App.css';
import Filters from './components/Filters/Filters';
import getJobs from "./services/getJobData.js"
import { useSelector, useDispatch} from 'react-redux';
import{fetchJobs} from "./redux/slice/job-slice.js"

function App() {
  const dispatch = useDispatch();

  const handleFetchJobs = () => {
   const data = dispatch(fetchJobs({ limit: 10, offset: 0 }));
    console.log("data". data)
  };
  return (
    <div className="App">
     hello
     <Filters/>
     <div>
     <button onClick={handleFetchJobs}> fetch</button> 
     </div>
    </div>
  );
}

export default App;
