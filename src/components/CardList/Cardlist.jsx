import React from 'react'
import Cards from '../Cards/Cards'
import "./cardlist.css"

const Carrdlist = ({jobData}) => {
  return (
    <div className='card-container'>
    {jobData.map(job => (
         <Cards key={job.jdUid} job={job} />
       ))}
       </div>
  )
}

export default Carrdlist