import React, { useEffect, useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';
import LocationComponent from './dashboard/components/LocationComponent';
import AlertComponent from './dashboard/components/AlertComponent';
import AQIindexComponent from './dashboard/components/AQIindexComponent';
import GeoLocationsComponent from './dashboard/components/GeoLocationsComponent';
/* eslint-disable no-unused-vars */
function Dashboard() {
  const [locationDetails, setLocationDetails] = useState({
    location_id : '',
    branch_id: '',
    facility_id: '',
    building_id: '',
    floor_id: '',
    lab_id: ''
  })
  return (
    <Grid container spacing={1}>
      <Grid item xs={8} sx={{
        marginTop: 1,
        backgroundColor: 'skyblue'
      }}>
        <LocationComponent locationDetails = {locationDetails, setLocationDetails}/>
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
        <GeoLocationsComponent/>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
