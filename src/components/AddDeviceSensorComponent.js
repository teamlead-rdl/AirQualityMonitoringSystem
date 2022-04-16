import React,{useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Breadcrumbs, Container } from '@mui/material';
import AddDeviceListResults from "./Device/subComponent/AddDeviceListResults";
import HorizontalLinearStepper from "./Device/DeviceSensor";
import { Link, useLocation } from 'react-router-dom';
import SensorAdd from './Device/SensorAdd'
import { useUserAccess } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
} 

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
      
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DeviceListResults = () => {    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const routeStateObject = useLocation();
    const { location_id, branch_id, facility_id, building_id, floor_id, lab_id, buildingImg, floorMap} = routeStateObject.state;
    const labMap = routeStateObject.state.lab_map;
    const moduleAccess = useUserAccess()('devicelocation');
    const { locationLabel, branchLabel, facilityLabel, buildingLabel } = ApplicationStore().getStorage('siteDetails');
    
    var pathList = routeStateObject.pathname.split('/').filter(x => x);
    var pathname = pathList.map((data, index)=>{
      let path = data.replace("%20", " ");
      return(path)
    })
    return (
      <div className="container mx-auto" style={{marginTop:0, padding: 0}}>    
        <Container maxWidth={false} style={{padding:0}}>  
          <Box sx={{ width: '100%', marginBottom:'0', marginTop:0, padding:0 }} >
              <Breadcrumbs aria-label="breadcrumb" separator="›" style={{paddingTop:5, paddingLeft:15}}>
                <Link underline="hover" color="inherit" to="/Location">
                  Location
                </Link>
                {locationLabel ?
                 <Typography
                    underline="hover"
                    color="inherit"
                    >
                    {pathname[1]}
                  </Typography>
               :
                <Link
                  underline="hover"
                  color="inherit"
                  to={"/Location/"+pathname[1]}
                  state={{
                    location_id
                  }}
                  >
                  {pathname[1]}
                </Link>
                }
                {branchLabel?
                <Typography
                underline="hover"
                color="inherit"
                >
                {pathname[2]}
              </Typography>
                :
                <Link
                  underline="hover"
                  color="inherit"
                  to={"/Location/"+pathname[1]+"/"+pathname[2]}
                  state={{
                    location_id,
                    branch_id
                  }}
                  >
                  {pathname[2]}
                </Link>
                }
                <Link
                  underline="hover"
                  color="inherit"
                  to={"/Location/"+pathname[1]+"/"+pathname[2]+"/"+pathname[3]}
                  state={{
                    location_id,
                    branch_id,
                    facility_id
                  }}
                  >
                  {pathname[3]}
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  to={"/Location/"+pathname[1]+"/"+pathname[2]+"/"+pathname[3]+"/"+pathname[4]}
                  state={{
                    location_id,
                    branch_id,
                    facility_id,
                    building_id,
                    buildingImg
                  }}
                  >
                  {pathname[4]}
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  to={"/Location/"+pathname[1]+"/"+pathname[2]+"/"+pathname[3]+"/"+pathname[4]+"/"+pathname[5]}
                  state={{
                    location_id,
                    branch_id,
                    facility_id,
                    building_id,
                    floor_id,
                    buildingImg,
                    floorMap
                  }}
                  >
                  {pathname[5]}
                </Link>
                <Typography
                  underline="hover"
                  color="inherit"
                  >
                  {pathname[6]}
                </Typography>
              </Breadcrumbs>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Devices" {...a11yProps(0)} />
                  {moduleAccess.add && <Tab label="Add Devices" {...a11yProps(1)} /> }                  
                  {moduleAccess.add && <Tab label="Add Sensors" {...a11yProps(2)} /> }                  
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <AddDeviceListResults locationDetails={{location_id, branch_id, facility_id, building_id, floor_id, lab_id}} labMap={labMap}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <HorizontalLinearStepper locationDetails={{location_id, branch_id, facility_id, building_id, floor_id, lab_id}} labMap={labMap} setValue={setValue}/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <SensorAdd locationDetails={{location_id, branch_id, facility_id, building_id, floor_id, lab_id}} />
              </TabPanel>           
          </Box>
        </Container>
      </div>
    )
}

export default DeviceListResults