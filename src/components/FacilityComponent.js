import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MapsComponent from './maps/googleMapsComponent';
import { FacilityListResults } from './siteDetails/facility/facilityList';
import { Container } from '@mui/material';
import MapsMultiplePoints from './maps/mapsMultiplePoints';

const Facility = () => {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  
  return (
    <Container maxWidth={false} style={{marginTop:0}}>
      <Grid sx={{ mt: 1 }}  xs={12} sm={12} md={12} lg={12} xl={12}>
        <FacilityListResults setLocationCoordinationList={setLocationCoordinationList} />
      </Grid>
      <Grid sx={{ mt: 1 }}  xs={12} sm={12} md={12} lg={12} xl={12}>
        <MapsMultiplePoints 
          width="100%"
          height="50vh"
          markers={locationCoordinationList}
          zoom={11}
          center={{ lat: 12.93578497664241, lng: 77.62549749585297 }}
        />
      </Grid>
    </Container>
  );
};

export default Facility;