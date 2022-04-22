import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddDeviceListResults from '../components/Device/subComponent/AddDeviceListResults';
import HorizontalLinearStepper from '../components/Device/DeviceSensor';
import DeviceManagement from '../components/Device/categoryManagement/deviceCategory/DeviceComponent';
import AddSensorCategory from '../components/Device/categoryManagement/sensorCategory/SensorCategoryComponent';
import AddSensorComponent from '../components/Device/categoryManagement/addSensors/AddSensorComponent';
import ConfigSetupComponent from '../components/Device/deviceConfiguration/ConfigSetupComponent';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
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

function CategoryManagement() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const routeStateObject = useLocation();

  return (
    <div className="container mx-auto">
      <Container maxWidth={false} style={{ padding: 0 }}>
        <Box sx={{
          width: '100%', marginBottom: 0, marginTop: 0, padding: 0,
        }}
        >
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Config Setup" {...a11yProps(0)} />
              <Tab label="Device Category" {...a11yProps(1)} />
              <Tab label="Sensor Category" {...a11yProps(2)} />
              <Tab label="Add Sensor" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ConfigSetupComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DeviceManagement locationDetails={routeStateObject.state} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddSensorCategory />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AddSensorComponent />
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default CategoryManagement;
