import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import { BuildingListResults } from './siteDetails/building/buildingList';
import MapsMultiplePoints from './maps/mapsMultiplePoints';

function Building() {
  const routeStateObject = useLocation();
  const { centerCoordination } = routeStateObject.state;
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(23.500);
  const [centerLng, setCenterLng] = useState(80.500);
  useEffect(() => {
    const coordinates = centerCoordination ? centerCoordination.replaceAll('"', '').split(',') : [];
    setCenterLat(parseFloat(coordinates[0]) || 23.500);
    setCenterLng(parseFloat(coordinates[1]) || 80.500);
  }, [locationCoordinationList]);
  return (
    <Container maxWidth={false} style={{ marginTop: 0, height: '77%', width: '100%' }}>
      <Grid container style={{ overflow: 'auto', height: '100%', width: '100%' }}>
        <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
          <BuildingListResults
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
                zoom={17}
                center={{
                  lat: locationCoordinationList[0].position.lat
                  || centerLat,
                  lng: locationCoordinationList[0].position.lng
                  || centerLng,
                }}
              />
            )
            : ''}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Building;
