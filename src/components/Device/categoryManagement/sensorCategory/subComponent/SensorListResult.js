import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeviceLocation from '../../../../DeviceLocationComponent';
import { Container } from '@mui/material';
import CategoryManagementComponent from '../../deviceCategory/subComponent/CategoryComponent';
import SensorCategoryManagement from './SensorCategoryManagement';

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

const SensorListResult = () => {    

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
      
  return (
    <div className="container mx-auto" style={{marginTop:0, padding: 0}}> 
      <Container maxWidth={false} style={{padding:0, marginTop:0}}>  
        <SensorCategoryManagement />
      </Container>
    </div>
  );
};

export default SensorListResult;