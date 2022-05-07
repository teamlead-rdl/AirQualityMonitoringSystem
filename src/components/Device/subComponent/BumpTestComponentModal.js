import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

import { AddCategoryValidate } from '../../../validation/formValidation';

import { BumpTestAddService, BumpTestFetchService,BumpTestData } from '../../../services/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { data } from 'autoprefixer';

const columns = [
  { 
    field: 'id',
    headerName: 'ID',
    width: 150
  },
  {
    field: 'typeCheck',
    headerName: 'Type check',
    width: 150
  },
  {
    field : 'displayedValue',
    headerName:' Displayed Value',
    width: 150
  },
  {
    field : 'calibrationDate',
    headerName:' Calibration Date',
    width: 150
  },
  {
    field: 'result',
    headerName: 'Result',
    width: 500,
    editable: true,
  }   
];

function BumpTestComponentModal({
  open, setOpen, isAddButton, setRefreshData, deployedSensorTagList
}) {
  const [id, setId] = useState('');
  const [sensorTagName, setSensorTagName] = useState('');
  const [lastDueDate, setLastDueDate] = useState('');
  const [typeCheck, setTypeCheck] = useState('');
  const [percentageConcentrationGas, setPercentrationConcentrationGas] = useState();
  const [durationPeriod, setDurationPeriod] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');  
  const [percentageDeviation, setPercentageDeviation] = useState('');  
  const [nextDueDate, setNextDueDate] = useState('');  
  const [result, setResult] = useState('pass');
  const [deployedSensorList, setDeployedSensorList] = useState([]);
  const [bumpTestData, setBumpTestData] = useState([]);
  const [errorObject, setErrorObject] = useState({});
  const [array,setArray] = useState([]);  
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setOpen(open);
    loadData();
  }, [deployedSensorTagList]);

  const loadData = () => {
    setDeployedSensorList(deployedSensorTagList);  
  };

  const getBumpData = (e) => {
    e.preventDefault();
    let DurationSec = durationPeriod;
    let setIntervalCal = 2;
    let myVar = setInterval(myTimer ,setIntervalCal*1000);
    let callCount = parseInt(DurationSec/setIntervalCal);
    let count = 0;
    function myTimer() {      
      BumpTestData({sensorTagName}, getBumpTestDataSuccess, getBumpTestDataHandleException);
      if(count == callCount){
          clearInterval(myVar);
          let percentageDeviation = parseInt(percentageConcentrationGas);
          let dataList = array.length;
          let tot = 0;
          let pcgValPowOfTwo  = 0;
          for(let i=0;i<dataList;i++){    
              let pcgVal = 0;                          
              pcgVal = parseFloat(percentageDeviation)-parseInt(array[i]);             
              pcgValPowOfTwo = pcgVal*pcgVal;               
              tot = tot+pcgValPowOfTwo;
          }          
          let avg = 0;          
          avg = tot/dataList;   
          console.log(avg);     
          setPercentageDeviation(Math.sqrt(avg));
      }
      count++;
    }
  }

  const getBumpTestResultData = (data) => {    
    BumpTestFetchService({ sensorTagName:data }, getBumpTestResultDataSuccess, getBumpTestResultDataHandleException);      
  };

  const getBumpTestResultDataSuccess = (dataObject) => {     
     if(dataObject.nextDueDate == ""){
        setLastDueDate(""); 
        setBumpTestData([]);
     }else{
        setLastDueDate(dataObject.nextDueDate); 
        setBumpTestData(dataObject.data);
     }   
  };  

  const getBumpTestResultDataHandleException = (dataObject, errorObject) => {
  }; 

  const getBumpTestDataSuccess = (dataObject) => {
    console.log(dataObject.data.LAST);
    setArray([...array, dataObject.data.LAST]); 
    if(dataObject.data.LAST === "NA"){
      array.push("0");
      setDisplayedValue(dataObject.data.LAST);
    }else{
      array.push(dataObject.data.LAST);
      setDisplayedValue(dataObject.data.LAST);
    }    
  };


  const getBumpTestDataHandleException = (dataObject, errorObject) => {
  };

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });

    setRefreshData((oldvalue) => !oldvalue);

    setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      await BumpTestAddService({ sensorTagName, lastDueDate, typeCheck, percentageConcentrationGas, durationPeriod, displayedValue, nextDueDate,  result }, handleSuccess, handleException);
    }
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isAddButton ? 'Bump Test' : ''}
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center justify-between gap-3">
            <Grid container spacing={1} sx={{ mt: 0 }}>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
              >
                <FormControl fullWidth sx={{ mt: 0, padding: 0 }}>
                  <InputLabel id="demo-simple-select-label">Deployed Sensors</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sensorTagName}
                    label="Deployed Sensors"
                    onChange={(e) => {
                      setSensorTagName(e.target.value);
                      getBumpTestResultData(e.target.value);
                      // Reset(e.target.value);
                    }}
                  >
                    {deployedSensorList.map((data) => (
                      <MenuItem value={data.sensorTag}>{data.sensorTag}</MenuItem>
                    ))}
                    {/* <MenuItem value="accessPoint">Sensor 1</MenuItem>
                    <MenuItem value="FTP">Sensor 2</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
              >
                <TextField
                    sx={{ marginTop: 0 }}
                    margin="dense"
                    id="outlined-required"
                    label="Last Due Date"
                    defaultValue=""
                    fullWidth
                    type="text"
                    disabled="true"
                    value={lastDueDate}
                    required               
                    // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                    onChange={(e) => { setLastDueDate(e.target.value); }}
                    autoComplete="off"
                    // error={errorObject?.categoryName?.errorStatus}
                    // helperText={errorObject?.categoryName?.helperText}
                    // InputLabelProps={{shrink: true}}
                />
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
                <FormControl className="float-left" >
                  <RadioGroup
                    row = {true}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={typeCheck}
                    onClick={(e) => {
                      setTypeCheck(e.target.value);
                    }}
                  >
                    <FormControlLabel value="zeroCheck" control={<Radio required />} label="Zero Check" />
                    <FormControlLabel value="SpanCheck" control={<Radio required />} label="Span Check" />
                  </RadioGroup>
                </FormControl>              
              </Grid>                       
            </Grid>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Grid container spacing={1} sx={{ mt: 0 }}>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
              >
                <TextField
                    sx={{ marginTop: 0 }}
                    margin="dense"
                    id="outlined-required"
                    label="Percentage Concentration Of Gas"
                    defaultValue=""
                    fullWidth
                    disabled = { typeCheck ===  'zeroCheck' ? true : false }
                    value={percentageConcentrationGas}
                    required
                    // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                    onChange={(e) => { setPercentrationConcentrationGas(e.target.value); }}
                    autoComplete="off"
                    //error={errorObject?.categoryName?.errorStatus}
                    // helperText={errorObject?.categoryName?.helperText}
                />
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={2}
                md={2}
                lg={2}
                xl={2}
              >
                <TextField
                  sx={{ marginTop: 0 }}
                  value={durationPeriod}
                  type="text"
                  // onBlur={() => validateForNullValue(pollingPriority, 'pollingPriority')}
                  onChange={(e) => {
                    setDurationPeriod(e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Duration (sec)"
                  autoComplete="off"
                  fullWidth
                  // error={errorObject?.pollingPriority?.errorStatus}
                  // helperText={errorObject?.pollingPriority?.helperText}
                />
              </Grid> 
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={2}
                md={2}
                lg={2}
                xl={2}
              >
                <Button
                  size="large"
                  variant="outlined"
                  autoFocus
                  onClick={(e) => {           
                    getBumpData(e);
                  }}
                >
                Start
                </Button>
              </Grid>    
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <h3>Display Value:{displayedValue}</h3>
                <h3>Percentage Deviation:{percentageDeviation}</h3>
              </Grid>         
            </Grid>
          </div>
          <div className="flex items-center justify-between gap-2">
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
                <TextField
                  sx={{ marginTop: 0 }}
                  margin="normal"
                  id="outlined-required"
                  label="Set Next Due Date"
                  defaultValue=""
                  fullWidth
                  type="date"                
                  required    
                  value={nextDueDate}           
                  // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                  onChange={(e) => { setNextDueDate(e.target.value); }}
                  autoComplete="off"
                  InputLabelProps={{shrink: true}}
                // error={errorObject?.categoryName?.errorStatus}
                // helperText={errorObject?.categoryName?.helperText}
                />
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
                <DialogActions sx={{ margin: '0px' }}>
                  <Button
                    size="large"
                    variant="outlined"
                    autoFocus
                    onClick={(e) => {
                      setOpen(false);
                      setErrorObject({});
                      loadData();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={errorObject?.categoryName?.errorStatus || errorObject?.categoryDescription?.errorStatus}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    {' '}
                    {isAddButton ? 'Add' : 'Update'}
                  </Button>

                </DialogActions>
              </Grid>                    
            </Grid>
          </div>
        </DialogContent>
        
      </form>
      <DialogContent>     
        <div style={{ height: 250, width: '100%' , margin: '0px'}}>       
            <DataGrid
              rows={bumpTestData}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />        
        </div>
      </DialogContent>
      <NotificationBar
        hideLimit={3000}
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default BumpTestComponentModal;
