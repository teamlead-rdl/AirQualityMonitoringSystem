import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MapsComponent from './maps/googleMapsComponent';
import { BranchListResults } from './siteDetails/branch/branchList';
import MapsMultiplePoints from './maps/mapsMultiplePoints';
import ApplicationStore from '../utils/localStorageUtil';

function Branch() {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(21.785);
  const [centerLng, setCenterLng] = useState(72.91655655);
  const { locationId } = useParams();
  useEffect(()=>{
    setCenterLat(locationCoordinationList[0]?.position.lat);
    setCenterLng(locationCoordinationList[0]?.position.lng);
  }),[locationCoordinationList];
  return (
    <Container maxWidth={false} style={{ marginTop: 0 }}>
      <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <BranchListResults locationId={locationId} locationCoordinationList={locationCoordinationList} setLocationCoordinationList={setLocationCoordinationList} />
      </Grid>
      <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <MapsMultiplePoints
          width="100%"
          height="50vh"
          markers={locationCoordinationList}
          zoom={6}
          center={{ lat: centerLat, lng: centerLng }}
        />
      </Grid>
    </Container>
  );
}

export default Branch;
