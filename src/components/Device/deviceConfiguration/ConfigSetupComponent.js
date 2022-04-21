import React from 'react';
import { Box, Container } from '@mui/material';
import { ConfigSetupListResults } from './subcomponent/ConfigSetupListResults';

function ConfigSetupComponent(props) {
  return (
    <Container maxWidth={false} style={{ marginTop: 0 }}>
      <Box sx={{ mt: 0 }}>
        <ConfigSetupListResults />
      </Box>
    </Container>
  );
}

export default ConfigSetupComponent;
