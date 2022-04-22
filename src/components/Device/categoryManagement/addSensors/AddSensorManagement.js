import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { AddSensorList } from './subComponent/AddSensorList';

function AddSensorManagement(props) {
  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <Grid
        sx={{ marginTop: 0, padding: 0 }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <AddSensorList />
      </Grid>
    </Container>
  );
}

export default AddSensorManagement;
