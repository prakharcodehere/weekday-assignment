import React, { useState } from 'react';
import { PiBuildingOfficeFill } from "react-icons/pi";

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
            <PiBuildingOfficeFill />
          </div>
          <div className="company-info">
            <h3>{job.companyName}</h3>
            <p>{job.jobRole}</p>
            <p>{job.location}</p>
          </div>
        </div>
        <div className="job-description">
          <p>{expanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.slice(0, 100)}...`}</p>
          <button className="show-more-btn" onClick={toggleExpanded}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
      <div className="apply-button">
        <button>Apply Now</button>
      </div>
    </div>
  );
};

export default Cards;
