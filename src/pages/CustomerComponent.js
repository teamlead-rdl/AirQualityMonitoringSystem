import React from 'react';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';

function CustomerManagementComponent(props) {
  return (
    <Container maxWidth={false} style={{ marginTop: 0 }}>
      <Box sx={{ mt: 1 }}>
        <CustomerListResults />
      </Box>
    </Container>
  );
}

export default CustomerManagementComponent;
