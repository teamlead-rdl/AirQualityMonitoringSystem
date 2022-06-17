import React, { useEffect, useState } from 'react';
import {
  Breadcrumbs, Typography, Grid,
} from '@mui/material';
import { DeviceFetchService } from '../../../../services/LoginPageService';
import DeviceWidget from '../deviceCard/DeviceWidget';
import NotificationWidget from '../deviceCard/NotificationWidget';

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function DeviceGridComponent({
  setImg, locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
  setDeviceCoordsList, setIsDashBoard, setIsGeoMap, siteImages, setCenterLatitude, setCenterLongitude,
}) {
  const [deviceList, setDeviceList] = useState([]);
  const [deviceTotal, setDeviceTotal] = useState('0');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const devicePolling = setInterval(()=>{
      DeviceFetchService({
        location_id: locationDetails.location_id,
        branch_id: locationDetails.branch_id,
        facility_id: locationDetails.facility_id,
        building_id: locationDetails.building_id,
        floor_id: locationDetails.floor_id,
        lab_id: locationDetails.lab_id,
      }, handleSuccess, handleException);
    }, 5000);

    return () =>{
      console.log('clearing interval');
      clearInterval(devicePolling);
    }
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
    const deviceCoordinationsList = dataObject.data.map((data, index) => {
      const coordination = data.floorCords;
      const arrayList = coordination?.split(',');
      return arrayList && { top: arrayList[0], left: arrayList[1] };
    });
    const filteredArray = deviceCoordinationsList.filter((x) => x != null);
    setDeviceCoordsList(filteredArray || []);
    setDeviceTotal(dataObject.totalData);
  };

  const handleException = () => { };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div style={{
      height: '98%', width: '100%', marginTop: 10, marginLeft: 10, paddingLeft: 5, paddingTop: 5,
    }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            setCenterLatitude(23.500);
            setCenterLongitude(80.000);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setProgressState(0);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setProgressState(1);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setProgressState(2);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.branchLabel}
        </h3>
        <h3
          onClick={() => {
            setDeviceCoordsList([]);
            setIsGeoMap(true);
            setProgressState(3);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.facilityLabel}
        </h3>
        <h3
          onClick={() => {
            setIsGeoMap(false);
            setDeviceCoordsList([]);
            setImg(siteImages.buildingImage);
            setProgressState(4);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.buildingLabel}
        </h3>
        <h3
          onClick={() => {
            setImg(siteImages.floorImage);
            setDeviceCoordsList([]);
            setIsGeoMap(false);
            setProgressState(5);
            setIsDashBoard(0);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.floorLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.lablabel}
        </Typography>
      </Breadcrumbs>
      <div className="widgets" style={{ height: '20vh', backgroundColor: '#fafafa', padding: 10 }}>
        <NotificationWidget type="user" />
        <NotificationWidget type="labs" />
        <NotificationWidget type="devices" deviceTotal={deviceTotal} />
        <NotificationWidget type="alerts" />
        <NotificationWidget type="time" />
      </div>
      <div
        className=""
        style={{
          marginTop: 5,
          maxHeight: '65vh',
          overflow: 'auto',
        }}
      >
        <Grid container sx={{ width: '100%' }}>

          {deviceList.map((data, index) => {
            return (
              <Grid
                item
                sm={6}
                xs={6}
                md={4}
                lg={3}
                xl={3}
                /* eslint-disable-next-line */
                key={index}
                sx={{ padding: 1 }}
              >
                <DeviceWidget
                  type="aqmi"
                  data={data}
                  setLocationDetails={setLocationDetails}
                  setIsDashBoard={setIsDashBoard}
                  setBreadCrumbLabels={setBreadCrumbLabels}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default DeviceGridComponent;
