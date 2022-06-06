import React, { useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';

import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertWidget from './dashboard/components/AlertWidget';
import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
import ImageMarkerList from './Device/subComponent/imageMarkerList';

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

  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [locationState, setProgressState] = useState(0);
  const [Img, setImg] = useState('');
  const imgSrc = `http://varmatrix.com/Aqms/blog/public/${Img}`;
  const [ImageState, setImageState] = useState(0);
  const [deviceCoordsList, setDeviceCoordsList] = useState([]);

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
              setLocationCoordinationList={setLocationCoordinationList}
              locationState={locationState}
              setProgressState={setProgressState}
              setImg={setImg}
              setImageState={setImageState}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setDeviceCoordsList={setDeviceCoordsList}
            />
          </Grid>
          <Grid item xs={4}>
            {
              /* eslint-disable-next-line */
              deviceCoordsList.length !== 0 ? (<ImageMarkerList labImage={imgSrc} deviceCoordsList={deviceCoordsList} />)
                : (ImageState === 1 ? (
                  <img
                    src={imgSrc}                    
                    style={{ width: `${99}%`, height: `${56}vh` }}
                    alt="Map"
                  />
                ) : <GeoLocationWidget locationCoordination={locationCoordinationList} />
                )
            }
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
