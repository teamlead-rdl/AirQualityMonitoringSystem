import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MachineCard from './MachineCard';

function LayoutMachine({
  setOpen, analogSensorList, digitalSensorList, modbusSensorList, setSensorTagId,
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
                cardTitle={data.sensorNameUnit}
                actualValue={data.actualValue}
                plannedValue={data.plannedValue}
                capacityValue={data.capacityValue}
                reviewScore={data.reviewScore}
                color="#a5f3fc"
                setSensorTagId={setSensorTagId}
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
                cardTitle={data.cardTitle}
                actualValue={data.actualValue}
                plannedValue={data.plannedValue}
                capacityValue={data.capacityValue}
                reviewScore={data.reviewScore}
                color="#f5d0fe"
                setSensorTagId={setSensorTagId}
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
                cardTitle={data.cardTitle}
                actualValue={data.actualValue}
                plannedValue={data.plannedValue}
                capacityValue={data.capacityValue}
                reviewScore={data.reviewScore}
                color="#fecdd3"
                setSensorTagId={setSensorTagId}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default LayoutMachine;
