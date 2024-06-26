import React from 'react'
import Cards from '../Cards/Cards'
import "./cardlist.css"

const Cardlist = ({jobData}) => {
  return (
    <div className='card-container'>
    {jobData.map((job, id) => (
         <Cards key={id+ 1} job={job} />
       ))}
       </div>
  )
}

export default Cardlist