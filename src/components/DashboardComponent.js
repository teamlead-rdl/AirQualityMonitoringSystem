import React, { useEffect, useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid,Box} from '@mui/material';

import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertWidget from './dashboard/components/AlertWidget';
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
  const [Img, setImg] = useState('');  
  const imgSrc = `http://varmatrix.com/Aqms/blog/public/${Img}`;
  const [ImageState, setImageState] = useState(0);

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Grid container item xs={12}>
          <Grid item xs={12} sx={{
            marginTop: 1,
            backgroundColor: 'skyblue'
          }}>
            <LocationGridWidget setLocationCoordinationList={setLocationCoordinationList}  setImg={setImg} setImageState={setImageState} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} />
          </Grid>
          <Grid item xs={12} sx={{
            backgroundColor: 'pink'
          }}>
            <AlertWidget/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} sx={{
        backgroundColor: 'pink',
        marginTop: 2
      }}>
        {ImageState === 0 ?
          <GeoLocationWidget locationCoordination={locationCoordinationList}/>
          :
          <img
            src={imgSrc}
            style={{ width: `${99}%`, height: `${56}vh` }}
          />        
        }       
      </Grid>
    </Grid>
  );
}

export default Dashboard;
