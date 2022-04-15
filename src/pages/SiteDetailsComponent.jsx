import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Breadcrumbs, Container, Typography } from '@mui/material'
import { LocationListResults } from '../components/siteDetails/location/locationList';
import MapsMultiplePoints from '../components/maps/mapsMultiplePoints';
import ApplicationStore from '../utils/localStorageUtil';

const SiteDetails = () => {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    const { locationLabel, branchLabel, facilityLabel, buildingLabel } = ApplicationStore().getStorage('siteDetails');
    const { location_id, branch_id, facility_id } = locationDetails;
    
    if(facility_id) {
      return navigate(`${locationLabel}/${branchLabel}/${facilityLabel}`, { state: {location_id, branch_id, facility_id}}); 
    } else if(branch_id) {
      return navigate(`${locationLabel}/${branchLabel}`, { state: { location_id, branch_id }}); 
    } else if(location_id) {
      return navigate(`${locationLabel}`, { state: { location_id }}); 
    }
  }, []);

  return (
    <Container maxWidth={false} style={{marginTop:0}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography underline="hover" color="inherit" >
          Location
        </Typography>
      </Breadcrumbs>
      <Grid item sx={{ mt: 1 }}  xs={12} sm={12} md={12} lg={12} xl={12}>
        <LocationListResults setLocationCoordinationList={setLocationCoordinationList}/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <MapsMultiplePoints 
          width="100%"
          height="50vh"
          markers={locationCoordinationList}
          zoom={4}
          center={{ lat: 21.17295268645021, lng: 72.83259344505929 }}
        />
      </Grid>
    </Container>
  )
}

export default SiteDetails