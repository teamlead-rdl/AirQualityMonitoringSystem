import React, { useState , useEffect} from "react";
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
 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { CategoryFetchService, DeviceFetchService, SensorAddService, SensorCategoryFetchService, SensorDeployAddService, SensorDeployEditService, SensorFetchService } from "../../services/LoginPageService";
import Analog from "./sensorType/AnalogComponent";
import Modbus from "./sensorType/ModbusComponent";
import Digital from "./sensorType/DigitalComponent";
import AnalogAlert from "./sensorType/AnalogAlert";
import ModbusAlert from "./sensorType/ModbusAlert";
import NotificationBar from "../notification/ServiceNotificationBar";
import { AddCategoryValidate } from "../../validatation/formValidation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DeviceAdd = ({locationDetails, labMap, setProgressStatus, editData, isUpdate}) => {  
 
  const [location_id, setLocation_Id] = useState(16);
  const [branch_id, setBranch_id] = useState(16);
  const [facility_id, setFacility_id] = useState(2);
  const [building_id, setBuildingId] = useState(1);
  const [category_id, setCategory_id] = useState("");  
  const [deviceCategory, setDeviceCategory] = useState("");
  const [deviceId, setDeviceId] = useState(editData?.deviceId || "");
  const [categoryId, setCategoryId] = useState(editData?.categoryId || "");
  const [sensorTag, setSensorTag] = useState(editData?.sensorTag || "");
  const [id, setId] = useState(editData?.id || '');
  const [categoryList, setCategoryList] = useState([]);
  const [sensorList, setSensorList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [sensorCategoryList, setSensorCategoryList] = useState([]);
  const [alerts, setAlert] = useState("");
  const [alertTag, setAlertTag] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [registerLength, setRegisterLength] = useState("");
  const [minReadingRage, setMinReadingRage] = useState("");
  const [minScale, setMinScale] = useState("");
  const [minUnits, setMinUnits] = useState("");
  const [maxReadingRage, setMaxReadingRage] = useState("");
  const [maxScale, setMaxScale] = useState("");
  const [maxUnits, setMaxUnits] = useState("");
  const [minThreshold, setMinThreshold] = useState("");
  const [maxThreshold, setmaxThreshold] = useState("");
  const [sensorCategoryId, setSensorCategoryId] = useState(editData?.sensorCategoryId || ""); 
  const [sensorName, setSensorName] = useState(editData?.sensorName || "");
  const [manufacturer, setManufacturer] = useState("");
  const [partId, setPartId] = useState("");
  const [sensorOutput, setSensorOutput] = useState(editData?.sensorOutput || "Digital");
  //-- Digital --/
  const [digitalAlertType, setDigitalAlertType] = useState(editData?.digitalAlertType || ""); 
  const [digitalLowAlert, setDigitalLowAlert] = useState(editData?.digitalLowAlert || ""); 
  const [digitalHighAlert, setDigitalHighAlert] = useState(editData?.digitalHighAlert || ""); 
  //-----analog----//
  const [sensorType, setSensorType] = useState(editData?.sensorType || "");
  const [units, setUnits] = useState(editData?.units || ""); 
  const [minRatedReading, setMinRatedReading] = useState(editData?.minRatedReading || "");
  const [minRatedReadingChecked, setMinRatedReadingChecked] = useState(editData?.minRatedReadingChecked || '0');
  const [minRatedReadingScale, setMinRatedReadingScale] = useState(editData?.minRatedReadingScale || "");
  const [maxRatedReading, setMaxRatedReading] = useState(editData?.maxRatedReading || "");
  const [maxRatedReadingChecked, setMaxRatedReadingChecked] = useState(editData?.maxRatedReadingChecked || '0');
  const [maxRatedReadingScale, setMaxRatedReadingScale] = useState(editData?.maxRatedReadingScale || "");
  // -Modbus--------//
  const [slaveId, setSlaveId] = useState(editData?.slaveId || ""); 
  const [registerId, setRegisterId] = useState(editData?.registerId || "");
  const [length, setLength] = useState(editData?.length || "");
  const [registerType, setRegisterType] = useState(editData?.registerType || "");
  const [conversionType, setConversionType] = useState(editData?.conversionType || "");
  const [ipAddress, setIpAddress] = useState(editData?.ipAddress || "");
  const [subnetMask, setSubnetMask] = useState(editData?.subnetMask || "");
  //---- polling type--------//
  const [pollingIntervalType, setPollingIntervalType] = useState(editData?.pollingIntervalType || "");
  // --- Critical Alert --- //
  const [criticalMinValue, setCriticalMinValue] = useState(editData?.criticalMinValue || ""); 
  const [criticalMaxValue, setCriticalMaxValue] = useState(editData?.criticalMaxValue || "");
  const [criticalAlertType, setCriticalAlertType] = useState(editData?.criticalAlertType || "");
  const [criticalLowAlert, setCriticalLowAlert] = useState(editData?.criticalLowAlert || ""); 
  const [criticalHighAlert, setCriticalHighAlert] = useState(editData?.criticalHighAlert || ""); 
  // --- Warning Alert --- //
  const [warningMinValue, setWarningMinValue] = useState(editData?.warningMinValue || ""); 
  const [warningMaxValue, setWarningMaxValue] = useState(editData?.warningMaxValue || "");
  const [warningAlertType, setWarningAlertType] = useState(editData?.warningAlertType || "");
  const [warningLowAlert, setWarningLowAlert] = useState(editData?.warningLowAlert || ""); 
  const [warningHighAlert, setWarningHighAlert] = useState(editData?.warningHighAlert || ""); 
  // --- Out-of-Range Alert --- //
  const [outofrangeMinValue, setOutofrangeMinValue] = useState(editData?.outofrangeMinValue || ""); 
  const [outofrangeMaxValue, setOutofrangeMaxValue] = useState(editData?.outofrangeMaxValue || "");
  const [outofrangeAlertType, setOutofrangeAlertType] = useState(editData?.outofrangeAlertType || "");
  const [outofrangeLowAlert, setOutofrangeLowAlert] = useState(editData?.outofrangeLowAlert || ""); 
  const [outofrangeHighAlert, setOutofrangeHighAlert] = useState(editData?.outofrangeHighAlert || ""); 
  //-- Throttling ---//
  const [open, setOpen] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const loading = open && categoryList.length === 0 ;

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject)
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

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);  
  }
  
  const deviceHandleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);  
  }
  
  const sensorCategoryHandleSuccess = (dataObject) => {
    setSensorCategoryList(dataObject.data);  
  }
  
  const sensorHandleSuccess = (dataObject) => {
    setSensorList(dataObject.data);  
  }

  const loadData = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
    SensorCategoryFetchService(sensorCategoryHandleSuccess, handleException);
    {editData?.deviceId && 
      DeviceFetchService({...locationDetails, sensorCategoryId}, deviceHandleSuccess, handleException);
      SensorFetchService(sensorCategoryId, sensorHandleSuccess, handleException);
    }
  }
  
  const deviceChanged = (sensorCategoryId) => {
    setCategoryId(sensorCategoryId);   
    DeviceFetchService({...locationDetails, sensorCategoryId}, deviceHandleSuccess, handleException);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    {isUpdate ?
    SensorDeployEditService({...locationDetails, 
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
      outofrangeHighAlert}, sensorAddSuccess, senserAddException)
      :
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
      outofrangeHighAlert}, sensorAddSuccess, senserAddException )
    }
  }  

  const sensorAddSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });  
    setTimeout(() => {
      resetForm();
      handleClose();
      setProgressStatus(1);
    }, 3000);
  };
  
  const senserAddException = (errorObject, errorMessage) => {
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
  }
  
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
  }
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
                        disabled={editData && true}
                        label="Sensor Category"                
                        onChange={(e) => {
                          setSensorCategoryId(e.target.value); 
                          setSensorList([]);   
                          // SensorFetchService(e.target.value, sensorHandleSuccess,handleException);
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
                  {editData ?
                  <Grid   sx={{ mt: 0, padding:0 }}
                  item 
                  xs={12} sm={6} md={6} lg={6} xl={6}>
                  <div className='rounded-md -space-y-px'>
                    <TextField 
                      value={editData?.sensorNameUnit}
                      disabled
                    fullWidth/>
                    </div>  
                    </Grid>
                  :
                  <Grid  sx={{ mt: 0, padding:0 }}
                    item 
                    xs={12} sm={6} md={6} lg={6} xl={6} > 
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
                            
                            return option.id === value.id
                          }}
                          getOptionLabel={(option) => {
                            console.log(option);
                            
                            return option.sensorName
                          }}
                          options={sensorList}
                          onChange={(e, data)=>{
                            console.log('value'+data.sensorName);
                            setSensorName(data.id);
                            setSensorOutput(data.sensorOutput);  
                            setSensorType(data.sensorType);
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
                            />
                          )}
                        />
                        </Box>
                  </Grid>
                  }
                <Grid   sx={{ mt: 0, padding:0 }}
                  item 
                  xs={12} sm={6} md={6} lg={6} xl={6}>
                  <div className='rounded-md -space-y-px'>
                      <TextField
                        sx={{marginTop:0}}
                        value={sensorTag}
                        onBlur={() => validateForNullValue(sensorTag, "sensorTag")}
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
                          >
                          <MenuItem value={"Digital"}>{"Digital"}</MenuItem>
                          <MenuItem value={"Analog"}>{"Analog"}</MenuItem>
                          <MenuItem value={"Modbus"}>{"Modbus"}</MenuItem>
                          </Select>
                      </FormControl>
                  </Box>
                </Grid>
                
            </Grid>    
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
                />
              </>
              }
            <div className="float-right">
              <Button
                  sx={{ m: 2 }}
                  onClick={(e) => {                   
                    setErrorObject({}); 
                    resetForm(); 
                    setProgressStatus && setProgressStatus(1);                    
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
};

export default DeviceAdd;