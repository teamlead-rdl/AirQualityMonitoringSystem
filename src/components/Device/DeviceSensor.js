import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeviceAdd from './DeviceAdd';
import SensorAdd from './SensorAdd';
import { Grid } from '@mui/material';
const steps = ['Add Device', 'Add Sensor'];

export default function HorizontalLinearStepper({ labMap, locationDetails, setValue }) {
  
  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        sx={{ mt: 0, padding: 0 }}
        item
        xs={12} sm={12} md={12} lg={12} xl={12}
      >
        {/* {activeStep === steps.length - 1 ? <SensorAdd locationDetails={locationDetails}/> :  */}
        <DeviceAdd locationDetails={locationDetails} labMap={labMap}/>
        {/* } */}
      </Grid>
    </Box>
  );
}
