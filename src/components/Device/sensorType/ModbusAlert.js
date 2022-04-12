import { DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ModbusAlert = ({
  pollingIntervalType, setPollingIntervalType,
  criticalMinValue, setCriticalMinValue,
  criticalMaxValue, setCriticalMaxValue,
  criticalAlertType, setCriticalAlertType,
  criticalLowAlert, setCriticalLowAlert,
  criticalHighAlert, setCriticalHighAlert,

  warningMinValue, setWarningMinValue,
  warningMaxValue, setWarningMaxValue,
  warningAlertType, setWarningAlertType,
  warningLowAlert, setWarningLowAlert,
  warningHighAlert, setWarningHighAlert,

  outofrangeMinValue, setOutofrangeMinValue,                
  outofrangeMaxValue, setOutofrangeMaxValue,
  outofrangeAlertType, setOutofrangeAlertType,
  outofrangeLowAlert, setOutofrangeLowAlert,
  outofrangeHighAlert, setOutofrangeHighAlert
}) => {
  return (
    <DialogContent sx={{ px: 0, p: 0}}>
      <Grid container spacing={1} sx={{mt:1}}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
            <InputLabel id="demo-simple-select-label">
                        Polling Interval type
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={pollingIntervalType}
              label="Polling Interval type"                
              onChange={(e) => {
                setPollingIntervalType(e.target.value);                            
              }}
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText} 
            >
              <MenuItem value={'Priority'}>{'Priority'}</MenuItem>
              <MenuItem value={'NonPriority'}>{'Non Priority'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{mt:1}}>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className='float-left ml-2'>
                    Critical Alert :
          </div>
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
            <TextField
              sx={{marginTop:0}}
              value={criticalMinValue}
              // onBlur={() => validateForNullValue(alertTag, "alertTag")}
              onChange={(e) => {
                setCriticalMinValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Min Value"
              fullWidth
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText}
              autoComplete="off"
            />
          </div> 
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
            <TextField
              sx={{marginTop:0}}
              value={criticalMaxValue}
              // onBlur={() => validateForNullValue(alertTag, "alertTag")}
              onChange={(e) => {
                setCriticalMaxValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Max Value"
              fullWidth
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText}
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
          <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
            <InputLabel id="demo-simple-select-label">
                    Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={criticalAlertType}
              label="Sensor alert"                
              onChange={(e) => {
                setCriticalAlertType(e.target.value);                            
              }}
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText} 
            >
              <MenuItem value={'High'}>{'High'}</MenuItem>
              <MenuItem value={'Low'}>{'Low'}</MenuItem>
              <MenuItem value={'Both'}>{'Both'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}
          style={{float:'right'}}
        >

          {criticalAlertType == 'Low' || criticalAlertType == 'Both' ? 
            <Grid   
              sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
                  value={criticalLowAlert}
                  // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                  onChange={(e) => {
                    setCriticalLowAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Low alert message"
                  fullWidth
                  // error={errorObject?.deviceName?.errorStatus}
                  // helperText={errorObject?.deviceName?.helperText}
                  autoComplete="off"
                />
              </div> 
            </Grid>
            : ''}
          {criticalAlertType == 'Both' || criticalAlertType == 'High' ? 
            <Grid   
              sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
                  value={criticalHighAlert}
                  // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                  onChange={(e) => {
                    setCriticalHighAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="High alert message"
                  fullWidth
                  // error={errorObject?.deviceName?.errorStatus}
                  // helperText={errorObject?.deviceName?.helperText}
                  autoComplete="off"
                />
              </div> 
            </Grid> 
            : ''
          }
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
                    
          </div> 
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{mt:1}}>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className='float-left ml-2'>
                    Warning Alert :
          </div>
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
            <TextField
              sx={{marginTop:0}}
              value={warningMinValue}
              // onBlur={() => validateForNullValue(alertTag, "alertTag")}
              onChange={(e) => {
                setWarningMinValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Min Value"
              fullWidth
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText}
              autoComplete="off"
            />
          </div> 
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
            <TextField
              sx={{marginTop:0}}
              value={warningMaxValue}
              // onBlur={() => validateForNullValue(alertTag, "alertTag")}
              onChange={(e) => {
                setWarningMaxValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Max Value"
              fullWidth
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText}
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
          <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
            <InputLabel id="demo-simple-select-label">
                    Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={warningAlertType}
              label="Sensor alert"                
              onChange={(e) => {
                setWarningAlertType(e.target.value);                            
              }}
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText} 
            >
              <MenuItem value={'High'}>{'High'}</MenuItem>
              <MenuItem value={'Low'}>{'Low'}</MenuItem>
              <MenuItem value={'Both'}>{'Both'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}
          style={{float:'right'}}
        >

          {warningAlertType == 'Low' || warningAlertType == 'Both'? 
            <Grid   
              sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
                  value={warningLowAlert}
                  // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                  onChange={(e) => {
                    setWarningLowAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Low alert message"
                  fullWidth
                  // error={errorObject?.deviceName?.errorStatus}
                  // helperText={errorObject?.deviceName?.helperText}
                  autoComplete="off"
                />
              </div> 
            </Grid>
            : ''}
          {warningAlertType == 'High' || warningAlertType == 'Both'? 
            <Grid   
              sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
                  value={warningHighAlert}
                  // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                  onChange={(e) => {
                    setWarningHighAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="High alert message"
                  fullWidth
                  // error={errorObject?.deviceName?.errorStatus}
                  // helperText={errorObject?.deviceName?.helperText}
                  autoComplete="off"
                />
              </div> 
            </Grid> 
            : ''
          }
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
                    
          </div> 
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{mt:1}}>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className='float-left ml-2'>
                    Out-of-Range Alert :
          </div>
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
            <TextField
              sx={{marginTop:0}}
              value={outofrangeMinValue}
              // onBlur={() => validateForNullValue(alertTag, "alertTag")}
              onChange={(e) => {
                setOutofrangeMinValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Min Value"
              fullWidth
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText}
              autoComplete="off"
            />
          </div> 
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
            <TextField
              sx={{marginTop:0}}
              value={outofrangeMaxValue}
              // onBlur={() => validateForNullValue(alertTag, "alertTag")}
              onChange={(e) => {
                setOutofrangeMaxValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Max Value"
              fullWidth
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText}
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
          <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
            <InputLabel id="demo-simple-select-label">
                    Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={outofrangeAlertType}
              label="Sensor alert"                
              onChange={(e) => {
                setOutofrangeAlertType(e.target.value);                            
              }}
              // error={errorObject?.deviceName?.errorStatus}
              // helperText={errorObject?.deviceName?.helperText} 
            >
              <MenuItem value={'High'}>{'High'}</MenuItem>
              <MenuItem value={'Low'}>{'Low'}</MenuItem>
              <MenuItem value={'Both'}>{'Both'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}
          style={{float:'right'}}
        >
          {outofrangeAlertType == 'Low' || outofrangeAlertType == 'Both'? 
            <Grid   
              sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
                  value={outofrangeLowAlert}
                  // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                  onChange={(e) => {
                    setOutofrangeLowAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Low alert message"
                  fullWidth
                  // error={errorObject?.deviceName?.errorStatus}
                  // helperText={errorObject?.deviceName?.helperText}
                  autoComplete="off"
                />
              </div> 
            </Grid>
            : ''}
          {outofrangeAlertType == 'High' || outofrangeAlertType == 'Both'? 
            <Grid   
              sx={{ mt: 0, padding:0 }}
              item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className='rounded-md -space-y-px'>
                <TextField
                  sx={{marginTop:0}}
                  value={outofrangeHighAlert}
                  // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                  onChange={(e) => {
                    setOutofrangeHighAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="High alert message"
                  fullWidth
                  // error={errorObject?.deviceName?.errorStatus}
                  // helperText={errorObject?.deviceName?.helperText}
                  autoComplete="off"
                />
              </div> 
            </Grid> 
            : ''
          }

        </Grid>
        <Grid   
          sx={{ mt: 0, padding:0 }}
          item 
          xs={12} sm={6} md={6} lg={6} xl={6}>
          <div className='rounded-md -space-y-px'>
                    
          </div> 
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default ModbusAlert;