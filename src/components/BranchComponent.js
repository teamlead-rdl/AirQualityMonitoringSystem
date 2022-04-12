import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MapsComponent from './maps/googleMapsComponent';
import { BranchListResults } from './siteDetails/branch/branchList';
import { Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MapsMultiplePoints from './maps/mapsMultiplePoints';

const Branch = () => {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);

  const { locationId } = useParams();
  return (
    <Container maxWidth={false} style={{ marginTop: 0 }}>
      <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <BranchListResults locationId={locationId} setLocationCoordinationList={setLocationCoordinationList}/>
      </Grid>
      <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <MapsMultiplePoints 
          width="100%"
          height="50vh"
          markers={locationCoordinationList}
          zoom={7}
          center={{ lat: 12.921644363201798, lng: 74.86236071158463 }}
        />
      </Grid>
    </Container>
  );
};

export default Branch;