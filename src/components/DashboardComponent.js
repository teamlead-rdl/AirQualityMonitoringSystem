import React, { useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';
import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertWidget from './dashboard/components/AlertWidget';
import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
/* eslint-disable no-unused-vars */
function Dashboard() {
  const [locationDetails, setLocationDetails] = useState({
    location_id: '',
    branch_id: '',
    facility_id: '',
    building_id: '',
    floor_id: '',
    lab_id: '',
  });

  const [locationState, setProgressState] = useState(0);

  return (
    <Grid container spacing={1} style={{ height: '92.5%' }}>
      <Grid
        item
        xs={12}
        style={{ height: '50%' }}
        sx={{
          marginLeft: 1,
        }}
      >
        <Grid
          container
          item
          xs={12}
          style={{ height: '100%' }}
        >
          <Grid
            item
            xs={8}
            sx={{
            }}
            style={{ height: '100%' }}
          >
            <LocationGridWidget
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              locationState={locationState}
              setProgressState={setProgressState}
            />
          </Grid>

          <Grid item xs={4}>
            <GeoLocationWidget />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          padding: 1,
          marginLeft: 1,
        }}
        style={{ height: '50%' }}
      >
        <AlertWidget />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
