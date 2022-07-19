import {
  Grid, TextField,
} from '@mui/material';
import React from 'react';
import { useUserAccess } from '../../../../../context/UserAccessProvider';
import { AnalogSensorValidate } from '../../../../../validation/formValidation';

function SensorAlertRange({
  errorObject, setErrorObject,
  criticalMinValue, setCriticalMinValue,
  criticalMaxValue, setCriticalMaxValue,

  warningMinValue, setWarningMinValue,
  warningMaxValue, setWarningMaxValue,

  outofrangeMinValue, setOutofrangeMinValue,
  outofrangeMaxValue, setOutofrangeMaxValue,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const validateForNullValue = (value, type) => {
    AnalogSensorValidate(value, type, setErrorObject);
  };

  return (
    <Grid sx={{ px: 0, p: 0 }}>
      <Grid container spacing={1} sx={{ mt: 1 }} />
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <div className="float-left ml-2">
            Critical Alert :
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
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={criticalMinValue}
              disabled={moduleAccess.edit === false && true}
              type="number"
              onBlur={() => validateForNullValue(criticalMinValue, 'criticalMinValue')}
              onChange={(e) => {
                setCriticalMinValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Min Value"
              fullWidth
              error={errorObject?.criticalMinValue?.errorStatus}
              helperText={errorObject?.criticalMinValue?.helperText}
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
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={criticalMaxValue}
              type="number"
              disabled={moduleAccess.edit === false && true}
              onBlur={() => validateForNullValue(criticalMaxValue, 'criticalMaxValue')}
              onChange={(e) => {
                setCriticalMaxValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Max Value"
              fullWidth
              error={errorObject?.criticalMaxValue?.errorStatus}
              helperText={errorObject?.criticalMaxValue?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <div className="float-left ml-2">
            Warning Alert :
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
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={warningMinValue}
              type="number"
              disabled={moduleAccess.edit === false && true}
              onBlur={() => validateForNullValue(warningMinValue, 'warningMinValue')}
              onChange={(e) => {
                setWarningMinValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Min Value"
              fullWidth
              error={errorObject?.warningMinValue?.errorStatus}
              helperText={errorObject?.warningMinValue?.helperText}
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
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={warningMaxValue}
              type="number"
              disabled={moduleAccess.edit === false && true}
              onBlur={() => validateForNullValue(warningMaxValue, 'warningMaxValue')}
              onChange={(e) => {
                setWarningMaxValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Max Value"
              fullWidth
              error={errorObject?.warningMaxValue?.errorStatus}
              helperText={errorObject?.warningMaxValue?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <div className="float-left ml-2">
            Out-of-Range Alert :
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
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={outofrangeMinValue}
              type="number"
              disabled={moduleAccess.edit === false && true}
              onBlur={() => validateForNullValue(outofrangeMinValue, 'outofrangeMinValue')}
              onChange={(e) => {
                setOutofrangeMinValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Min Value"
              fullWidth
              error={errorObject?.outofrangeMinValue?.errorStatus}
              helperText={errorObject?.outofrangeMinValue?.helperText}
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
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={outofrangeMaxValue}
              type="number"
              disabled={moduleAccess.edit === false && true}
              onBlur={() => validateForNullValue(outofrangeMaxValue, 'outofrangeMaxValue')}
              onChange={(e) => {
                setOutofrangeMaxValue(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Max Value"
              fullWidth
              error={errorObject?.outofrangeMaxValue?.errorStatus}
              helperText={errorObject?.outofrangeMaxValue?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SensorAlertRange;
