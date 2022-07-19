import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, Typography, MenuItem, Select,
  TextField, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { AddCategoryValidate } from '../../../validation/formValidation';
import { BumpTestAddService, BumpTestFetchService, ChangeDeviceMode } from '../../../services/LoginPageService';
import { BumpTestData } from '../../../services/BumpTestServicePage';
import NotificationBar from '../../notification/ServiceNotificationBar';
/* eslint-disable no-plusplus */

const columns = [
  {
    field: 'calibrationDate',
    headerName: ' BumpTest Date',
    width: 150,
    renderCell: (params) => (
      <Typography>
        {
          new Date(params.value).toLocaleDateString()
        }
      </Typography>
    ),
  },
  {
    field: 'typeCheck',
    headerName: 'Type check',
    width: 150,
  },
  {
    field: 'displayedValue',
    headerName: ' Displayed Value',
    width: 150,
  },
  {
    field: 'result',
    headerName: 'Result',
    width: 500,
    editable: true,
    renderCell: (params) => (
      <Typography sx={{ color: params.value === 'Pass' ? 'green' : 'red' }}>
        {params.value}
      </Typography>
    ),
  },
];
/* eslint-disable-next-line */
function BumpTestComponentModal({
  open, setOpen, isAddButton, setRefreshData, deployedSensorTagList, device_id,
}) {
  const [sensorTagName, setSensorTagName] = useState('');
  const [lastDueDate, setLastDueDate] = useState('');
  const [typeCheck, setTypeCheck] = useState('zeroCheck');
  const [percentageConcentrationGas, setPercentrationConcentrationGas] = useState(0);
  const [durationPeriod, setDurationPeriod] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');
  const [percentageDeviation, setPercentageDeviation] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [result, setResult] = useState('');
  const [deployedSensorList, setDeployedSensorList] = useState([]);
  const [bumpTestData, setBumpTestData] = useState([]);
  let i = 0;
  let j = 0;
  /* eslint-disable-next-line */
  const [errorObject, setErrorObject] = useState({});
  const [bumpData, setBumpData] = useState([]);
  const [inputDisable, setInputDisable] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    loadData();
  }, [deployedSensorTagList]);

  const loadData = () => {
    setDeployedSensorList(deployedSensorTagList || []);
  };

  const reset = () => {
    setSensorTagName('');
    setLastDueDate('');
    setTypeCheck('zeroCheck');
    setPercentrationConcentrationGas(0);
    setDurationPeriod('');
    setDisplayedValue('');
    setPercentageDeviation('');
    setNextDueDate('');
    setResult('');
    setDeployedSensorList([]);
    setBumpTestData([]);
    setErrorObject({});
    setBumpData([]);
  };

  const getBumpData = (e) => {
    e.preventDefault();
    setBumpData([]);
    setInputDisable(true);
    ChangeDeviceMode({ id: device_id, deviceMode: 'bumpTest' }, modeChangeHandleSuccess, modeChangeHandleException);
  };

  const modeChangeHandleException = () => { };

  const modeChangeHandleSuccess = () => {
    setRefreshData((oldvalue) => !oldvalue);
    const DurationSec = durationPeriod;
    /* eslint-disable-next-line */
    const myVar = setInterval(()=>{
      bumpTestDataCall();
    }, 2000);
    /* eslint-disable-next-line */
    const callCount = parseInt(DurationSec / 2);
    let count = 0;
    let dataCount = 0;

    function bumpTestDataCall() {
      if (i === j) {
        i++;
        BumpTestData({ sensorTagName }, getBumpTestDataSuccess, getBumpTestDataHandleException);
        if (count === callCount) {
          setInputDisable(false);
          clearInterval(myVar);
          /* eslint-disable-next-line */
          const dataList = bumpData.length;
          let tot = 0;
          let pcgValPowOfTwo = 0;
          /* eslint-disable-next-line */
          for (let i = 0; i < dataList; i++) {
            if (bumpData[i] !== 'NA') {
              let pcgVal = 0;
              /* eslint-disable-next-line */
              pcgVal = parseInt(Number(percentageConcentrationGas)) - parseInt(bumpData[i]);
              pcgValPowOfTwo = pcgVal * pcgVal;
              tot += pcgValPowOfTwo;
              /* eslint-disable-next-line */
              dataCount++;
            }
          }
          if (dataCount < 3) {
            setPercentageDeviation('NA');
          } else {
            let avg = 0;
            avg = tot / dataList;
            setPercentageDeviation(Math.sqrt(avg));
          }
          enableDeviceMode(device_id);
        }
        /* eslint-disable-next-line */
        count++;
      }
    }
  };

  const enableDeviceMode = (id) => {
    ChangeDeviceMode({ id, deviceMode: 'enabled' }, modeHandleSuccess, modeChangeHandleException);
  };
  const modeHandleSuccess = () => {
    setRefreshData((oldvalue) => !oldvalue);
  };

  /* eslint-disable-next-line */
  const getBumpTestResultData = (data) => {
    setLastDueDate('');
    setTypeCheck('zeroCheck');
    setPercentrationConcentrationGas('');
    setDurationPeriod('');
    setDisplayedValue('');
    setPercentageDeviation('');
    setNextDueDate('');
    setResult('');
    setBumpTestData([]);
    setErrorObject({});
    setBumpData([]);
    BumpTestFetchService({ sensorTagName: data }, getBumpTestResultDataSuccess, getBumpTestResultDataHandleException);
  };

  const getBumpTestResultDataSuccess = (dataObject) => {
    if (dataObject.nextDueDate === '') {
      setLastDueDate('');
      setBumpTestData([]);
    } else {
      setLastDueDate(new Date(dataObject.nextDueDate).toLocaleDateString());
      setBumpTestData(dataObject.data);
    }
  };
  /* eslint-disable-next-line */
  const getBumpTestResultDataHandleException = (dataObject, errorObject) => {    
  };

  const getBumpTestDataSuccess = (dataObject) => {
    j++;
    setDisplayedValue(dataObject.data.LAST);
    bumpData.push(dataObject.data.LAST);
  };
  /* eslint-disable-next-line */
  const getBumpTestDataHandleException = (dataObject, errorObject) => {
  };
  /* eslint-disable-next-line */
  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      await BumpTestAddService({
        sensorTagName, lastDueDate, typeCheck, percentageConcentrationGas, durationPeriod, displayedValue, nextDueDate, result,
      }, handleSuccess, handleException);
    }
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };
  /* eslint-disable-next-line */
  const handleException = (errorObject, errorMessage) => {
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

  const onCancel = () => {
    ChangeDeviceMode({ id: device_id, deviceMode: 'enabled' }, cancelHandleSuccess, modeChangeHandleException);
  };
  const cancelHandleSuccess = () => {
    setRefreshData((oldvalue) => !oldvalue);
    setOpen(false);
    setErrorObject({});
    loadData();
    reset();
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
                    }}
                  >
                    {/* eslint-disable-next-line */}
                    {deployedSensorList.map((data, index) => (
                      /* eslint-disable-next-line */
                      <MenuItem value={data.sensorTag} key={index}>{data.sensorTag}</MenuItem>
                    ))}
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
                  label="Next Due Date"
                  defaultValue=""
                  fullWidth
                  type="text"
                  disabled="true"
                  value={lastDueDate}
                  required
                  onChange={(e) => { setLastDueDate(e.target.value); }}
                  autoComplete="off"
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
                <FormControl className="float-left">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={typeCheck}
                    onClick={(e) => {
                      setTypeCheck(e.target.value);
                      setPercentrationConcentrationGas(e.target.value === 'zeroCheck' ? 0 : '');
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
                  disabled={typeCheck === 'zeroCheck'}
                  value={typeCheck === 'zeroCheck' ? 0 : percentageConcentrationGas}
                  required
                  onChange={(e) => { setPercentrationConcentrationGas(e.target.value); }}
                  autoComplete="off"
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
                <h3>
                  Display Value:
                  <b>
                    {' '}
                    {displayedValue}
                  </b>
                </h3>
                <h3>
                  Percentage Deviation:
                  <b>{percentageDeviation}</b>
                </h3>
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
                  disabled={inputDisable === true}
                  required
                  value={nextDueDate}
                  onChange={(e) => { setNextDueDate(e.target.value); }}
                  autoComplete="off"
                  InputLabelProps={{ shrink: true }}
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
                    autoFocus
                    /* eslint-disable-next-line */
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={inputDisable === true}
                    size="large"
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
        <div style={{
          height: 250,
          width: '100%',
          margin: '0px',
          '& .super-app.Pass': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
        >
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
