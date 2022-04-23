import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogContent,
  InputLabel, Select,
  FormControl,
  TextField,
  MenuItem,
  Grid,
  Autocomplete,
  Box,
} from '@mui/material';
import {
  CategoryFetchService, DeviceFetchService, SensorCategoryFetchService, SensorDeployAddService, SensorDeployEditService, SensorFetchService,
} from '../../services/LoginPageService';
import Analog from './sensorType/AnalogComponent';
import Modbus from './sensorType/ModbusComponent';
import Digital from './sensorType/DigitalComponent';
import AnalogAlert from './sensorType/AnalogAlert';
import ModbusAlert from './sensorType/ModbusAlert';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validation/formValidation';
import StelTWA from './sensorType/StelTWAComponent';

function DeviceAdd({
  locationDetails, setProgressStatus, editData, isUpdate,
}) {
  const id = editData?.id || '';
  const [deviceId, setDeviceId] = useState(editData?.deviceId || '');
  const [categoryId, setCategoryId] = useState(editData?.categoryId || '');
  const [sensorTag, setSensorTag] = useState(editData?.sensorTag || '');
  const [categoryList, setCategoryList] = useState([]);
  const [sensorList, setSensorList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [sensorCategoryList, setSensorCategoryList] = useState([]);
  const [alerts, setAlert] = useState('');
  const [sensorCategoryId, setSensorCategoryId] = useState(editData?.sensorCategoryId || '');
  const [sensorName, setSensorName] = useState(editData?.sensorName || '');
  const [sensorOutput, setSensorOutput] = useState(editData?.sensorOutput || 'Digital');
  // -- Digital --/
  const [digitalAlertType, setDigitalAlertType] = useState(editData?.digitalAlertType || '');
  const [digitalLowAlert, setDigitalLowAlert] = useState(editData?.digitalLowAlert || '');
  const [digitalHighAlert, setDigitalHighAlert] = useState(editData?.digitalHighAlert || '');
  // -----analog----//
  const [sensorType, setSensorType] = useState(editData?.sensorType || '');
  const [units, setUnits] = useState(editData?.units || '');
  const [minRatedReading, setMinRatedReading] = useState(editData?.minRatedReading || '');
  const [minRatedReadingChecked, setMinRatedReadingChecked] = useState(editData?.minRatedReadingChecked || '0');
  const [minRatedReadingScale, setMinRatedReadingScale] = useState(editData?.minRatedReadingScale || '');
  const [maxRatedReading, setMaxRatedReading] = useState(editData?.maxRatedReading || '');
  const [maxRatedReadingChecked, setMaxRatedReadingChecked] = useState(editData?.maxRatedReadingChecked || '0');
  const [maxRatedReadingScale, setMaxRatedReadingScale] = useState(editData?.maxRatedReadingScale || '');
  // -Modbus--------//
  const [slaveId, setSlaveId] = useState(editData?.slaveId || '');
  const [registerId, setRegisterId] = useState(editData?.registerId || '');
  const [length, setLength] = useState(editData?.length || '');
  const [registerType, setRegisterType] = useState(editData?.registerType || '');
  const [conversionType, setConversionType] = useState(editData?.conversionType || '');
  const [ipAddress, setIpAddress] = useState(editData?.ipAddress || '');
  const [subnetMask, setSubnetMask] = useState(editData?.subnetMask || '');
  // ---- polling type--------//
  const [pollingIntervalType, setPollingIntervalType] = useState(editData?.pollingIntervalType || '');
  // --- Critical Alert --- //
  const [criticalMinValue, setCriticalMinValue] = useState(editData?.criticalMinValue || '');
  const [criticalMaxValue, setCriticalMaxValue] = useState(editData?.criticalMaxValue || '');
  const [criticalAlertType, setCriticalAlertType] = useState(editData?.criticalAlertType || '');
  const [criticalLowAlert, setCriticalLowAlert] = useState(editData?.criticalLowAlert || '');
  const [criticalHighAlert, setCriticalHighAlert] = useState(editData?.criticalHighAlert || '');
  // --- Warning Alert --- //
  const [warningMinValue, setWarningMinValue] = useState(editData?.warningMinValue || '');
  const [warningMaxValue, setWarningMaxValue] = useState(editData?.warningMaxValue || '');
  const [warningAlertType, setWarningAlertType] = useState(editData?.warningAlertType || '');
  const [warningLowAlert, setWarningLowAlert] = useState(editData?.warningLowAlert || '');
  const [warningHighAlert, setWarningHighAlert] = useState(editData?.warningHighAlert || '');
  // --- Out-of-Range Alert --- //
  const [outofrangeMinValue, setOutofrangeMinValue] = useState(editData?.outofrangeMinValue || '');
  const [outofrangeMaxValue, setOutofrangeMaxValue] = useState(editData?.outofrangeMaxValue || '');
  const [outofrangeAlertType, setOutofrangeAlertType] = useState(editData?.outofrangeAlertType || '');
  const [outofrangeLowAlert, setOutofrangeLowAlert] = useState(editData?.outofrangeLowAlert || '');
  const [outofrangeHighAlert, setOutofrangeHighAlert] = useState(editData?.outofrangeHighAlert || '');

  // ---- STEL & TWA ----------//
  const [alarm, setAlarm] = useState(editData?.alarm || '');

  const [isAQI, setIsAQI] = useState(editData?.isAQI || false);
  const [isStel, setIsStel] = useState(editData?.isStel || false);
  const [stelDuration, setStelDuration] = useState(editData?.stelDuration || '');
  const [stelType, setStelType] = useState(editData?.stelType || 'ppm');
  const [stelLimit, setStelLimit] = useState(editData?.stelLimit || 0);
  const [stelAlert, setStelAlert] = useState(editData?.stelAlert || '');
  const [twaDuration, setTwaDuration] = useState(editData?.twaDuration || '');
  const [twaType, setTwaType] = useState(editData?.twaType || 'ppm');
  const [twaLimit, setTwaLimit] = useState(editData?.twaLimit || 0);
  const [twaAlert, setTwaAlert] = useState(editData?.twaAlert || '');

  const [parmGoodMinScale, setParmGoodMinScale] = useState(editData?.parmGoodMinScale || '');
  const [parmGoodMaxScale, setParmGoodMaxScale] = useState(editData?.parmGoodMaxScale || '');
  const [parmSatisfactoryMinScale, setParmSatisfactoryMinScale] = useState(editData?.parmSatisfactoryMinScale || '');
  const [parmSatisfactoryMaxScale, setParmSatisfactoryMaxScale] = useState(editData?.parmSatisfactoryMaxScale || '');
  const [parmModerateMinScale, setParmModerateMinScale] = useState(editData?.parmModerateMinScale || '');
  const [parmModerateMaxScale, setParmModerateMaxScale] = useState(editData?.parmModerateMaxScale || '');
  const [parmPoorMinScale, setParmPoorMinScale] = useState(editData?.parmPoorMinScale || '');
  const [parmPoorMaxScale, setParmPoorMaxScale] = useState(editData?.parmPoorMaxScale || '');
  const [parmVeryPoorMinScale, setParmVeryPoorMinScale] = useState(editData?.parmVeryPoorMinScale || '');
  const [parmVeryPoorMaxScale, setParmVeryPoorMaxScale] = useState(editData?.parmVeryPoorMaxScale || '');
  const [parmSevereMinScale, setParmSevereMinScale] = useState(editData?.parmSevereMinScale || '');
  const [parmSevereMaxScale, setParmSevereMaxScale] = useState(editData?.parmSevereMaxScale || '');
  // -- Throttling ---//
  const [open, setOpen] = useState(false);
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleException = () => {
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };

  const deviceHandleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
  };

  const sensorCategoryHandleSuccess = (dataObject) => {
    setSensorCategoryList(dataObject.data);
  };

  const sensorHandleSuccess = (dataObject) => {
    setSensorList(dataObject.data);
  };

  const loadData = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
    SensorCategoryFetchService(sensorCategoryHandleSuccess, handleException);
    /* eslint-disable-next-line */
    editData?.deviceId && DeviceFetchService({ ...locationDetails, sensorCategoryId }, deviceHandleSuccess, handleException);
    SensorFetchService(sensorCategoryId, sensorHandleSuccess, handleException);
  };
  /* eslint-disable-next-line */
  const deviceChanged = (sensorCategoryId) => {
    setCategoryId(sensorCategoryId);
    DeviceFetchService({ ...locationDetails, sensorCategoryId }, deviceHandleSuccess, handleException);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* eslint-disable-next-line */
    isUpdate
      ? SensorDeployEditService({
        ...locationDetails,
        id,
        categoryId,
        deviceId,
        sensorCategoryId,
        sensorName,
        sensorTag,
        sensorOutput,
        digitalAlertType,
        digitalLowAlert,
        digitalHighAlert,
        sensorType,
        units,
        minRatedReading,
        minRatedReadingChecked,
        minRatedReadingScale,
        maxRatedReading,
        maxRatedReadingChecked,
        maxRatedReadingScale,
        slaveId,
        registerId,
        length,
        registerType,
        conversionType,
        ipAddress,
        subnetMask,
        pollingIntervalType,
        criticalMinValue,
        criticalMaxValue,
        criticalAlertType,
        criticalLowAlert,
        criticalHighAlert,
        warningMinValue,
        warningMaxValue,
        warningAlertType,
        warningLowAlert,
        warningHighAlert,
        outofrangeMinValue,
        outofrangeMaxValue,
        outofrangeAlertType,
        outofrangeLowAlert,
        outofrangeHighAlert,
        alarm,
        isAQI,
        isStel,
        stelDuration,
        stelType,
        stelLimit,
        stelAlert,
        twaDuration,
        twaType,
        twaLimit,
        twaAlert,
        parmGoodMinScale,
        parmGoodMaxScale,
        parmSatisfactoryMinScale,
        parmSatisfactoryMaxScale,
        parmModerateMinScale,
        parmModerateMaxScale,
        parmPoorMinScale,
        parmPoorMaxScale,
        parmVeryPoorMinScale,
        parmVeryPoorMaxScale,
        parmSevereMinScale,
        parmSevereMaxScale,
      }, sensorAddSuccess, senserAddException)
      : SensorDeployAddService({
        ...locationDetails,
        categoryId,
        deviceId,
        sensorCategoryId,
        sensorName,
        sensorTag,
        sensorOutput,
        digitalAlertType,
        digitalLowAlert,
        digitalHighAlert,
        sensorType,
        units,
        minRatedReading,
        minRatedReadingChecked,
        minRatedReadingScale,
        maxRatedReading,
        maxRatedReadingChecked,
        maxRatedReadingScale,
        slaveId,
        registerId,
        length,
        registerType,
        conversionType,
        ipAddress,
        subnetMask,
        pollingIntervalType,
        criticalMinValue,
        criticalMaxValue,
        criticalAlertType,
        criticalLowAlert,
        criticalHighAlert,
        warningMinValue,
        warningMaxValue,
        warningAlertType,
        warningLowAlert,
        warningHighAlert,
        outofrangeMinValue,
        outofrangeMaxValue,
        outofrangeAlertType,
        outofrangeLowAlert,
        outofrangeHighAlert,
        alarm,
        isAQI,
        isStel,
        stelDuration,
        stelType,
        stelLimit,
        stelAlert,
        twaDuration,
        twaType,
        twaLimit,
        twaAlert,
        parmGoodMinScale,
        parmGoodMaxScale,
        parmSatisfactoryMinScale,
        parmSatisfactoryMaxScale,
        parmModerateMinScale,
        parmModerateMaxScale,
        parmPoorMinScale,
        parmPoorMaxScale,
        parmVeryPoorMinScale,
        parmVeryPoorMaxScale,
        parmSevereMinScale,
        parmSevereMaxScale,
      }, sensorAddSuccess, senserAddException);
  };

  const sensorAddSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setTimeout(() => {
      resetForm();
      handleClose();
      setProgressStatus(1);
    }, 3000);
  };

  const senserAddException = (resErrorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const resetForm = () => {
    setSensorCategoryId('');
    setSensorName('');
    setSensorTag('');
    setDigitalAlertType('');
    setDigitalLowAlert('');
    setDigitalHighAlert('');
    setSensorType('');
    setUnits('');
    setMinRatedReading('');
    setMinRatedReadingScale('');
    setMaxRatedReading('');
    setMaxRatedReadingScale('');
    setMinRatedReadingChecked(false);
    setMaxRatedReadingChecked(false);
    setSlaveId('');
    setRegisterId('');
    setLength('');
    setRegisterType('');
    setConversionType('');
    setIpAddress('');
    setSubnetMask('');
    setPollingIntervalType('');
    setCriticalMinValue('');
    setCriticalMaxValue('');
    setCriticalAlertType('');
    setCriticalLowAlert('');
    setCriticalHighAlert('');
    setWarningMinValue('');
    setWarningMaxValue('');
    setWarningAlertType('');
    setWarningLowAlert('');
    setWarningHighAlert('');
    setOutofrangeMinValue('');
    setOutofrangeMaxValue('');
    setOutofrangeAlertType('');
    setOutofrangeLowAlert('');
    setOutofrangeHighAlert('');
  };
  return (
    <div className="w-full" style={{ marginTop: 0 }}>
      <form className="mt-0 p-0 w-full" onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 0, p: 0 }}>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Device Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    required
                    disabled={editData && true}
                    label="Device Category"
                    onChange={(e) => {
                      deviceChanged(e.target.value);
                    }}
                    error={errorObject?.deviceCategory?.errorStatus}
                    helperText={errorObject?.deviceCategory?.helperText}
                  >
                    {categoryList.map((data) => {
                      return (
                        <MenuItem value={data.id}>{data.categoryName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Device Name
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deviceId}
                    required
                    disabled={editData && true}
                    label="Device Name"
                    onChange={(e) => {
                      setDeviceId(e.target.value);
                    }}
                  >
                    {deviceList.map((data) => {
                      return (
                        <MenuItem value={data.id}>{data.deviceName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Sensor Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorCategoryId}
                    required
                    disabled={editData && true}
                    label="Sensor Category"
                    onChange={(e) => {
                      setSensorCategoryId(e.target.value);
                      setSensorList([]);
                    }}
                  >
                    {sensorCategoryList.map((data) => {
                      return (
                        <MenuItem value={data.id}>{data.sensorName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {editData
              ? (
                <Grid
                  sx={{ mt: 0, padding: 0 }}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className="rounded-md -space-y-px">
                    <TextField
                      value={editData?.sensorNameUnit}
                      disabled
                      fullWidth
                    />
                  </div>
                </Grid>
              )
              : (
                <Grid
                  sx={{ mt: 0, padding: 0 }}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <Box>
                    <Autocomplete
                      id="asynchronous-demo"
                      sx={{}}
                      open={open}
                      value={sensorList[0]?.sensorName}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return option.id === value.id;
                      }}
                      getOptionLabel={(option) => {
                        return option.sensorName;
                      }}
                      options={sensorList}
                      onChange={(e, data) => {
                        setSensorName(data.id);
                        setSensorOutput(data.sensorOutput);
                        setSensorType(data.sensorType);
                        // -- analog --//
                        setUnits(data.units);
                        setMinRatedReading(data.minRatedReading);
                        setMinRatedReadingChecked(data.minRatedReadingChecked);
                        setMinRatedReadingScale(data.minRatedReadingScale);
                        setMaxRatedReading(data.maxRatedReading);
                        setMaxRatedReadingChecked(data.maxRatedReadingChecked);
                        setMaxRatedReadingScale(data.maxRatedReadingScale);
                        // --modbus--/
                        setIpAddress(data.ipAddress);
                        setSubnetMask(data.subnetMask);
                        setSlaveId(data.slaveId);
                        setRegisterId(data.registerId);
                        setLength(data.length);
                        setRegisterType(data.registerType);
                        setConversionType(data.conversionType);
                        // -- STEL&TWA -- //
                        setAlarm(data.alarm);
                        setIsAQI(data.isAQI);
                        setIsStel(data.isStel);
                        setStelDuration(data.stelDuration);
                        setStelType(data.stelType);
                        setStelLimit(data.stelLimit);
                        setStelAlert(data.stelAlert);
                        setTwaDuration(data.twaDuration);
                        setTwaType(data.twaType);
                        setTwaLimit(data.twaLimit);
                        setTwaAlert(data.twaAlert);
                        setParmGoodMinScale(data.parmGoodMinScale);
                        setParmGoodMaxScale(data.parmGoodMaxScale);
                        setParmSatisfactoryMinScale(data.parmSatisfactoryMinScale);
                        setParmSatisfactoryMaxScale(data.parmSatisfactoryMaxScale);
                        setParmModerateMinScale(data.parmModerateMinScale);
                        setParmModerateMaxScale(data.parmModerateMaxScale);
                        setParmPoorMinScale(data.parmPoorMinScale);
                        setParmPoorMaxScale(data.parmPoorMaxScale);
                        setParmVeryPoorMinScale(data.parmVeryPoorMinScale);
                        setParmVeryPoorMaxScale(data.parmVeryPoorMaxScale);
                        setParmSevereMinScale(data.parmSevereMinScale);
                        setParmSevereMaxScale(data.parmSevereMaxScale);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sensor Name"
                          required
                          onKeyUp={() => {
                            setTimeout(() => {
                              SensorFetchService(sensorCategoryId, sensorHandleSuccess, handleException);
                            }, 500);
                          }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              )}
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <div className="rounded-md -space-y-px">
                <TextField
                  sx={{ marginTop: 0 }}
                  value={sensorTag}
                  onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                  onChange={(e) => {
                    setSensorTag(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Sensor Tag"
                  fullWidth
                  error={errorObject?.sensorTag?.errorStatus}
                  helperText={errorObject?.sensorTag?.helperText}
                  autoComplete="off"
                />
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: 0 }}
                  disabled
                >
                  <InputLabel id="demo-simple-select-label">
                    Sensor Output
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorOutput}
                    required
                    label="Sensor Output"
                    onChange={(e) => {
                      setSensorOutput(e.target.value);
                    }}
                  >
                    <MenuItem value="Digital">Digital</MenuItem>
                    <MenuItem value="Analog">Analog</MenuItem>
                    <MenuItem value="Modbus">Modbus</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            <Grid
              sx={{ mt: 0, padding: 0, alignSelf: 'center' }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                <InputLabel id="demo-simple-select-label3">Alarm Type</InputLabel>
                <Select
                  sx={{ marginTop: 0 }}
                  labelId="demo-simple-select-label3"
                  id="demo-simple-select3"
                  value={alarm}
                  label="Alarm Type"
                  required
                  onChange={(e) => {
                    setAlarm(e.target.value);
                  }}
                >
                  <MenuItem value="Latch">Latch</MenuItem>
                  <MenuItem value="UnLatch">UnLatch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <StelTWA
            disable
            isStel={isStel}
            setIsStel={setIsStel}
            isAQI={isAQI}
            setIsAQI={setIsAQI}
            stelDuration={stelDuration}
            setStelDuration={setStelDuration}
            stelType={stelType}
            setStelType={setStelType}
            stelLimit={stelLimit}
            setStelLimit={setStelLimit}
            stelAlert={stelAlert}
            setStelAlert={setStelAlert}
            twaDuration={twaDuration}
            setTwaDuration={setTwaDuration}
            twaType={twaType}
            setTwaType={setTwaType}
            twaLimit={twaLimit}
            setTwaLimit={setTwaLimit}
            twaAlert={twaAlert}
            setTwaAlert={setTwaAlert}
            parmGoodMinScale={parmGoodMinScale}
            setParmGoodMinScale={setParmGoodMinScale}
            parmGoodMaxScale={parmGoodMaxScale}
            setParmGoodMaxScale={setParmGoodMaxScale}
            parmSatisfactoryMinScale={parmSatisfactoryMinScale}
            setParmSatisfactoryMinScale={setParmSatisfactoryMinScale}
            parmSatisfactoryMaxScale={parmSatisfactoryMaxScale}
            setParmSatisfactoryMaxScale={setParmSatisfactoryMaxScale}
            parmModerateMinScale={parmModerateMinScale}
            setParmModerateMinScale={setParmModerateMinScale}
            parmModerateMaxScale={parmModerateMaxScale}
            setParmModerateMaxScale={setParmModerateMaxScale}
            parmPoorMinScale={parmPoorMinScale}
            setParmPoorMinScale={setParmPoorMinScale}
            parmPoorMaxScale={parmPoorMaxScale}
            setParmPoorMaxScale={setParmPoorMaxScale}
            parmVeryPoorMinScale={parmVeryPoorMinScale}
            setParmVeryPoorMinScale={setParmVeryPoorMinScale}
            parmVeryPoorMaxScale={parmVeryPoorMaxScale}
            setParmVeryPoorMaxScale={setParmVeryPoorMaxScale}
            parmSevereMinScale={parmSevereMinScale}
            setParmSevereMinScale={setParmSevereMinScale}
            parmSevereMaxScale={parmSevereMaxScale}
            setParmSevereMaxScale={setParmSevereMaxScale}
          />
          {/* eslint-disable-next-line */}
          {sensorOutput === 'Analog'
            ? (
              <>
                <Analog
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  disable
                  units={units}
                  setUnits={setUnits}
                  sensorType={sensorType}
                  setSensorType={setSensorType}
                  minRatedReading={minRatedReading}
                  setMinRatedReading={setMinRatedReading}
                  minRatedReadingChecked={minRatedReadingChecked}
                  setMinRatedReadingChecked={setMinRatedReadingChecked}
                  minRatedReadingScale={minRatedReadingScale}
                  setMinRatedReadingScale={setMinRatedReadingScale}
                  maxRatedReading={maxRatedReading}
                  setMaxRatedReading={setMaxRatedReading}
                  maxRatedReadingChecked={maxRatedReadingChecked}
                  setMaxRatedReadingChecked={setMaxRatedReadingChecked}
                  maxRatedReadingScale={maxRatedReadingScale}
                  setMaxRatedReadingScale={setMaxRatedReadingScale}
                />
                <AnalogAlert
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  pollingIntervalType={pollingIntervalType}
                  setPollingIntervalType={setPollingIntervalType}
                  criticalMinValue={criticalMinValue}
                  setCriticalMinValue={setCriticalMinValue}
                  criticalMaxValue={criticalMaxValue}
                  setCriticalMaxValue={setCriticalMaxValue}
                  criticalAlertType={criticalAlertType}
                  setCriticalAlertType={setCriticalAlertType}
                  criticalLowAlert={criticalLowAlert}
                  setCriticalLowAlert={setCriticalLowAlert}
                  criticalHighAlert={criticalHighAlert}
                  setCriticalHighAlert={setCriticalHighAlert}
                  warningMinValue={warningMinValue}
                  setWarningMinValue={setWarningMinValue}
                  warningMaxValue={warningMaxValue}
                  setWarningMaxValue={setWarningMaxValue}
                  warningAlertType={warningAlertType}
                  setWarningAlertType={setWarningAlertType}
                  warningLowAlert={warningLowAlert}
                  setWarningLowAlert={setWarningLowAlert}
                  warningHighAlert={warningHighAlert}
                  setWarningHighAlert={setWarningHighAlert}
                  outofrangeMinValue={outofrangeMinValue}
                  setOutofrangeMinValue={setOutofrangeMinValue}
                  outofrangeMaxValue={outofrangeMaxValue}
                  setOutofrangeMaxValue={setOutofrangeMaxValue}
                  outofrangeAlertType={outofrangeAlertType}
                  setOutofrangeAlertType={setOutofrangeAlertType}
                  outofrangeLowAlert={outofrangeLowAlert}
                  setOutofrangeLowAlert={setOutofrangeLowAlert}
                  outofrangeHighAlert={outofrangeHighAlert}
                  setOutofrangeHighAlert={setOutofrangeHighAlert}
                  alerts={alerts}
                  setAlert={setAlert}
                />
              </>
            )
            : sensorOutput === 'Modbus'
              ? (
                <>
                  <Modbus
                    errorObject={errorObject}
                    setErrorObject={setErrorObject}
                    disable
                    units={units}
                    setUnits={setUnits}
                    sensorType={sensorType}
                    setSensorType={setSensorType}
                    minRatedReading={minRatedReading}
                    setMinRatedReading={setMinRatedReading}
                    minRatedReadingChecked={minRatedReadingChecked}
                    setMinRatedReadingChecked={setMinRatedReadingChecked}
                    minRatedReadingScale={minRatedReadingScale}
                    setMinRatedReadingScale={setMinRatedReadingScale}
                    maxRatedReading={maxRatedReading}
                    setMaxRatedReading={setMaxRatedReading}
                    maxRatedReadingChecked={maxRatedReadingChecked}
                    setMaxRatedReadingChecked={setMaxRatedReadingChecked}
                    maxRatedReadingScale={maxRatedReadingScale}
                    setMaxRatedReadingScale={setMaxRatedReadingScale}
                    slaveId={slaveId}
                    setSlaveId={setSlaveId}
                    registerId={registerId}
                    setRegisterId={setRegisterId}
                    length={length}
                    setLength={setLength}
                    registerType={registerType}
                    setRegisterType={setRegisterType}
                    conversionType={conversionType}
                    setConversionType={setConversionType}
                    ipAddress={ipAddress}
                    setIpAddress={setIpAddress}
                    subnetMask={subnetMask}
                    setSubnetMask={setSubnetMask}
                  />
                  <ModbusAlert
                    pollingIntervalType={pollingIntervalType}
                    setPollingIntervalType={setPollingIntervalType}
                    criticalMinValue={criticalMinValue}
                    setCriticalMinValue={setCriticalMinValue}
                    criticalMaxValue={criticalMaxValue}
                    setCriticalMaxValue={setCriticalMaxValue}
                    criticalAlertType={criticalAlertType}
                    setCriticalAlertType={setCriticalAlertType}
                    criticalLowAlert={criticalLowAlert}
                    setCriticalLowAlert={setCriticalLowAlert}
                    criticalHighAlert={criticalHighAlert}
                    setCriticalHighAlert={setCriticalHighAlert}
                    warningMinValue={warningMinValue}
                    setWarningMinValue={setWarningMinValue}
                    warningMaxValue={warningMaxValue}
                    setWarningMaxValue={setWarningMaxValue}
                    warningAlertType={warningAlertType}
                    setWarningAlertType={setWarningAlertType}
                    warningLowAlert={warningLowAlert}
                    setWarningLowAlert={setWarningLowAlert}
                    warningHighAlert={warningHighAlert}
                    setWarningHighAlert={setWarningHighAlert}
                    outofrangeMinValue={outofrangeMinValue}
                    setOutofrangeMinValue={setOutofrangeMinValue}
                    outofrangeMaxValue={outofrangeMaxValue}
                    setOutofrangeMaxValue={setOutofrangeMaxValue}
                    outofrangeAlertType={outofrangeAlertType}
                    setOutofrangeAlertType={setOutofrangeAlertType}
                    outofrangeLowAlert={outofrangeLowAlert}
                    setOutofrangeLowAlert={setOutofrangeLowAlert}
                    outofrangeHighAlert={outofrangeHighAlert}
                    setOutofrangeHighAlert={setOutofrangeHighAlert}
                    alerts={alerts}
                    setAlert={setAlert}
                  />
                </>
              )
              : (
                <Digital
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  digitalAlertType={digitalAlertType}
                  setDigitalAlertType={setDigitalAlertType}
                  digitalLowAlert={digitalLowAlert}
                  setDigitalLowAlert={setDigitalLowAlert}
                  digitalHighAlert={digitalHighAlert}
                  setDigitalHighAlert={setDigitalHighAlert}
                />
              )}

          <div className="float-right">
            <Button
              sx={{ m: 2 }}
              onClick={() => {
                setErrorObject({});
                resetForm();
                /* eslint-disable-next-line */
                setProgressStatus && (setProgressStatus(1));
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ m: 2 }}
              size="large"
              variant="contained"
              type="submit"
            >
              {isUpdate ? 'UPDATE' : 'ADD' }
            </Button>
          </div>
        </DialogContent>
      </form>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
  );
}

export default DeviceAdd;
