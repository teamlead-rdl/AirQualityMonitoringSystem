import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid';
import { DashboardIndividualSensorDetails } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
function SensorGraphComponent({
  open, setOpen, sensorTagId, segretionInterval, setSegretionInterval, rangeInterval, setRangeInterval, sensorTag,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    DashboardIndividualSensorDetails({ sensorTagId, segretionInterval, rangeInterval }, handleSuccess, handleException);
  }, [sensorTagId, segretionInterval, rangeInterval]);

  const handleSuccess = (dataObject) => {
    setData(dataObject.data || []);
  };

  const handleException = () => {};

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        Graph Data
      </DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal" sx={{ marginTop: 2 }}>
              <TextField
                sx={{ marginTop: 0 }}
                margin="dense"
                id="outlined-required"
                label="Sensor Tag"
                defaultValue=""
                fullWidth
                type="text"
                disabled="true"
                value={sensorTag}
                autoComplete="off"
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth margin="normal" sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">Grouping Interval</InputLabel>
              <Select
                sx={{ marginTop: 0 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={segretionInterval}
                label="Grouping Interval"
                onChange={(e) => {
                  setSegretionInterval(e.target.value);
                }}
              >
                <MenuItem value="15">15 Min</MenuItem>
                <MenuItem value="30">30 Min</MenuItem>
                <MenuItem value="60">1 Hr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth margin="normal" sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">Last </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rangeInterval}
                label="Last"
                onChange={(e) => {
                  setRangeInterval(e.target.value);
                }}
              >
                <MenuItem value="30">30 Min</MenuItem>
                <MenuItem value="1*60">1 Hr</MenuItem>
                <MenuItem value="3*60">3 Hr</MenuItem>
                <MenuItem value="6*60">6 Hr</MenuItem>
                <MenuItem value="12*60">12 Hr</MenuItem>
                <MenuItem value="24*60">24 Hr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ height: 250 }}>
          
        </div>
        <Button
          sx={{ m: 1 }}
          size="large"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SensorGraphComponent;
