import React, { useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';

import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertWidget from './dashboard/components/AlertWidget';
import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
import ImageMarkerList from './Device/subComponent/imageMarkerList';
import LandingPageComponent from './dashboard/subComponent/siteDetailsComponent/LandingPageComponent';

/* eslint-disable no-unused-vars */
function Dashboard() {
  const [locationDetails, setLocationDetails] = useState({
    location_id: '',
    branch_id: '',
    facility_id: '',
    building_id: '',
    floor_id: '',
    lab_id: '',
    device_id: '',
  });
  const [siteImages, setSiteImages] = useState({
    buildingImage: '',
    floorImage: '',
    labImage: '',
  });

  const [zoomLevel, setZoomLevel] = useState(4);
  const [centerLatitude, setCenterLatitude] = useState(23.500);
  const [centerLongitude, setCenterLongitude] = useState(80.500);

  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [locationState, setProgressState] = useState(0);
  const [Img, setImg] = useState('');
  const imgSrc = `http://varmatrix.com/Aqms/blog/public/${Img}`;
  const [ImageState, setImageState] = useState(0);
  const [deviceCoordsList, setDeviceCoordsList] = useState([]);
  const [isdashboard, setIsDashBoard] = useState(false);
  const [isGeoMap, setIsGeoMap] = useState(true);

  return (
    <Grid container spacing={1} style={{ height: '92.5%' }}>
      {isdashboard === true
        ? (
          <Grid
            item
            xs={12}
            sx={{
              marginLeft: 1,
            }}
          >
            <LandingPageComponent locationDetails={locationDetails} />
          </Grid>
        )
        : (
          <>
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
                    setIsDashBoard={setIsDashBoard}
                    setIsGeoMap={setIsGeoMap}
                    siteImages={siteImages}
                    setSiteImages={setSiteImages}
                    setZoomLevel={setZoomLevel}
                    setCenterLatitude={setCenterLatitude}
                    setCenterLongitude={setCenterLongitude}
                  />
                </Grid>
                <Grid item xs={4}>
                  {/* eslint-disable-next-line */}
                  {isGeoMap === true ? <GeoLocationWidget locationCoordination={locationCoordinationList} zoomLevel={zoomLevel} centerLatitude={centerLatitude} centerLongitude={centerLongitude} />
                    : <ImageMarkerList labImage={imgSrc} deviceCoordsList={deviceCoordsList} /> }
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
          </>
        )}
    </Grid>
  );
}

export default Dashboard;
