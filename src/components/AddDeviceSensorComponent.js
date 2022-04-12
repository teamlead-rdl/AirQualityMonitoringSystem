import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import AddDeviceListResults from './Device/subComponent/AddDeviceListResults';
import HorizontalLinearStepper from './Device/DeviceSensor';
import { useLocation } from 'react-router-dom';
import SensorAdd from './Device/SensorAdd';
import { useUserAccess } from '../context/UserAccessProvider';

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
  const { location_id, branch_id, facility_id, building_id, floor_id, lab_id } = routeStateObject.state;
  const labMap = routeStateObject.state.lab_map;
  const moduleAccess = useUserAccess()('devicelocation');
    
  return (
    <div className="container mx-auto" style={{marginTop:0, padding: 0}}>    
      <Container maxWidth={false} style={{padding:0}}>  
        <Box sx={{ width: '100%', marginBottom:'0', marginTop:0, padding:0 }} >
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
  );
};

export default DeviceListResults;