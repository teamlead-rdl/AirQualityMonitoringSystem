import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { FacilityListResults } from './siteDetails/facility/facilityList';
import MapsMultiplePoints from './maps/mapsMultiplePoints';
import { useLocation } from 'react-router-dom';

function Facility() {
  const routeStateObject = useLocation();
  const { centerCoordination } = routeStateObject.state;
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(23.500);
  const [centerLng, setCenterLng] = useState(80.500);
  useEffect(() => {
    let coordinates = centerCoordination ? centerCoordination.replaceAll('"', '').split(',') : [];
    setCenterLat(parseFloat(coordinates[0]) || 23.500);
    setCenterLng(parseFloat(coordinates[1]) || 80.500);
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
              zoom={10}
              center={{ lat: locationCoordinationList[0].position.lat , lng: locationCoordinationList[0].position.lng  }}
            />
          )
          : ''}
      </Grid>
    </Container>
  );
}

export default Facility;
