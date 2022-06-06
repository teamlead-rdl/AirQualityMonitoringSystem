import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MachineCard from './MachineCard';
import machineData from './MachineData';

const LayoutMachine = ({setOpen}) => {
    return (
        <Container>
            <Grid
                container
                spacing={3}
            >
                {machineData.map((machineItem, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <MachineCard setOpen={setOpen} key={index} id={machineItem.id} sensorName={machineItem.sensorName} cardTitle={machineItem.cardTitle} actualValue={machineItem.actualValue} plannedValue={machineItem.plannedValue} capacityValue={machineItem.capacityValue} reviewScore={machineItem.reviewScore} />
                        </Grid>);
                })}

            </Grid>
        </Container>
    )
}

export default LayoutMachine