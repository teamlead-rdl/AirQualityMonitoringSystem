import {
  FormControlLabel, Switch, Menu, MenuItem, Divider, Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useUserAccess } from '../../../context/UserAccessProvider';

function SensorSettingsMenu(props) {
  const moduleAccess = useUserAccess()('devicelocation');
  const sensorId = props.sensorProperties.id;
  const [sensorStatus, setSensorStatus] = useState('0');
  const [notificationStatus, setNotificationStatus] = useState('0');
  const [hooterRelayStatus, setHooterRelayStatus] = useState('0');
  const [audioDecibelLevel, setAudioDecibelLevel] = useState('65');

  const handleCloseSensorOptions = () => {
    props.setPopperOpen(false);
  };

  useEffect(() => {
    setSensorStatus(props.sensorProperties.sensorStatus_u);
    setNotificationStatus(props.sensorProperties.notificationStatus_u);
    setHooterRelayStatus(props.sensorProperties.hooterRelayStatus_u);
    setAudioDecibelLevel(props.sensorProperties.audioDecibelLevel_u);
  }, [props]);

  const updateSensorStatus = () => {
    props.setSensorStatus((oldValue) => {
      const status = oldValue === '`0' ? '1' : '0';
      return status;
    });

    setSensorStatus((oldValue) => {
      const status = oldValue === '0' ? '1' : '0';
      return status;
    });

    props.updateService(sensorId, {
      ...props.sensorProperties,
      sensorStatus: sensorStatus === '0' ? '1' : '0',
    });
  };

  const updateSensorNotification = () => {
    props.setNotificationStatus((oldValue) => {
      const status = oldValue === '0' ? '1' : '0';
      return status;
    });

    setNotificationStatus((oldValue) => {
      const status = oldValue === '0' ? '1' : '0';
      return status;
    });

    props.updateService(sensorId, {
      ...props.sensorProperties,
      notificationStatus: notificationStatus === '0' ? '1' : '0',
    });
  };

  const updateHooterRelaystatus = () => {
    props.setHooterRelayStatus((oldValue) => {
      const status = oldValue === '0' ? '1' : '0';
      return status;
    });

    setHooterRelayStatus((oldValue) => {
      const status = oldValue === '0' ? '1' : '0';
      return status;
    });

    props.updateService(sensorId, {
      ...props.sensorProperties,
      hooterRelayStatus: hooterRelayStatus === '0' ? '1' : '0',
    });
  };

  const updateAudioDecibelLevel = (event) => {
    props.setAudioDecibelLevel(event.target.value);
    setAudioDecibelLevel(event.target.value);
    props.updateService(sensorId, {
      ...props.sensorProperties,
      audioDecibelLevel: event.target.value,
    });
  };

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.popperOpen}
      onClose={handleCloseSensorOptions}
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
          control={<Switch checked={sensorStatus !== '0'} onChange={updateSensorStatus} color="warning" />}
          label="Enabled"
        />
      </MenuItem>
      <MenuItem onClick={props.handleClose} disableRipple>
        <FormControlLabel
          control={<Switch checked={notificationStatus !== '0'} onChange={updateSensorNotification} color="warning" />}
          label="Notification"
        />
      </MenuItem>
      <MenuItem onClick={props.handleClose} disableRipple>
        <FormControlLabel
          control={<Switch checked={hooterRelayStatus !== '0'} onChange={updateHooterRelaystatus} color="warning" />}
          label="HooterRelay"
        />
      </MenuItem>
      <MenuItem onClick={props.handleClose} disableRipple>
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown />
            <Slider
              size="small"
              value={audioDecibelLevel}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={65}
              max={120}
              onChange={updateAudioDecibelLevel}
            />
            <VolumeUp />
          </Stack>
          <Typography sx={{ textAlign: 'center' }} id="input-slider" gutterBottom>
            Decibel Level
          </Typography>
        </Box>
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem disabled={moduleAccess.delete === false} onClick={() => props.deleteSensor(sensorId)} disableRipple>
        <Delete />
        {' '}
        Delete Sensor
      </MenuItem>
    </Menu>
  );
}

export default SensorSettingsMenu;
