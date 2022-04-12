import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import DeviceListResults from '../deviceCategory/subComponent/DeviceListResults';
import SensorListResult from './subComponent/SensorListResult';

const AddSensorCategory = () => {
  return (
    <Container maxWidth={false} sx={{marginTop:0, padding:0}}>
      <Grid 
        sx={{ marginTop:0  , padding: 0}}
        item 
        xs={12} sm={12} md={12} lg={12} xl={12}
      >
        <SensorListResult />
      </Grid>
    </Container>
  );
};

export default AddSensorCategory;