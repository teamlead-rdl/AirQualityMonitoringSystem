import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Widget from '../../../widget/Widget';
import LayoutMachine from '../landingPageComponents/LayoutMachine';
import SensorGraphComponent from '../landingPageComponents/SensorGraphComponent';
import { DashboardSensorListDetails } from '../../../../services/LoginPageService';
import { Button, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function LandingPageComponent({ locationDetails, setIsDashBoard }) {
  const [open, setOpen] = useState(false);
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [digitalSensorList, setDigitalSensorList] = useState([]);
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [sensorTagId, setSensorTagId] = useState('');
  const [sensorTag, setSensorTag] = useState('');
  const [segretionInterval, setSegretionInterval] = useState('60');
  const [rangeInterval, setRangeInterval] = useState('6*60');

  useEffect(() => {
    DashboardSensorListDetails({ device_id: locationDetails.device_id }, fetchSenosorListSuccess, fetchSenosorListException);
  }, [locationDetails]);

  const fetchSenosorListSuccess = (dataObject) => {
    setAnalogSensorList(dataObject.Analog.data || []);
    setDigitalSensorList(dataObject.Digital.data || []);
    setModbusSensorList(dataObject.Modbus.data || []);
  };

  const fetchSenosorListException = () => {
  };

  return (
    <div style={{ textAlignLast: 'left' }}>
      <Button variant="outlined" startIcon={<ArrowBack />} onClick={()=>{
        setIsDashBoard(false);
      }}>
        Back to Data Logger
      </Button>
      <div className="widgets" style={{textAlignLast :'auto', paddingLeft: '10px', paddingTop: '5px'}}>
        <Widget type="user" />
        <Widget type="labs" />
        <Widget type="devices" />
        <Widget type="alerts" />
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
    </div>
  );
}

export default LandingPageComponent;
