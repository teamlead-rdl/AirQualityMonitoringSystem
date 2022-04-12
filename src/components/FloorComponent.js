import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FloorListResults } from './siteDetails/floor/floorList';
import { Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Floor = () => {
  const routeStateObject = useLocation();
  const { buildingImg } = routeStateObject.state;
  let imgSrc = 'http://varmatrix.com/Aqms/blog/public/'+ buildingImg;
  return (
    <Container maxWidth={false} style={{marginTop:0}}>
      <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <Grid 
          sx={{ mt: 1 }}
          item 
          xs={11} sm={11} md={8} lg={8} xl={8}>
          <FloorListResults img = {imgSrc} />
        </Grid>
        
        <Box component={Grid}
          item 
          xs={2} sm={6} md={4} lg={4} xl={4}
          display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', lx: 'block' }}
          sx={{mt:2}}
        >
          <img 
            src = {imgSrc}
            style={{width:99+'%', height:56+'vh'}}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default Floor;