import {
  FormControlLabel, Switch, Menu, MenuItem, Divider,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';

function SensorSettingsMenu(props) {
  const sensorId = props.sensorProperties.id;
  const [sensorStatus, setSensorStatus] = useState(props.sensorProperties.sensorStatus);
  const [notificationStatus, setSensorNotificationStatus] = useState(props.sensorProperties.sensorNotificationStatus);

  const handleCloseSensorOptions = () => {
    props.setPopperOpen(false);
  };

  const updateSensorStatus = () => {
    setSensorStatus(!sensorStatus);
    props.updateService(sensorId, {
      ...props.sensorProperties,
      sensorStatus: !sensorStatus,
    });
  };

  const updateSensorNotification = () => {
    setSensorNotificationStatus(!notificationStatus);
    props.updateService(sensorId, {
      ...props.sensorProperties,
      notificationStatus: !notificationStatus,
    });
  };

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.popperOpen}
      onClose={handleCloseSensorOptions}
      // onClick={}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 16,
            width: 10,
            height: 10,
            bgcolor: 'grey',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={props.handleClose} disableRipple>
        <FormControlLabel
          control={<Switch checked={sensorStatus} onChange={updateSensorStatus} color="warning" />}
          label="Enabled"
        />
      </MenuItem>
      <MenuItem onClick={props.handleClose} disableRipple>
        <FormControlLabel
          control={<Switch checked={notificationStatus} onChange={updateSensorNotification} color="warning" />}
          label="Notification"
        />
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={() => props.deleteSensor(sensorId)} disableRipple>
        <Delete />
        {' '}
        Delete Sensor
      </MenuItem>
    </Menu>
  );
}

export default SensorSettingsMenu;
