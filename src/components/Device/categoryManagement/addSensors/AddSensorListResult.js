import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import AddSensorManagement from './AddSensorManagement';

const AddSensorListResult = () => {    
    
  return (
    <div className="container mx-auto" style={{marginTop:0, padding: 0}}> 
      <Container maxWidth={false} style={{padding:0, marginTop:0}}>  
        <AddSensorManagement />
      </Container>
    </div>
  );
};

export default AddSensorListResult;