import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogActions from '@mui/material/DialogActions';
import { ConfigSetupEditService, ConfigSetupFetchService,DeviceConfigSetupAddService,DeviceConfigSetupFetchService } from '../../../../services/LoginPageService';
import Typography from '@mui/material/Typography';
import { AddVendorValidate } from '../../../../validatation/locationValidation';
import { GridBody } from '@mui/x-data-grid';
import {  Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import NotificationBar from '../../../notification/ServiceNotificationBar';


const DeviceConfigSetupModal = ({open, setOpen, isAddButton,  deviceData}) => {
   
    const [id, setId] = useState('');

    const [device_id, setDevice_id] = useState('');    
    //AccessPoint inputs    
    const [accessPointName, setAccessPointName] = useState('');  
    const [ssId, setSsId] = useState('');
    const [accessPointPassword, setAccessPointPassword] = useState('');
   
    //FTP inputs
    const [ftpAccountName,setFtpAccountName] =useState('');
    const [userName, setUserName] = useState('');
    const [ftpPassword,setFtpPassword] =useState('');
    const [port,setPort] =useState('');
    const [serverUrl,setServerUrl] =useState('');
    const [folderPath,setFolderPath] =useState('');  

    //Serviceprovider inputs
    const [serviceProvider,setServiceProvider] =useState('');
    const [apn,setApn] =useState('');

    const [configSetupList,setConfigSetupList] = useState([]);
    const [accessType, setAccessType] = useState("");   

    const [errorObject, setErrorObject] = useState({});

    const [openNotification, setNotification] = useState({
      status: false,
      type: 'error',
      message: ''
    });

    useEffect(()=>{
        setOpen(open);
        loadData();
       
      },[deviceData]);
  
    const loadData = () =>{        
        setDevice_id(deviceData.id);     
        // setAccessPointName(deviceData.accessPointName);
        fetchService(deviceData.id);
    }
      
    const fetchService = (id) =>{
      ConfigSetupFetchService(configSetupHandleSuccess, configSetupHandleException); 
      DeviceConfigSetupFetchService({id}, handleDeviceConfigSetupFetchSuccess, handleDeviceConfigSetupFetchException);
    }

    const handleDeviceConfigSetupFetchSuccess = (dataObject) => {     
      if(dataObject.data.length === 0){
          setAccessPointName('');
          setSsId('');
          setAccessPointPassword('');
          setFtpAccountName('');
          setUserName('');
          setFtpPassword('');
          setPort('');
          setServerUrl('');
          setFolderPath('');
          setServiceProvider('');
          setApn('');
      }
      else{
        setAccessPointName(dataObject.data[0].accessPointName|| '');
        setSsId(dataObject.data[0].ssId|| '');
        setAccessPointPassword(dataObject.data[0].accessPointPassword|| '');
        setFtpAccountName(dataObject.data[0].ftpAccountName|| '');
        setUserName(dataObject.data[0].userName|| '');
        setFtpPassword(dataObject.data[0].ftpPassword|| '');
        setPort(dataObject.data[0].port|| '');
        setServerUrl(dataObject.data[0].serverUrl|| '');
        setFolderPath(dataObject.data[0].folderPath|| '');
        setServiceProvider(dataObject.data[0].serviceProvider|| '');
        setApn(dataObject.data[0].apn|| '');
      }   

      
    }
    const handleDeviceConfigSetupFetchException = (errorObject) => {
      console.log(JSON.stringify(errorObject));
    }
    const validateForNullValue = (value, type) => {
      AddVendorValidate(value, type, setErrorObject);
    };

    const configSetupHandleSuccess = (dataObject) => {       
      setConfigSetupList(dataObject.data);         
    }
  
    const configSetupHandleException = (errorObject) => {
      console.log(JSON.stringify(errorObject));
    }

    const handleSuccess = (dataObject) => {
      setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });
    setTimeout(() => {
      handleClose();
      setOpen(false);
    }, 5000);
    }

    const Reset = (data) => {
        if(data == "Custom"){
            setAccessPointName("");
            setSsId("");
            setAccessPointPassword("");
            setFtpAccountName("");
            setUserName("");
            setFtpPassword("");
            setPort("");
            setServerUrl("");
            setFolderPath("");
            setServiceProvider("");
            setApn("");
        }      
    }
  
    const handleException = (errorObject) => {
      console.log(JSON.stringify(errorObject));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await DeviceConfigSetupAddService({device_id,accessPointName, ssId, accessPointPassword, ftpAccountName, userName , ftpPassword, port, serverUrl, folderPath, serviceProvider, apn}, handleSuccess, handleException);
     }

     const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: ''
        });
      }
  return (
    <Dialog
          fullWidth = { true }
          maxWidth = "md"
          sx = {{'& .MuiDialog-paper':{width: '100%', maxHeight: '100%' }}
          }
          open={open}
    >
      <form onSubmit={handleSubmit} >
        <DialogTitle>
          {isAddButton ? "Add ConfigSetup" : "Edit ConfigSetup"}
        </DialogTitle>
        
        <DialogContent>
          <div className="flex items-center justify-between gap-3">       
          <Grid container spacing={1} sx={{mt:0}}>
              <Grid  sx={{ mt: 0, padding:0 }}
                item 
                xs={12} sm={6} md={4} lg={4} xl={4} >          
                <FormControl fullWidth sx={{ mt: 1, padding: 0 }}>
                  <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accessType}
                    label="Access Type"          
                    onChange={(e) => { 
                      setAccessType(e.target.value);                                    
                      Reset(e.target.value);     
                      
                    }}
                  >
                    <MenuItem value={"accessPoint"}>{"Access Point"}</MenuItem>
                    <MenuItem value={"FTP"}>{"FTP"}</MenuItem>
                    <MenuItem value={"serviceProvider"}>{"Service Provider"}</MenuItem>
                    <MenuItem value={"Custom"}>{"Custom"}</MenuItem> 
                  
                  </Select>
                </FormControl>  
              </Grid> 
              <Grid  sx={{ mt: 1, padding:0 }}
                item 
                xs={12} sm={6} md={8} lg={8} xl={8} >                                              
                  <Autocomplete
                    id="asynchronous-demo"
                    sx={{}}    
                    disabled={accessType == 'Custom'? true : false}
                    isOptionEqualToValue={(option, value) => {                      
                      return option.id === value.id
                    }}
                    getOptionLabel={(option) => {
                        if(accessType == "accessPoint"){
                          return option.accessPointName
                        }
                        if(accessType == "FTP"){
                          return option.ftpAccountName
                        }
                        if(accessType == "serviceProvider"){
                          return option.serviceProvider
                        }
                        if(accessType == "Custom"){
                          return ""
                        }
                    }}
                  
                    options={configSetupList}                    
                      onChange={(e, data)=>{   
                          setAccessPointName(data.accessPointName);
                          setSsId(data.ssId);
                          setAccessPointPassword(data.accessPointPassword);
                          setFtpAccountName(data.ftpAccountName);
                          setUserName(data.userName);
                          setFtpPassword(data.ftpPassword);
                          setPort(data.port);
                          setServerUrl(data.serverUrl);
                          setFolderPath(data.folderPath);
                          setServiceProvider(data.serviceProvider);
                          setApn(data.apn);          
                      }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Criteria"
                        onKeyUp={(e)=>{
                          // setTimeout(()=>{
                          //   SensorFetchService(sensorCategoryId, sensorHandleSuccess,handleException);
                          // },500);
                        }}                   
                      />
                    )}
                  />
              </Grid>
            </Grid>
          </div>
          <Typography variant="subtitle1" component="h6">
            Access Point
          </Typography>  
          <div className="flex items-center justify-between gap-3">                                                 
                  <TextField 
                    value={accessPointName}
                    margin = "dense"
                    id = "outlined-basic"
                    label = "Access Point Name"
                    variant = "outlined"
                    fullWidth
                    required
                    // onBlur={() =>validateForNullValue(accessPointName, 'accessPointName')}
                    onChange={(e) => { setAccessPointName(e.target.value)}}
                    autoComplete="off"
                    // error={errorObject?.accessPointName?.errorStatus}
                    // helperText={errorObject?.accessPointName?.helperText}                     
                  />
              
                <TextField 
                    value={ssId}
                    margin = "dense"
                    id = "outlined-basic"
                    label = "SSID"
                    variant = "outlined"
                    fullWidth
                    required
                    // onBlur={() =>validateForNullValue(ssId, 'ssId')}
                    onChange={(e) => { setSsId(e.target.value)}}
                    autoComplete="off"
                    // error={errorObject?.ssId?.errorStatus}
                    // helperText={errorObject?.ssId?.helperText} 
              />
            
                <TextField 
                    value={accessPointPassword}
                    margin = "dense"
                    id = "outlined-basic"
                    label = "password"
                    type={'password'}
                    variant = "outlined"
                    fullWidth
                    required
                    // onBlur={() =>validateForNullValue(accessPointPassword, 'accessPointPassword')}
                    onChange={(e) => { setAccessPointPassword(e.target.value)}}
                    autoComplete="off"
                    // error={errorObject?.accessPointPassword?.errorStatus}
                    // helperText={errorObject?.accessPointPassword?.helperText}                   
                />
          </div>
          <Typography variant="subtitle1" component="h6">
                  FTP
          </Typography>    
          <div className="flex items-center justify-between gap-3">           
                <TextField 
                    value={ftpAccountName}
                    margin = "dense"
                    id = "outlined-basic"
                    label = "Account Name"
                    variant = "outlined"
                    fullWidth
                    required
                    // onBlur={() =>validateForNullValue(ftpAccountName, 'ftpAccountName')}
                    onChange={(e) => { setFtpAccountName(e.target.value)}}
                    autoComplete="off"
                    // error={errorObject?.ftpAccountName?.errorStatus}
                    // helperText={errorObject?.ftpAccountName?.helperText}                   
              /> 
              
              <TextField 
                value={userName}
                margin = "dense"
                id = "outlined-basic"
                label = "User name"
                variant = "outlined"
                required
                //  onBlur={() =>validateForNullValue(userName, 'userName')}
                onChange={(e) => { setUserName(e.target.value)}}
                autoComplete="off"
                fullWidth
                //  error={errorObject?.userName?.errorStatus}
                //  helperText={errorObject?.userName?.helperText}               
              />            
            
              <TextField 
                  value={ftpPassword}
                  margin = "dense"
                  id = "outlined-basic"
                  type={'password'}
                  label = "password"
                  variant = "outlined"
                  fullWidth 
                  required
                //  onBlur={() =>validateForNullValue(ftpPassword, 'ftpPassword')}
                  onChange={(e) => {setFtpPassword(e.target.value)}}
                  autoComplete="off"
                //  error={errorObject?.ftpPassword?.errorStatus}
                //  helperText={errorObject?.ftpPassword?.helperText}
              />
          </div>
          <div className="flex items-center justify-between gap-3">            
                <TextField 
                      value={port}
                      margin = "dense"
                      id = "outlined-basic"
                      label = "Port"
                      variant = "outlined"
                      fullWidth 
                      required
                      //  onBlur={() =>validateForNullValue(port, 'port')}
                      onChange={(e) => { setPort(e.target.value)}}
                      autoComplete="off"
                      //  error={errorObject?.port?.errorStatus}
                      //  helperText={errorObject?.port?.helperText}
                />            
                <TextField 
                    value={serverUrl}
                    margin = "dense"
                    id ="outlined-multiline-flexible"
                    label = "Server Url"
                    multiline maxRows = { 4 }
                    fullWidth
                    // onBlur={() =>validateForNullValue(serverUrl, 'serverUrl')}
                    onChange={(e) => { setServerUrl(e.target.value)}}
                    autoComplete="off" 
                    // error={errorObject?.serverUrl?.errorStatus}
                    // helperText={errorObject?.serverUrl?.helperText}
                />              
                <TextField 
                  value={folderPath}
                  margin = "dense"
                  id = "outlined-basic"
                  label = "Folder Path"
                  variant = "outlined"
                  fullWidth
                  //  onBlur={() =>validateForNullValue(folderPath, 'folderPath')}
                  onChange={(e) => { setFolderPath(e.target.value)}}
                  autoComplete="off"
                  //  error={errorObject?.folderPath?.errorStatus}
                  //  helperText={errorObject?.folderPath?.helperText}
              />      
          </div>
          <Typography variant="subtitle1" component="h6">
                APN
          </Typography>          
          <div className="flex items-center justify-between gap-3"> 
                <TextField 
                  value={serviceProvider}
                  margin = "dense"
                  id = "outlined-basic"
                  label = "Service Provider"
                  variant = "outlined"
                  fullWidth
                  // onBlur={() =>validateForNullValue(serviceProvider, 'serviceProvider')}
                  onChange={(e) => { setServiceProvider(e.target.value)}}
                  autoComplete="off"
                  // error={errorObject?.serviceProvider?.errorStatus}
                  // helperText={errorObject?.serviceProvider?.helperText}
              />              
              <TextField 
                    value={apn}
                    margin = "dense"
                    id = "outlined-basic"
                    label = "APN"
                    variant = "outlined"
                    fullWidth
                    //  onBlur={() =>validateForNullValue(apn, 'apn')}
                    onChange={(e) => { setApn(e.target.value)}}
                    autoComplete="off"
                    //  error={errorObject?.apn?.errorStatus}
                    //  helperText={errorObject?.apn?.helperText}
                />  
          </div>
        </DialogContent>
        <DialogActions sx = {{ margin: '10px' }} >
          <Button 
              size = "large"
              variant = "outlined"
              autoFocus 
              onClick={(e)=>{
                    setOpen(false);
                    setErrorObject({});
                    loadData();
                  }} >
              Cancel 
          </Button> 
          <Button 
            // disabled={errorObject?.vendorName?.errorStatus || errorObject?.companyCode?.errorStatus || errorObject?.phoneNumber?.errorStatus || errorObject?.emailId?.errorStatus || errorObject?.address?.errorStatus|| errorObject?.contactPerson?.errorStatus}
              size="large"
              variant ="contained"
              type = "submit">  {isAddButton ? "Add" : "Update"}
          </Button> 
        </DialogActions> 
      </form>    

      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type} 
      /> 
    </Dialog>
  )
}

export default DeviceConfigSetupModal