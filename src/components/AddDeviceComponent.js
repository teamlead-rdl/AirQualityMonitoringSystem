import React from 'react';
import { Container, Grid } from '@mui/material';
import AddDeviceListResults from './Device/subComponent/AddDeviceListResults';

function AddDevice() {
  return (
    <Container maxWidth={false}>
      <Grid
        sx={{ mt: 10 }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <AddDeviceListResults />
      </Grid>
    </Container>
  );
}

export default AddDevice;
