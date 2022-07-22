import React from 'react';
import Grid from '@mui/material/Grid';
import MachineCard from './MachineCard';

function LayoutMachine({
  setOpen, analogSensorList, digitalSensorList, modbusSensorList, setSensorTagId, setSensorTag,
}) {
  return (
    <div
      style={{
        marginTop: 0,
        maxHeight: '65vh',
        overflow: 'auto',
      }}
    >
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
                alertColor={data.alertColor}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color={data.alertColor}
                lightColor={data.alertLightColor}
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
                alertColor={data.alertColor}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color={data.alertColor}
                lightColor={data.alertLightColor}
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
                alertColor={data.alertColor}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color={data.alertColor}
                lightColor={data.alertLightColor}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default LayoutMachine;
