import React from 'react';
// import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material';
import { LocationListResults } from './siteDetails/location/locationList';
import MapsComponent from './maps/googleMapsComponent';
import ImageMarkerComponent from './dashboard/imageMarker';
import { DeviceLocationListResults } from './siteDetails/deviceLocation/deviceLocationList';
import FloorPlan from '../images/departmentBlueprint.png';

function DeviceLocation(props) {
  return (
    <Container maxWidth={false} style={{ marginTop: props.marginTop || 60 }}>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 12, sm: 12, md: 12, lg: 12, xl: 12,
        }}
      >
        <Grid
          sx={{ mt: 1 }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <DeviceLocationListResults />
        </Grid>

        <Box
          component={Grid}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          display={{
            xs: 'none', sm: 'block', md: 'block', lg: 'block', lx: 'block',
          }}
          sx={{ mt: 0 }}
        >
          <div style={{
            width: `${99}%`, height: `${57}vh`, borderColor: 'black', border: `${2}px` + ' solid' + ' black', backgroundImage: `url(${FloorPlan})`,
          }}
          >
            {/* objectFit:'contain', backgroundPosition: 'center center', backgroundSize: 'cover',backgroundRepeat: 'no-repeat' */}
            <img
              src={FloorPlan}
              style={{ width: `${100}%`, height: `${100}%` }}
            />
          </div>
        </Box>
      </Grid>
    </Container>
  );
}

export default DeviceLocation;
