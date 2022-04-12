import React, { useState } from 'react';
// import Box from '@mui/material/Box';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import MapsComponent from './maps/googleMapsComponent';
import { BuildingListResults} from './siteDetails/building/buildingList';
import MapsMultiplePoints from './maps/mapsMultiplePoints';

const Building = () => {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  
  return (
    <Container maxWidth={false} style={{marginTop:0}}>
      <Grid sx={{ mt: 1 }}  xs={12} sm={12} md={12} lg={12} xl={12}>
        <BuildingListResults setLocationCoordinationList={setLocationCoordinationList}/>
      </Grid>
      <Grid sx={{ mt: 1 }}  xs={12} sm={12} md={12} lg={12} xl={12}>
        <MapsMultiplePoints 
          width="100%"
          height="50vh"
          markers={locationCoordinationList}
          zoom={18}
          center={{ lat: 12.842197005774004, lng: 77.66140179200926 }}
        />
      </Grid>
    </Container>
  );
};

export default Building;