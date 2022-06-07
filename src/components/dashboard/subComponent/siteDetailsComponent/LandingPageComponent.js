import React, { useState, useEffect } from 'react';
import Widget from '../../../widget/Widget';
import LayoutMachine from '../landingPageComponents/LayoutMachine';
import SensorGraphComponent from '../landingPageComponents/SensorGraphComponent';
import { DashboardSensorListDetails } from '../../../../services/LoginPageService';

function LandingPageComponent({ locationDetails }) {
  const [open, setOpen] = useState(false);
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [digitalSensorList, setDigitalSensorList] = useState([]);
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [sensorTagId, setSensorTagId] = useState('');
  const [segretionInterval, setSegretionInterval] = useState('60');
  const [rangeInterval, setRangeInterval] = useState('160*60');

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
    <div>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="labs" />
        <Widget type="devices" />
        <Widget type="calibration" />
      </div>
      <LayoutMachine
        setOpen={setOpen}
        analogSensorList={analogSensorList}
        digitalSensorList={digitalSensorList}
        modbusSensorList={modbusSensorList}
        setSensorTagId={setSensorTagId}
      />
      <SensorGraphComponent
        open={open}
        setOpen={setOpen}
        sensorTagId={sensorTagId}
        segretionInterval={segretionInterval}
        setSegretionInterval={setSegretionInterval}
        rangeInterval={rangeInterval}
        setRangeInterval={setRangeInterval}
      />
    </div>
  );
}

export default LandingPageComponent;
