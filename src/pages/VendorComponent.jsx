import React from 'react'
import { Box, Container } from '@mui/material';
import { VendorListResults } from '../components/Vendor/vendor-list-results';

const VendorManagementComponent = () => {
  return (
      <Container maxWidth={false}>
          <Box  sx={{ mt: 1 }} >
             <VendorListResults/>
          </Box>
      </Container>
  )
}
export default VendorManagementComponent