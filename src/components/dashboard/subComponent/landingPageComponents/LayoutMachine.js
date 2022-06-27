import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MachineCard from './MachineCard';

function LayoutMachine({
  setOpen, analogSensorList, digitalSensorList, modbusSensorList, setSensorTagId,setSensorTag
}) {
  return (
    <Container>
      <Grid
        container
        spacing={3}
      >
        {analogSensorList.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={data.sensorTagId}>
              <MachineCard
                setOpen={setOpen}
                id={data.sensorTagId}
                sensorName={data.sensorTag}
                sensorNameUnit={data.sensorNameUnit}
                min={data.min}
                max={data.max}
                avg={data.avg}
                last={data.last}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color="#a5f3fc"                
              />
            </Grid>
          );
        })}
        {digitalSensorList.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={data.sensorTagId}>
              <MachineCard
               setOpen={setOpen}
               id={data.sensorTagId}
               sensorName={data.sensorTag}
               sensorNameUnit={data.sensorNameUnit}
               min={data.min}
               max={data.max}
               avg={data.avg}
               last={data.last}
               setSensorTagId={setSensorTagId}
               setSensorTag={setSensorTag}
                color="#f5d0fe"                
              />
            </Grid>
          );
        })}
        {modbusSensorList.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={data.sensorTagId}>
              <MachineCard
                setOpen={setOpen}
                id={data.sensorTagId}
                sensorName={data.sensorTag}
                sensorNameUnit={data.sensorNameUnit}
                min={data.min}
                max={data.max}
                avg={data.avg}
                last={data.last}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color="#fecdd3"
                
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default LayoutMachine;
