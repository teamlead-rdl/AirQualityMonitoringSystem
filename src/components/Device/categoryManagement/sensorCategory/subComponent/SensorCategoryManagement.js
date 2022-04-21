import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { CategoryListResults } from '../../deviceCategory/subComponent/category-list-results';
import { SensorList } from './SensorList';

function SensorCategoryManagement(props) {
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
        <SensorList />
      </Grid>
    </Container>
  );
}

export default SensorCategoryManagement;
