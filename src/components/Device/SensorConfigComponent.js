import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogContent,
  InputLabel,
  Select,
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Box } from '@mui/system';

import {
  CategoryFetchService,
  DeviceFetchService,
  SensorAddService,
  SensorCategoryFetchService,
  SensorEditService,
} from '../../services/LoginPageService';
import Analog from './sensorType/AnalogComponent';
import Modbus from './sensorType/ModbusComponent';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validatation/formValidation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SensorConfig = ({ locationDetails, setOpen, editData , isAddButton,  setRefreshData}) => {
  const [location_id, setLocation_Id] = useState(16);
  const [branch_id, setBranch_id] = useState(16);
  const [facility_id, setFacility_id] = useState(2);
  const [building_id, setBuildingId] = useState(1);
  const [category_id, setCategory_id] = useState('');
  const [deviceCategory, setDeviceCategory] = useState('');
  const [device_id, setDevice_id] = useState('');
  //------//
  const [id, setId] = useState(editData.id || '');
  const [sensorCategoryId, setSensorCategoryId] = useState(editData.sensorCategoryId || '');
  const [sensorName, setSensorName] = useState(editData.sensorName || '');
  const [manufacturer, setManufacturer] = useState(editData.manufacturer|| '');
  const [partId, setPartId] = useState(editData.partId || '');
  const [sensorOutput, setSensorOutput] = useState(editData.sensorOutput || 'Digital');
  //-----analog----//
  const [sensorType, setSensorType] = useState(editData.sensorType || '');
  const [units, setUnits] = useState(editData.units || '');
  const [minRatedReading, setMinRatedReading] = useState(editData.minRatedReading ||'');
  const [minRatedReadingChecked, setMinRatedReadingChecked] = useState(editData.minRatedReadingChecked || 0);
  const [minRatedReadingScale, setMinRatedReadingScale] = useState(editData.minRatedReadingScale ||'');
  const [maxRatedReading, setMaxRatedReading] = useState(editData.maxRatedReading || '');
  const [maxRatedReadingChecked, setMaxRatedReadingChecked] = useState(editData.maxRatedReadingChecked || 0);
  const [maxRatedReadingScale, setMaxRatedReadingScale] = useState(editData.maxRatedReadingScale || '');
  // -Modbus--------//
  const [slaveId, setSlaveId] = useState(editData.slaveId || '');
  const [registerId, setRegisterId] = useState(editData.registerId || '');
  const [length, setLength] = useState(editData.length || '');
  const [registerType, setRegisterType] = useState(editData.registerType || '');
  const [conversionType, setConversionType] = useState(editData.conversionType || '');
  const [ipAddress, setIpAddress] = useState(editData.ipAddress ||'');
  const [subnetMask, setSubnetMask] = useState(editData.subnetMask || '');

  const [categoryList, setCategoryList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [sensorCategoryList, setSensorCategoryList] = useState([]);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const [errorObject, setErrorObject] = useState({});

  const validateForNullValue = (value, type) => {
    //validating
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (data) => {
    console.log(JSON.stringify(data));
  };

  const handleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
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

  const loadData = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
    SensorCategoryFetchService(sensorCategoryHandleSuccess, handleException);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    {isAddButton ?
      SensorAddService({...locationDetails, 
        sensorCategoryId,
        sensorName,
        manufacturer,
        partId,
        sensorOutput,
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
        subnetMask}, sensorAddSuccess, senserAddException )
      :
      SensorEditService({...locationDetails,
        id, 
        sensorCategoryId,
        sensorName,
        manufacturer,
        partId,
        sensorOutput,
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
        subnetMask}, sensorAddSuccess, senserAddException );
    }
    // SensorAddService({...locationDetails, category_id, sensor_id, device_id, sensorName, sensorOutput, registerAddress, registerLength, maxThreshold, minThreshold, maxUnits, maxScale, maxReadingRage, minUnits, minScale, minReadingRage, sensorType, alerts, alertTag}, sensorAddSuccess, senserAddException );
  };

  const sensorAddSuccess = (dataObject) => {
    // console.log(JSON.stringify(dataObject));
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });
    setRefreshData((oldvalue)=>{
      return !oldvalue;
    });
    setTimeout(() => {
      handleClose();
      setOpen(false);
    }, 5000);
  };

  const senserAddException = (errorObject, errorMessage) => {
    // console.log(JSON.stringify(errorObject));
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: ''
    });
  };
  return (
    <div className="w-full" style={{ marginTop: 0 }}>
      <form className="mt-0 p-0 w-full" onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 0, p: 5 }}>
          <Typography sx={{ m: 0 }} variant="h5">
            {isAddButton? 'Add Sensor' : 'Edit Sensor'}
          </Typography>
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
                    label="Sensor Category"
                    required
                    onChange={(e) => {
                      setSensorCategoryId(e.target.value);
                    }}
                    // error={errorObject?.deviceName?.errorStatus}
                    // helperText={errorObject?.deviceName?.helperText}
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
                  value={sensorName}
                  onBlur={() => validateForNullValue(sensorName, 'sensorName')}
                  onChange={(e) => {
                    setSensorName(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Name of the sensor"
                  fullWidth
                  error={errorObject?.sensorName?.errorStatus}
                  helperText={errorObject?.sensorName?.helperText}
                  autoComplete="off"
                />
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <TextField
                  sx={{ marginTop: 0 }}
                  value={manufacturer}
                  onBlur={() => validateForNullValue(manufacturer, 'manufacturer')}
                  onChange={(e) => {
                    setManufacturer(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Manufacturer"
                  fullWidth
                  error={errorObject?.manufacturer?.errorStatus}
                  helperText={errorObject?.manufacturer?.helperText}
                  autoComplete="off"
                />
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <TextField
                  sx={{ marginTop: 0 }}
                  value={partId}
                  onBlur={() => validateForNullValue(partId, 'partId')}
                  onChange={(e) => {
                    setPartId(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Part Id"
                  fullWidth
                  error={errorObject?.partId?.errorStatus}
                  helperText={errorObject?.partId?.helperText}
                  autoComplete="off"
                />
              </div>
            </Grid>

            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
            >
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">
                    Sensor Output
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorOutput}
                    label="Sensor Output"
                    onChange={(e) => {
                      setSensorOutput(e.target.value);
                    }}
                    // error={errorObject?.deviceName?.errorStatus}
                    // helperText={errorObject?.deviceName?.helperText}
                  >
                    <MenuItem value={'Digital'}>{'Digital'}</MenuItem>
                    <MenuItem value={'Analog'}>{'Analog'}</MenuItem>
                    <MenuItem value={'Modbus'}>{'Modbus'}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          {sensorOutput == 'Analog' ? (
            <Analog 
              errorObject= {errorObject}
              setErrorObject={setErrorObject}
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
          ) : sensorOutput == 'Modbus' ? (
            <Modbus
              errorObject= {errorObject}
              setErrorObject={setErrorObject}
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
          ) : (
            ''
          )}
          <div className="float-right">
            <Button
              sx={{ m: 2 }}
              onClick={(e) => {
                setErrorObject({});
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ m: 2 }}
              size="large"
              variant="contained"
              type="submit"
              disabled={
                errorObject?.sensorName?.errorStatus || 
                errorObject?.manufacturer?.errorStatus ||
                errorObject?.partId?.errorStatus || 
                errorObject?.units?.errorStatus ||
                errorObject?.minRatedReading?.errorStatus || 
                errorObject?.minRatedReadingScale?.errorStatus ||
                errorObject?.maxRatedReading?.errorStatus || 
                errorObject?.maxRatedReadingScale?.errorStatus ||
                errorObject?.ipAddress?.errorStatus || 
                errorObject?.subnetMask?.errorStatus ||
                errorObject?.slaveId?.errorStatus || 
                errorObject?.registerId?.errorStatus
              }
            >
              {isAddButton? 'ADD' : 'UPDATE'}
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
};

export default SensorConfig;