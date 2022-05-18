import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { FacilityListResults } from './siteDetails/facility/facilityList';
import MapsMultiplePoints from './maps/mapsMultiplePoints';
import { useParams, useLocation } from 'react-router-dom';

function Facility() {
  const routeStateObject = useLocation();
  const { centerCoordination } = routeStateObject.state;
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(21.785);
  const [centerLng, setCenterLng] = useState(72.91655655);
  useEffect(() => {
    let coordinates = centerCoordination ? centerCoordination.replaceAll('"', '').split(',') : [];
    setCenterLat(parseFloat(coordinates[0]) || '');
    setCenterLng(parseFloat(coordinates[1]) || '');
  }, [locationCoordinationList]);
  return (
    <Container maxWidth={false} style={{ marginTop: 0 }}>
      <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <FacilityListResults
          locationCoordinationList={locationCoordinationList}
          setLocationCoordinationList={setLocationCoordinationList}
          centerLat={centerLat}
          centerLng={centerLng}
        />
      </Grid>
      <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
        {locationCoordinationList.length !== 0
          ? (
            <MapsMultiplePoints
              width="100%"
              height="50vh"
              markers={locationCoordinationList}
              zoom={11}
              center={{ lat: centerLat, lng: centerLng }}
            />
          )
          : ''}
      </Grid>
    </Container>
  );
}

export default Facility;
