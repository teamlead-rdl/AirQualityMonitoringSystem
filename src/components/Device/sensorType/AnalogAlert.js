import {
  DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { AddCategoryValidate, AnalogSensorValidate } from '../../../validation/formValidation';
import { useUserAccess } from '../../../context/UserAccessProvider';

function AnalogAlert({
  errorObject, setErrorObject,
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
  outofrangeHighAlert, setOutofrangeHighAlert,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const validateForNullValue = (value, type) => {
    AnalogSensorValidate(value, type, setErrorObject);
  };
  return (
    <DialogContent sx={{ px: 0, p: 0 }}>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }} disabled={moduleAccess.edit === false && true}>
            <InputLabel id="demo-simple-select-label">
              Polling Interval type
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={pollingIntervalType}
              required
              label="Polling Interval type"
              onChange={(e) => {
                setPollingIntervalType(e.target.value);
              }}
            >
              <MenuItem value="Priority">Priority</MenuItem>
              <MenuItem value="NonPriority">Non Priority</MenuItem>
            </Select>
          </FormControl>
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
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }} disabled={moduleAccess.edit === false && true}>
            <InputLabel id="demo-simple-select-label">
              Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={criticalAlertType}
              required
              label="Sensor alert"
              onChange={(e) => {
                setCriticalAlertType(e.target.value);
                setCriticalMinValue('');
                setCriticalMaxValue('');
              }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={{ float: 'right' }}
        >

          {criticalAlertType == 'Low' || criticalAlertType == 'Both'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={criticalLowAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(criticalLowAlert, 'criticalLowAlert')}
                    onChange={(e) => {
                      setCriticalLowAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="Low alert message"
                    fullWidth
                    error={errorObject?.criticalLowAlert?.errorStatus}
                    helperText={errorObject?.criticalLowAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}
          {criticalAlertType == 'Both' || criticalAlertType == 'High'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={criticalHighAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(criticalHighAlert, 'criticalHighAlert')}
                    onChange={(e) => {
                      setCriticalHighAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="High alert message"
                    fullWidth
                    error={errorObject?.criticalHighAlert?.errorStatus}
                    helperText={errorObject?.criticalHighAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}
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
              disabled={criticalAlertType === "High" || criticalAlertType === "" || moduleAccess.edit === false && true}
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
              disabled={criticalAlertType === "Low" || criticalAlertType === "" || moduleAccess.edit === false && true}
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
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
            <InputLabel id="demo-simple-select-label">
              Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={warningAlertType}
              label="Sensor alert"
              disabled={moduleAccess.edit === false && true}
              required
              onChange={(e) => {
                setWarningAlertType(e.target.value);
                setWarningMinValue("");
                setWarningMaxValue("");
              }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={{ float: 'right' }}
        >

          {warningAlertType == 'Low' || warningAlertType == 'Both'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={warningLowAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(warningLowAlert, 'warningLowAlert')}
                    onChange={(e) => {
                      setWarningLowAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="Low alert message"
                    fullWidth
                    error={errorObject?.warningLowAlert?.errorStatus}
                    helperText={errorObject?.warningLowAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}
          {warningAlertType == 'High' || warningAlertType == 'Both'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={warningHighAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(warningHighAlert, 'warningHighAlert')}
                    onChange={(e) => {
                      setWarningHighAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="High alert message"
                    fullWidth
                    error={errorObject?.warningHighAlert?.errorStatus}
                    helperText={errorObject?.warningHighAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}
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
              disabled={warningAlertType === "High" || warningAlertType === "" || moduleAccess.edit === false && true }
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
              disabled={warningAlertType === "Low" || warningAlertType === "" || moduleAccess.edit === false && true}
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
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
            <InputLabel id="demo-simple-select-label">
              Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={outofrangeAlertType}
              disabled={moduleAccess.edit === false && true}
              required
              label="Sensor alert"
              onChange={(e) => {
                setOutofrangeAlertType(e.target.value);
                setOutofrangeMaxValue('');
                setOutofrangeMinValue('');
              }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={{ float: 'right' }}
        >
          {outofrangeAlertType == 'Low' || outofrangeAlertType == 'Both'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={outofrangeLowAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(outofrangeLowAlert, 'outofrangeLowAlert')}
                    onChange={(e) => {
                      setOutofrangeLowAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="Low alert message"
                    fullWidth
                    error={errorObject?.outofrangeLowAlert?.errorStatus}
                    helperText={errorObject?.outofrangeLowAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}
          {outofrangeAlertType == 'High' || outofrangeAlertType == 'Both'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={outofrangeHighAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(outofrangeHighAlert, 'outofrangeHighAlert')}
                    onChange={(e) => {
                      setOutofrangeHighAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="High alert message"
                    fullWidth
                    error={errorObject?.outofrangeHighAlert?.errorStatus}
                    helperText={errorObject?.outofrangeHighAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}

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
              disabled={outofrangeAlertType === "High" || outofrangeAlertType === "" || moduleAccess.edit === false && true}
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
              disabled={outofrangeAlertType === "Low" || outofrangeAlertType === "" || moduleAccess.edit === false && true}
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
    </DialogContent>
  );
}

export default AnalogAlert;
