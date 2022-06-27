import {
  Checkbox, DialogContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField,
} from '@mui/material';
import React from 'react';
import { AnalogSensorValidate } from '../../../validation/formValidation';
import { useUserAccess } from '../../../context/UserAccessProvider';

function Modbus({
  errorObject, setErrorObject, disable, units, setUnits, sensorType, setSensorType, minRatedReading, setMinRatedReading,
  minRatedReadingChecked, setMinRatedReadingChecked, minRatedReadingScale, setMinRatedReadingScale,
  maxRatedReading, setMaxRatedReading, maxRatedReadingChecked, setMaxRatedReadingChecked,
  maxRatedReadingScale, setMaxRatedReadingScale, slaveId, setSlaveId,
  registerId, setRegisterId, length, setLength, registerType, setRegisterType, conversionType,
  setConversionType, ipAddress, setIpAddress, subnetMask, setSubnetMask, relayOutput, setRelayOutput,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const validateForNullValue = (value, type) => {
    AnalogSensorValidate(value, type, setErrorObject);
  };
  return (
    <DialogContent sx={{ px: 0, p: 0 }}>
      <Grid container spacing={1}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={1.5}
          md={1.5}
          lg={1.5}
          xl={1.5}
        >
          <div className="rounded-md -space-y-px mt-2 ml-1">
            Output type :
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={2.5}
          md={2.5}
          lg={2.5}
          xl={2.5}
        >
          <div className="rounded-md -space-y-px">
            <FormControl className="float-left" disabled={disable || false}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={sensorType}
                onClick={(e) => {
                  setSensorType(e.target.value);
                }}
              >
                <FormControlLabel value="RTU" control={<Radio required />} label="RTU" />
                <FormControlLabel value="TCP" control={<Radio required />} label="TCP" />
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          container
          spacing={1}
          xs={12}
          sm={8}
          md={8}
          lg={8}
          xl={8}
        >
          {sensorType == 'TCP'
            ? (
              <>
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
                      value={ipAddress}
                      disabled={disable || false}
                      onBlur={() => validateForNullValue(ipAddress, 'ipAddress')}
                      onChange={(e) => {
                        setIpAddress(e.target.value);
                      }}
                      margin="normal"
                      required
                      id="outlined-required"
                      label="IP Address"
                      fullWidth
                      error={errorObject?.ipAddress?.errorStatus}
                      helperText={errorObject?.ipAddress?.helperText}
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
                      value={subnetMask}
                      disabled={disable || false}
                      onBlur={() => validateForNullValue(subnetMask, 'subnetMask')}
                      onChange={(e) => {
                        setSubnetMask(e.target.value);
                      }}
                      margin="normal"
                      required
                      id="outlined-required"
                      label="Subnet Mask"
                      fullWidth
                      error={errorObject?.subnetMask?.errorStatus}
                      helperText={errorObject?.subnetMask?.helperText}
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </>
            ) : ''}
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
              value={slaveId}
              disabled={disable || false}
              type="number"
              onBlur={() => validateForNullValue(slaveId, 'slaveId')}
              onChange={(e) => {
                setSlaveId(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Slave Id"
              fullWidth
              error={errorObject?.slaveId?.errorStatus}
              helperText={errorObject?.slaveId?.helperText}
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
              value={registerId}
              disabled={disable || false}
              type="number"
              onBlur={() => validateForNullValue(registerId, 'registerId')}
              onChange={(e) => {
                setRegisterId(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Register"
              fullWidth
              error={errorObject?.registerId?.errorStatus}
              helperText={errorObject?.registerId?.helperText}
              autoComplete="off"
            />
          </div>
        </Grid>

        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={1.5}
          md={1.5}
          lg={1.5}
          xl={1.5}
        >
          <div className="rounded-md -space-y-px mt-2 ml-3">
            Length :
          </div>
        </Grid>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={2.5}
          md={2.5}
          lg={2.5}
          xl={2.5}
        >
          <div className="rounded-md -space-y-px">
            <FormControl className="float-left" disabled={disable || false}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label2"
                name="row-radio-buttons-group-2"
                value={length}
                onClick={(e) => {
                  setLength(e.target.value);
                }}
              >
                <FormControlLabel value="16 Bit" control={<Radio required />} label="16 Bit" />
                <FormControlLabel value="32 Bit" control={<Radio required />} label="32 Bit" />
              </RadioGroup>
            </FormControl>
          </div>
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
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }} disabled={disable || false}>
            <InputLabel id="demo-simple-select-label">
              Register type
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={registerType}
              required
              label="Register Type"
              onChange={(e) => {
                setRegisterType(e.target.value);
              }}
            >
              <MenuItem value="Holding Register">Holding Register</MenuItem>
              <MenuItem value="Input Coil">Input Coil</MenuItem>
              <MenuItem value="Output Coil">Output Coil</MenuItem>
            </Select>
          </FormControl>
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
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }} disabled={disable || false}>
            <InputLabel id="demo-simple-select-label">
              Conversion Type
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={conversionType}
              label="Conversion Type"
              required
              onChange={(e) => {
                setConversionType(e.target.value);
              }}
            >
              <MenuItem value="Hex">Hex</MenuItem>
              <MenuItem value="Integer">Integer</MenuItem>
              <MenuItem value="Double">Double</MenuItem>
              <MenuItem value="Float">Float</MenuItem>
              <MenuItem value="ASCII">ASCII</MenuItem>
            </Select>
          </FormControl>
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
          <div className="rounded-md -space-y-px">
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                error={errorObject?.units?.errorStatus}
              >
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
              label="Minimum rated Reading"
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
          sm={0.5}
          md={0.5}
          lg={0.5}
          xl={1}
        >
          <div className="rounded-md -space-y-px flex">
            <Checkbox
              checked={minRatedReadingChecked != 0 || moduleAccess.edit === false && true}
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
          sm={3}
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
          <div className="rounded-md -space-y-px">
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
          sm={0.5}
          md={0.5}
          lg={0.5}
          xl={1}
        >
          <div className="rounded-md -space-y-px flex">
            <Checkbox
              checked={maxRatedReadingChecked != 0 || moduleAccess.edit === false && true}
              onChange={(e) => { setMaxRatedReadingChecked(e.target.checked); }}
            />
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
            <TextField
              sx={{ marginTop: 0 }}
              value={maxRatedReadingScale}
              disabled={maxRatedReadingChecked == 0 || moduleAccess.edit === false && true}
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

export default Modbus;
