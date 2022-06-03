import React, { useEffect, useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';
import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertComponent from './dashboard/components/AlertComponent';
import AQIindexComponent from './dashboard/components/AQIindexComponent';
import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
/* eslint-disable no-unused-vars */
function Dashboard() {
  const [locationDetails, setLocationDetails] = useState({
    location_id : '',
    branch_id: '',
    facility_id: '',
    building_id: '',
    floor_id: '',
    lab_id: ''
  });

  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(23.500);
  const [centerLng, setCenterLng] = useState(80.500); 

  return (
    <Grid container spacing={1}>
      <Grid item xs={8} sx={{
        marginTop: 1,
        backgroundColor: 'skyblue'
      }}>
        <LocationGridWidget setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng}locationDetails={locationDetails} setLocationDetails={setLocationDetails} />
      </Grid>
      <Grid item xs={4} sx={{
        marginTop: 1,
        backgroundColor: 'pink'
      }}>
        <AQIindexComponent/>
      </Grid>
      <Grid item xs={8} sx={{
        backgroundColor: 'pink'
      }}>
        <AlertComponent/>
      </Grid>
      <Grid item xs={4} sx={{
        backgroundColor: 'skyblue'
      }}>
        <GeoLocationWidget locationCoordination={locationCoordinationList} />        
      </Grid>
    </Grid>
  );
}

export default Dashboard;
