import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Widget from '../../../widget/Widget';
import LayoutMachine from '../landingPageComponents/LayoutMachine';
import SensorGraphComponent from '../landingPageComponents/SensorGraphComponent';
import { DashboardSensorListDetails } from '../../../../services/LoginPageService';
import AlertModalComponent from '../landingPageComponents/AlertModalComponent';

function LandingPageComponent({ locationDetails, setIsDashBoard }) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [digitalSensorList, setDigitalSensorList] = useState([]);
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [sensorTagId, setSensorTagId] = useState('');
  const [sensorTag, setSensorTag] = useState('');
  const [segretionInterval, setSegretionInterval] = useState('15');
  const [rangeInterval, setRangeInterval] = useState('200*60');
  const [totalSensors, setTotalSensors] = useState(0);
  const [totalAlerts, setTotalALerts] = useState(0);

  useEffect(() => {
    DashboardSensorListDetails({ device_id: locationDetails.device_id }, fetchSenosorListSuccess, fetchSenosorListException);
  }, [locationDetails]);

  const fetchSenosorListSuccess = (dataObject) => {
    setTotalSensors(dataObject.sensorCount || '');
    setTotalALerts(dataObject.alertCount || '');
    setAnalogSensorList(dataObject.Analog.data || []);
    setDigitalSensorList(dataObject.Digital.data || []);
    setModbusSensorList(dataObject.Modbus.data || []);
  };

  const fetchSenosorListException = () => {
  };

  return (
    <div style={{ textAlignLast: 'left' }}>
      <Button
        variant="outlined"
        style={{ marginLeft: '10px', marginTop: '5px' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          setIsDashBoard(2);
        }}
      >
        Back to Data Logger
      </Button>
      <div className="widgets" style={{ textAlignLast: 'auto', paddingLeft: '10px', paddingTop: '5px' }}>
        <Widget type="user" />
        <Widget type="labs" />
        <Widget type="devices" totalSensors={totalSensors} />
        <Widget type="alerts" setAlertOpen={setAlertOpen} totalAlerts={totalAlerts} />
        <Widget type="time" />
      </div>
      <LayoutMachine
        setOpen={setOpen}
        analogSensorList={analogSensorList}
        digitalSensorList={digitalSensorList}
        modbusSensorList={modbusSensorList}
        setSensorTagId={setSensorTagId}
        setSensorTag={setSensorTag}
      />
      <SensorGraphComponent
        open={open}
        setOpen={setOpen}
        sensorTagId={sensorTagId}
        segretionInterval={segretionInterval}
        setSegretionInterval={setSegretionInterval}
        rangeInterval={rangeInterval}
        setRangeInterval={setRangeInterval}
        sensorTag={sensorTag}
      />
      <AlertModalComponent alertOpen={alertOpen} setAlertOpen={setAlertOpen} locationDetails={locationDetails} />
    </div>
  );
}

export default LandingPageComponent;
