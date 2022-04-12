import React, { useState , useEffect} from 'react';
import {
  Button,
  DialogContent,
  IconButton,
  InputAdornment,
  InputLabel,Select,
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Grid,
  Divider,
  Autocomplete,
  CircularProgress,
 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Box } from '@mui/system';

import {CategoryFetchService, DeviceFetchService,SensorAddService,SensorCategoryFetchService, SensorDeployAddService, SensorFetchService } from '../../services/LoginPageService';
import Analog from './sensorType/AnalogComponent';
import Modbus from './sensorType/ModbusComponent';
import Digital from './sensorType/DigitalComponent';
import AnalogAlert from './sensorType/AnalogAlert';
import ModbusAlert from './sensorType/ModbusAlert';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validatation/formValidation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DeviceAdd = ({locationDetails, labMap}) => {  
 

  const [location_id, setLocation_Id] = useState(16);
  const [branch_id, setBranch_id] = useState(16);
  const [facility_id, setFacility_id] = useState(2);
  const [building_id, setBuildingId] = useState(1);
  const [category_id, setCategory_id] = useState('');  
  const [deviceCategory, setDeviceCategory] = useState('');
  const [deviceId, setDeviceId] = useState('');

  const [categoryId, setCategoryId] = useState('');
  // const [sensorName, setSensorName] = useState("");
  const [sensorTag, setSensorTag] = useState('');
  // const [sensorOutput, setSensorOutput] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [sensorList, setSensorList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [sensorCategoryList, setSensorCategoryList] = useState([]);

  const [alerts, setAlert] = useState('');
  const [alertTag, setAlertTag] = useState('');
  // const [sensorType, setSensorType] = useState("");
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerLength, setRegisterLength] = useState('');
  const [minReadingRage, setMinReadingRage] = useState('');
  const [minScale, setMinScale] = useState('');
  const [minUnits, setMinUnits] = useState('');
  const [maxReadingRage, setMaxReadingRage] = useState('');
  const [maxScale, setMaxScale] = useState('');
  const [maxUnits, setMaxUnits] = useState('');
  const [minThreshold, setMinThreshold] = useState('');
  const [maxThreshold, setmaxThreshold] = useState('');
  
  //------//
  const [sensorCategoryId, setSensorCategoryId] = useState(''); 
  const [sensorName, setSensorName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [partId, setPartId] = useState('');
  const [sensorOutput, setSensorOutput] = useState('Digital');
  //-- Digital --/
  const [digitalAlertType, setDigitalAlertType] = useState(''); 
  const [digitalLowAlert, setDigitalLowAlert] = useState(''); 
  const [digitalHighAlert, setDigitalHighAlert] = useState(''); 
  //-----analog----//
  const [sensorType, setSensorType] = useState('');
  const [units, setUnits] = useState(''); 
  const [minRatedReading, setMinRatedReading] = useState('');
  const [minRatedReadingChecked, setMinRatedReadingChecked] = useState(false);
  const [minRatedReadingScale, setMinRatedReadingScale] = useState('');
  const [maxRatedReading, setMaxRatedReading] = useState('');
  const [maxRatedReadingChecked, setMaxRatedReadingChecked] = useState(false);
  const [maxRatedReadingScale, setMaxRatedReadingScale] = useState('');
  // -Modbus--------//
  const [slaveId, setSlaveId] = useState(''); 
  const [registerId, setRegisterId] = useState('');
  const [length, setLength] = useState('');
  const [registerType, setRegisterType] = useState('');
  const [conversionType, setConversionType] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [subnetMask, setSubnetMask] = useState('');
  //---- polling type--------//
  const [pollingIntervalType, setPollingIntervalType] = useState('');

  // --- Critical Alert --- //
  const [criticalMinValue, setCriticalMinValue] = useState(''); 
  const [criticalMaxValue, setCriticalMaxValue] = useState('');
  const [criticalAlertType, setCriticalAlertType] = useState('');
  const [criticalLowAlert, setCriticalLowAlert] = useState(''); 
  const [criticalHighAlert, setCriticalHighAlert] = useState(''); 
  
  // --- Warning Alert --- //
  const [warningMinValue, setWarningMinValue] = useState(''); 
  const [warningMaxValue, setWarningMaxValue] = useState('');
  const [warningAlertType, setWarningAlertType] = useState('');
  const [warningLowAlert, setWarningLowAlert] = useState(''); 
  const [warningHighAlert, setWarningHighAlert] = useState(''); 

  // --- Out-of-Range Alert --- //
  const [outofrangeMinValue, setOutofrangeMinValue] = useState(''); 
  const [outofrangeMaxValue, setOutofrangeMaxValue] = useState('');
  const [outofrangeAlertType, setOutofrangeAlertType] = useState('');
  const [outofrangeLowAlert, setOutofrangeLowAlert] = useState(''); 
  const [outofrangeHighAlert, setOutofrangeHighAlert] = useState(''); 

  //-- Throttling ---//
  const [open, setOpen] = useState(false);
  const loading = open && categoryList.length === 0 ;

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const [errorObject, setErrorObject] = useState({});
  
  const validateForNullValue = (value, type) => {
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
  
  // useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }

  //   (async () => {
  //     await sleep(1e3); // For demo purposes.

  //     if (active) {
  //       setCategoryList([...categoryList]);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);

  // useEffect(() => {
  //   if (!open) {
  //     setCategoryList([]);
  //   }
  // }, [open]);

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

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
    CategoryFetchService(categoryHandleSuccess,handleException);
    SensorCategoryFetchService(sensorCategoryHandleSuccess,handleException);
  };
  
  const deviceChanged = (sensorCategoryId) => {
    setCategoryId(sensorCategoryId);   
    DeviceFetchService({...locationDetails, sensorCategoryId}, deviceHandleSuccess,handleException);
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    SensorDeployAddService({...locationDetails, 
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
      outofrangeHighAlert}, sensorAddSuccess, senserAddException );
  };  

  const sensorAddSuccess = (dataObject) => {
    // console.log(JSON.stringify(data)); 
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });  
    setTimeout(() => {
      resetForm();
    }, 3000);
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
  
  const resetForm = () =>{
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
    <div className="w-full" style={{marginTop: 0}}>
      <form className="mt-0 p-0 w-full" onSubmit={handleSubmit}>      
        <DialogContent sx={{ px: 0, p: 0 }}>
          <Grid container spacing={1} sx={{mt:0}}>
            <Grid  sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={6} md={6} lg={6} xl={6} >        
              <Box>
                <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
                  <InputLabel id="demo-simple-select-label">
                            Device Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    required
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
            <Grid   sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
                  <InputLabel id="demo-simple-select-label">
                            Device Name
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deviceId}
                    required
                    label="Device Name"                
                    onChange={(e) => {
                      setDeviceId(e.target.value);                            
                    }}
                    // error={errorObject?.deviceName?.errorStatus}
                    // helperText={errorObject?.deviceName?.helperText} 
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
            <Grid   sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
                  <InputLabel id="demo-simple-select-label">
                          Sensor Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorCategoryId}
                    required
                    label="Sensor Category"                
                    onChange={(e) => {
                      setSensorCategoryId(e.target.value); 
                      setSensorList([]);   
                      // SensorFetchService(e.target.value, sensorHandleSuccess,handleException);

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
            <Grid  sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={6} md={6} lg={6} xl={6} >        
              <Box>
                {/* <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
                        <InputLabel id="demo-simple-select-label">
                          Sensor Name
                        </InputLabel>
                        <Select
                        sx={{  }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sensorName}
                        label="Sensor Name"                
                        onChange={(e) => {
                          // deviceChanged(e.target.value);
                          // setCategory_id(e.target.value);
                          setSensorName(e.target.value);
                        }}
                        error={errorObject?.deviceCategory?.errorStatus}
                        helperText={errorObject?.deviceCategory?.helperText} 
                        >
                        {sensorList.map((data) => {
                            return (
                                <MenuItem value={data.id}>{data.sensorName}</MenuItem>
                            );
                            })}
                        </Select>
                    </FormControl> */}
                  
                <Autocomplete
                  id="asynchronous-demo"
                  sx={{}}
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  // isOptionEqualToValue={(option, value) => option.id === value.id}
                  isOptionEqualToValue={(option, value) => {
                      
                    return option.id === value.id;
                  }}
                  getOptionLabel={(option) => {
                    console.log(option);
                      
                    return option.sensorName;
                  }}
                  options={sensorList}
                  // loading={loading}
                  onChange={(e, data)=>{
                    console.log('value'+data.sensorName);
                    setSensorName(data.id);
                    setSensorOutput(data.sensorOutput);  
                    setSensorType(data.sensorType);
                    //--digital--//
                    // setDigitalAlertType(option.digitalAlertType); 
                    // setDigitalLowAlert(option.digitalLowAlert);
                    // setDigitalHighAlert(option.digitalHighAlert);
                    //-- analog --// 
                    setUnits(data.units);
                    setMinRatedReading(data.minRatedReading);
                    setMinRatedReadingChecked(data.minRatedReadingChecked);
                    setMinRatedReadingScale(data.minRatedReadingScale);
                    setMaxRatedReading(data.maxRatedReading);
                    setMaxRatedReadingChecked(data.maxRatedReadingChecked);
                    setMaxRatedReadingScale(data.maxRatedReadingScale);
                    //--modbus--/
                    setIpAddress(data.ipAddress);
                    setSubnetMask(data.subnetMask);
                    setSlaveId(data.slaveId);
                    setRegisterId(data.registerId);
                    setLength(data.length);
                    setRegisterType(data.registerType);
                    setConversionType(data.conversionType);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sensor Name"
                      required
                      onKeyUp={(e)=>{
                        setTimeout(()=>{
                          SensorFetchService(sensorCategoryId, sensorHandleSuccess,handleException);
                        },500);
                      }}
                        
                      // InputProps={{
                      //   ...params.InputProps,
                      //   endAdornment: (
                      //     <React.Fragment>
                      //       {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      //       {params.InputProps.endAdornment}
                      //     </React.Fragment>
                      //   ),
                      // }}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid   sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
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
                
            <Grid   sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{marginTop:0}}
                  disabled={true}     // disable after complition of edit part
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
          {/* <Divider >-</Divider> */}
          {sensorOutput == 'Analog'? 
            <>
              <Analog 
                errorObject={errorObject}
                setErrorObject={setErrorObject}
                disable={true}
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
                pollingIntervalType={pollingIntervalType} setPollingIntervalType={setPollingIntervalType}
                criticalMinValue={criticalMinValue} setCriticalMinValue={setCriticalMinValue}
                criticalMaxValue={criticalMaxValue} setCriticalMaxValue={setCriticalMaxValue}
                criticalAlertType={criticalAlertType} setCriticalAlertType={setCriticalAlertType}
                criticalLowAlert={criticalLowAlert} setCriticalLowAlert={setCriticalLowAlert}
                criticalHighAlert={criticalHighAlert} setCriticalHighAlert={setCriticalHighAlert}

                warningMinValue={warningMinValue} setWarningMinValue={setWarningMinValue}
                warningMaxValue={warningMaxValue} setWarningMaxValue={setWarningMaxValue}
                warningAlertType={warningAlertType} setWarningAlertType={setWarningAlertType}
                warningLowAlert={warningLowAlert} setWarningLowAlert={setWarningLowAlert}
                warningHighAlert={warningHighAlert} setWarningHighAlert={setWarningHighAlert}

                outofrangeMinValue={outofrangeMinValue} setOutofrangeMinValue={setOutofrangeMinValue}                
                outofrangeMaxValue={outofrangeMaxValue} setOutofrangeMaxValue={setOutofrangeMaxValue}
                outofrangeAlertType={outofrangeAlertType} setOutofrangeAlertType={setOutofrangeAlertType}
                outofrangeLowAlert={outofrangeLowAlert} setOutofrangeLowAlert={setOutofrangeLowAlert}
                outofrangeHighAlert={outofrangeHighAlert} setOutofrangeHighAlert={setOutofrangeHighAlert}
                alerts={alerts} setAlert={setAlert}/>
            </>
            : 
            sensorOutput == 'Modbus'? 
              <>
                <Modbus  
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  disable={true}
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
                  pollingIntervalType={pollingIntervalType} setPollingIntervalType={setPollingIntervalType}
                  criticalMinValue={criticalMinValue} setCriticalMinValue={setCriticalMinValue}
                  criticalMaxValue={criticalMaxValue} setCriticalMaxValue={setCriticalMaxValue}
                  criticalAlertType={criticalAlertType} setCriticalAlertType={setCriticalAlertType}
                  criticalLowAlert={criticalLowAlert} setCriticalLowAlert={setCriticalLowAlert}
                  criticalHighAlert={criticalHighAlert} setCriticalHighAlert={setCriticalHighAlert}

                  warningMinValue={warningMinValue} setWarningMinValue={setWarningMinValue}
                  warningMaxValue={warningMaxValue} setWarningMaxValue={setWarningMaxValue}
                  warningAlertType={warningAlertType} setWarningAlertType={setWarningAlertType}
                  warningLowAlert={warningLowAlert} setWarningLowAlert={setWarningLowAlert}
                  warningHighAlert={warningHighAlert} setWarningHighAlert={setWarningHighAlert}

                  outofrangeMinValue={outofrangeMinValue} setOutofrangeMinValue={setOutofrangeMinValue}                
                  outofrangeMaxValue={outofrangeMaxValue} setOutofrangeMaxValue={setOutofrangeMaxValue}
                  outofrangeAlertType={outofrangeAlertType} setOutofrangeAlertType={setOutofrangeAlertType}
                  outofrangeLowAlert={outofrangeLowAlert} setOutofrangeLowAlert={setOutofrangeLowAlert}
                  outofrangeHighAlert={outofrangeHighAlert} setOutofrangeHighAlert={setOutofrangeHighAlert}
                  alerts={alerts} setAlert={setAlert}
                />
              </>
              : 
              <>
                <Digital 
                  errorObject={errorObject}
                  setErrorObject={setErrorObject}
                  digitalAlertType={digitalAlertType} setDigitalAlertType={setDigitalAlertType}
                  digitalLowAlert={digitalLowAlert} setDigitalLowAlert={setDigitalLowAlert}
                  digitalHighAlert={digitalHighAlert} setDigitalHighAlert={setDigitalHighAlert}

                // alerts={alerts} setAlert={setAlert} alertTag={alertTag} setAlertTag={setAlertTag}
                />
              </>
          }
          <div className="float-right">
            <Button
              sx={{ m: 2 }}
              onClick={(e) => {                   
                setErrorObject({}); 
                resetForm();                     
              }}
            >
                  Cancel
            </Button>
            <Button
              sx={{ m: 2 }}
              size="large"
              variant ="contained"
              type = "submit"
            > 
                ADD
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

export default DeviceAdd;