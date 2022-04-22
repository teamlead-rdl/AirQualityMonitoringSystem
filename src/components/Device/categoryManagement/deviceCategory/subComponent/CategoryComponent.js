import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { CategoryListResults } from './category-list-results';

function CategoryManagementComponent(props) {
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
        <CategoryListResults />
      </Grid>
    </Container>
  );
}

export default CategoryManagementComponent;
