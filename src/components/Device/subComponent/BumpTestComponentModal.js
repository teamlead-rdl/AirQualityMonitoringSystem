import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

import { AddCategoryValidate } from '../../../validation/formValidation';
import { CategoryAddService, CategoryEditService } from '../../../services/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';

const columns = [
  { field: 'date', headerName: 'Date', width: 150 },  
  {
    field: 'result',
    headerName: 'Result',
    width: 500,
    editable: true,
  }   
];

const rows = [
  { id :1,  date: "22/07/2022", result: 'Sensor 1 is updated with bump Test'},
  { id :2, date: "22/07/2022", result: 'Sensor 2 is updated with bump Test'}, 
];

function BumpTestComponentModal({
  open, setOpen, isAddButton, setRefreshData,
}) {
  const [id, setId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setOpen(open);
    loadData();
  }, []);

  const loadData = () => {
    // setId(categoryData.id || '');
    // setCategoryName(categoryData.categoryName || '');
    // setCategoryDescription(categoryData.categoryDescription || '');
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
      await CategoryAddService({ categoryName, categoryDescription }, handleSuccess, handleException);
    } else {
      await CategoryEditService({ id, categoryName, categoryDescription }, handleSuccess, handleException);
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
              <FormControl fullWidth sx={{ mt: 1, padding: 0 }}>
                <InputLabel id="demo-simple-select-label">Deployed Sensors</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={accessType}
                  label="Access Type"
                  // onChange={(e) => {
                  //   setAccessType(e.target.value);
                  //   Reset(e.target.value);
                  // }}
                >
                  <MenuItem value="accessPoint">Sensor 1</MenuItem>
                  <MenuItem value="FTP">Sensor 2</MenuItem>
                </Select>
              </FormControl>
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
                  // value={sensorType}
                  // onClick={(e) => {
                  //   setSensorType(e.target.value);
                  // }}
                >
                  <FormControlLabel value="zeroCheck" control={<Radio required />} label="Zero Check" />
                  <FormControlLabel value="SpanCheck" control={<Radio required />} label="Span Check" />
                </RadioGroup>
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
                // label="Display Value"
                defaultValue=""
                fullWidth
                type="date"
                value={categoryName}
                required               
                // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                // onChange={(e) => { setCategoryName(e.target.value); }}
                autoComplete="off"
               // error={errorObject?.categoryName?.errorStatus}
               // helperText={errorObject?.categoryName?.helperText}
              />
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
                disabled
                value={categoryName}
                required
                // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                // onChange={(e) => { setCategoryName(e.target.value); }}
                autoComplete="off"
               // error={errorObject?.categoryName?.errorStatus}
               // helperText={errorObject?.categoryName?.helperText}
              />
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
               <TextField
                  sx={{ marginTop: 0 }}
                  // value={pollingPriority}
                  type="time"
                  // onBlur={() => validateForNullValue(pollingPriority, 'pollingPriority')}
                  // onChange={(e) => {
                  //   setPollingPriority(e.target.value);
                  // }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Polling Priority Value"
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
              sm={4}
              md={4}
              lg={4}
              xl={4}
            >
              <Button
                size="large"
                variant="outlined"
                autoFocus
                // onClick={(e) => {
                //   setOpen(false);
                //   setErrorObject({});
                //   loadData();
                // }}
              >
                Start
              </Button>
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
              lg={4}
              xl={4}
            >
              <TextField
                 sx={{ marginTop: 0 }}
                margin="dense"
                id="outlined-required"
                label="Display Value"
                defaultValue=""
                fullWidth
                value={categoryName}
                required
                disabled
                // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                // onChange={(e) => { setCategoryName(e.target.value); }}
                autoComplete="off"
               // error={errorObject?.categoryName?.errorStatus}
               // helperText={errorObject?.categoryName?.helperText}
              />
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
              <TextField
                 sx={{ marginTop: 0 }}
                margin="dense"
                id="outlined-required"
                label="Percentage Deviation"
                defaultValue=""
                fullWidth
                value={categoryName}
                required
                // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                // onChange={(e) => { setCategoryName(e.target.value); }}
                autoComplete="off"
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
              lg={4}
              xl={4}
            >
              <TextField
                 sx={{ marginTop: 0 }}
                margin="dense"
                id="outlined-required"
                // label="Display Value"
                defaultValue=""
                fullWidth
                type="date"
                value={categoryName}
                required               
                // onBlur={() => validateForNullValue(categoryName, 'categoryName')}
                // onChange={(e) => { setCategoryName(e.target.value); }}
                autoComplete="off"
               // error={errorObject?.categoryName?.errorStatus}
               // helperText={errorObject?.categoryName?.helperText}
              />
            </Grid>  
                    
          </Grid>
        </div>
          
         
        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>
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
      </form>
      <DialogContent>     
        <div style={{ height: 190, width: '100%' }}>       
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={2}
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
