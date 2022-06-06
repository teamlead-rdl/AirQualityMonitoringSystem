import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import MapsMultiplePoints from '../../maps/mapsMultiplePoints';

function GeoLocationWidget({
  locationCoordination, zoomLevel, centerLatitude, centerLongitude,
}) {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState('');
  const [centerLng, setCenterLng] = useState('');

  useEffect(() => {
    setLocationCoordinationList(locationCoordination);
    setCenterLat(centerLatitude || 23.500);
    setCenterLng(centerLongitude || 80.500);
  }, [locationCoordination]);
  return (
    <div>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {locationCoordinationList.length !== 0
          ? (
            <MapsMultiplePoints
              width="100%"
              height="50vh"
              markers={locationCoordinationList}
              zoom={zoomLevel}
              center={{ lat: centerLat, lng: centerLng }}
            />
          )
          : ''}
      </Grid>
    </div>
  );
}

export default GeoLocationWidget;
