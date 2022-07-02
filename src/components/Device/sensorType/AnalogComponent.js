import {
  Checkbox, DialogContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField,
} from '@mui/material';
import React from 'react';
import { AnalogSensorValidate } from '../../../validation/formValidation';
import { useUserAccess } from '../../../context/UserAccessProvider';

function Analog({
  errorObject, setErrorObject, disable, units, setUnits, minRatedReading, setMinRatedReading, sensorType, setSensorType,
  minRatedReadingChecked, setMinRatedReadingChecked,
  minRatedReadingScale, setMinRatedReadingScale,
  maxRatedReading, setMaxRatedReading,
  maxRatedReadingChecked, setMaxRatedReadingChecked,
  maxRatedReadingScale, setMaxRatedReadingScale, relayOutput, setRelayOutput,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const validateForNullValue = (value, type) => {
    // validating
    AnalogSensorValidate(value, type, setErrorObject);
  };
  return (
    <DialogContent sx={{ px: 0, p: 0 }}>
      <Grid container spacing={1}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={2}
          md={2}
          lg={2}
          xl={2}
        >
          <div className="rounded-md -space-y-px mt-2 ml-3">
            Output type :
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={10}
          md={10}
          lg={10}
          xl={10}
        >
          <div className="rounded-md -space-y-px">
            <FormControl className="float-left" disabled={disable || false} required>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={sensorType}
                onChange={(e) => {
                  setSensorType(e.target.value);
                }}
              >
                <FormControlLabel value="4-20v" control={<Radio required />} label="4-20mA" />
                <FormControlLabel value="0-10v" control={<Radio required />} label="0-10v" />
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>

        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={6}
          sm={3}
          md={3}
          lg={3}
          xl={3}
        >
          <div className="rounded-md -space-y-px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" error={errorObject?.units?.errorStatus}>
                Units
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Units"
                required
                disabled={disable || false}
                value={units}
                onChange={(e) => {
                  setUnits(e.target.value);
                }}
                onBlur={() => validateForNullValue(units, 'units')}
                error={errorObject?.units?.errorStatus}
                helperText={errorObject?.units?.helperText}
              >
                <MenuItem value="ppb">ppb</MenuItem>
                <MenuItem value="ppm">ppm</MenuItem>
                <MenuItem value="µg/m3">µg/m3</MenuItem>
                <MenuItem value="mg/m3">mg/m3</MenuItem>
                <MenuItem value="%vol">%vol</MenuItem>
                <MenuItem value="mmHg">mmHg</MenuItem>
                <MenuItem value="Pa">Pa</MenuItem>
                <MenuItem value="Bar">Bar</MenuItem>
                <MenuItem value="°C">°C</MenuItem>
                <MenuItem value="°F">°F</MenuItem>
                <MenuItem value="CFM">CFM</MenuItem>
                <MenuItem value="mm">mm</MenuItem>
                <MenuItem value="m/s">m/s</MenuItem>
                <MenuItem value="degree">degree</MenuItem>
                <MenuItem value="W/mt2">W/mt2</MenuItem>
                <MenuItem value="m">m</MenuItem>
                <MenuItem value="psi">psi</MenuItem>
                <MenuItem value="%">%</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={5.5}
          md={5.5}
          lg={5.5}
          xl={5.5}
        >
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={minRatedReading}
              disabled={disable || false}
              type="number"
              onBlur={() => validateForNullValue(minRatedReading, 'minRatedReading')}
              onChange={(e) => {
                setMinRatedReading(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Minimum Rated Reading"
              fullWidth
              error={errorObject?.minRatedReading?.errorStatus}
              helperText={errorObject?.minRatedReading?.helperText}
              autoComplete="off"
            />
          </div>

        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0, alignSelf: 'center' }}
          item
          xs={12}
          sm={1}
          md={0.5}
          lg={0.5}
          xl={1}
        >
          <div className="rounded-md -space-y-px flex">
            <Checkbox
              checked={minRatedReadingChecked != 0}
              disabled={moduleAccess.edit === false && true}
              onChange={(e) => {
                setMinRatedReadingChecked(e.target.checked);
              }}
            />
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={6}
          sm={2.5}
          md={3}
          lg={3}
          xl={3}
        >
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={minRatedReadingScale}
              disabled={minRatedReadingChecked == 0 || moduleAccess.edit === false && true}
              type="number"
              onBlur={() => validateForNullValue(minRatedReadingScale, 'minRatedReadingScale')}
              onChange={(e) => {
                setMinRatedReadingScale(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Scale"
              fullWidth
              error={errorObject?.minRatedReadingScale?.errorStatus}
              helperText={errorObject?.minRatedReadingScale?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
        >
          {/* <div className="rounded-md -space-y-px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Relay Output</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Relay Output"
                disabled={disable || false}
                value={relayOutput}
                onChange={(e) => {
                  setRelayOutput(e.target.value);
                }}
              >
                <MenuItem value="ON">On</MenuItem>
                <MenuItem value="OFF">Off</MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={5.5}
          md={5.5}
          lg={5.5}
          xl={5.5}
        >
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={maxRatedReading}
              disabled={disable || false}
              type="number"
              onBlur={() => validateForNullValue(maxRatedReading, 'maxRatedReading')}
              onChange={(e) => {
                setMaxRatedReading(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Maximum Rated Reading"
              fullWidth
              error={errorObject?.maxRatedReading?.errorStatus}
              helperText={errorObject?.maxRatedReading?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0, alignSelf: 'center' }}
          item
          xs={12}
          sm={1}
          md={0.5}
          lg={0.5}
          xl={1}
        >
          <div className="rounded-md -space-y-px flex">
            <Checkbox
              checked={maxRatedReadingChecked != 0}
              disabled={moduleAccess.edit === false && true}
              onChange={(e) => {
                setMaxRatedReadingChecked(e.target.checked);
              }}
            />
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={6}
          sm={2.5}
          md={3}
          lg={3}
          xl={3}
        >
          <div className="rounded-md -space-y-px">
            <TextField
              sx={{ marginTop: 0 }}
              value={maxRatedReadingScale}
              disabled={maxRatedReadingChecked == 0 || moduleAccess.edit === false && true}
              type="number"
              onBlur={() => validateForNullValue(maxRatedReadingScale, 'maxRatedReadingScale')}
              onChange={(e) => {
                setMaxRatedReadingScale(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Scale"
              fullWidth
              error={errorObject?.maxRatedReadingScale?.errorStatus}
              helperText={errorObject?.maxRatedReadingScale?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default Analog;
