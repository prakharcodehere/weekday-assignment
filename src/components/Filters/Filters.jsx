import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';


const Filters = ({onFilter}) => {

  const [filters, setFilters] = React.useState({
    minExperience: '',
    minBasePay: '',
    remote: '',
    companyName: '',
    location: '',
    role: '',
    techStack: [], 
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    

    setFilters({ ...filters, [name]: value });
  };


  //filter-request-changing based on dependency

  useEffect(() => {
    onFilter(filters); 
  }, [filters, onFilter]);




  const techStackOptions = [
    'React', 
    'Angular', 
    'Vue', 
    'Node.js', 
    'Express.js', 
    'Django', 
    'Flask', 
    'Spring', 
    'Laravel', 
    'Ruby on Rails',
    'JavaScript',
    'TypeScript',
    'Django',
    'C++',
    'Python',
    'Java'
  ];

  const handleTechStackChange = (event) => {
    setFilters({ ...filters, techStack: event.target.value });
  };

  

  
  const handleDeleteTechStack = (chipToDelete) => () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      techStack: prevFilters.techStack.filter((chip) => chip !== chipToDelete),
    }));
  };

  return (
    <Grid container spacing={3} style={{ padding: "20px"}}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <FormControl fullWidth>
          <InputLabel id="min-experience-label">Min Experience</InputLabel>
          <Select
            labelId="min-experience-label"
            id="min-experience"
            name="minExperience"
            value={filters.minExperience}
            onChange={handleChange}
          >
            {[...Array(10).keys()].map(num => (
              <MenuItem key={num} value={num + 1}>{num + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <FormControl fullWidth>
          <InputLabel id="min-base-pay-label">Min Base Pay</InputLabel>
          <Select
            labelId="min-base-pay-label"
            id="min-base-pay"
            name="minBasePay"
            value={filters.minBasePay}
            onChange={handleChange}
          >
            {[0, 10, 20, 30, 40, 50, 60, 70].map(num => (
              <MenuItem key={num} value={num}>{num}L</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <FormControl fullWidth>
          <InputLabel id="remote-label">Remote/On-site</InputLabel>
          <Select
            labelId="remote-label"
            id="remote"
            name="remote"
            value={filters.remote}
            onChange={handleChange}
          >
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
            <MenuItem value="in-office">In-office</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <TextField
          fullWidth
          id="company-name"
          label="Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleChange}
        />
      </Grid>

     
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <TextField
          fullWidth
          id="location"
          label="Location"
          name="location"
          value={filters.location}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <TextField
          fullWidth
          id="role"
          label="Role"
          name="role"
          value={filters.role}
          onChange={handleChange}
        />
      </Grid>


      <Grid item xs={12} sm={6} md={4} lg={2}>
        <FormControl fullWidth>
          <InputLabel id="tech-stack-label">Tech Stack</InputLabel>
          <Select
            labelId="tech-stack-label"
            id="tech-stack"
            name="techStack"
            multiple
            value={filters.techStack}
            onChange={handleTechStackChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={handleDeleteTechStack(value)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            )}
          >
            {techStackOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>


    </Grid>
    
  );
};

export default Filters;
