import React, { useState } from 'react';
import { PiBuildingOfficeFill } from "react-icons/pi";
import { IoFlash } from "react-icons/io5";

import "./Cards.css";

const Cards = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="job-card">
      <div className="job-details">
        <div className="company-details">
          <div className='company-logo'>
            <PiBuildingOfficeFill className='building-logo'/>
          </div>
          <div className="company-info">
            <h3>{job.companyName}</h3>
            <p className="job-role">{job.jobRole}</p>
            <p className="job-location">{job.location}</p>
          </div>
          
        </div>
        <div className='salary-info'>
        <p>Estimated salary:   {job.minJdSalary} - {job.maxJdSalary} {" "}L</p>
     
        </div>
        <hr/>
        <div className="job-description-container">
        <div className='description'>
        <h4>About Company</h4>
          <p>{expanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.slice(0, 100)}...`}</p>
        </div>
       
          <button className="show-more-btn" onClick={toggleExpanded}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
<div className='exp-wrapper'>
  <p>
  <span>Mimimum Experience:</span> {" "}{job.minExp} years
   </p>
</div>
       
      </div>
      <div className="apply-button">
        <button> <IoFlash className='flash-icon'/>Apply Now</button>
      </div>
    </div>
  );
};

export default Cards;
