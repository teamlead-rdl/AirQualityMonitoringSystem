import './deviceWidget.scss';
import {
  Link,
  LinkOff,
  NotificationsActiveOutlined,
} from '@mui/icons-material';
import { Badge, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

function DeviceWidget({
  type, data, setLocationDetails, setBreadCrumbLabels, setIsDashBoard,
}) {
  
  const [modeColor, setModeColor] = useState('primary');
  const [alarmColor, setAlarmColor] = useState('primary');

  useEffect(()=>{
    if(data){
      switch(data.deviceMode){
        case 'enabled' : setModeColor('#1b5e20');
          break;
        case 'config' : setModeColor('#4a148c');
          break;
        case 'calibration' : setModeColor('#f57f17');
          break;
        case 'disabled' : setModeColor('#b71c1c');
          break;
        case 'bumpTest' : setModeColor('#01579b');
          break;
        case 'firmwareUpgradation' : setModeColor('#c2185b');
          break;
        default : break;
      }
    }
  },[]);

  const handleClick = () => {
    setLocationDetails((oldValue) => {
      return { ...oldValue, device_id: data.id };
    });
    setBreadCrumbLabels((oldvalue) => {
      return { ...oldvalue, deviceLabel: data.deviceName };
    });
    setIsDashBoard(1);
  };

  return (
    <div
      className="widget"
      onClick={() => {
        handleClick(data);
      }}
      style={{
        height: '200px', cursor: 'pointer', display: 'block', padding: 1,
      }}
    >
      <div
        className="left"
        style={{
          backgroundColor: data.deviceCategory === 'AQMII' ? '#dcedc8' : data.deviceCategory === 'AQMO' ? '#fff9c4' : '#ffccbc',
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
          alignContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', 
          alignContent: 'center', height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'stretch',
          alignItems: 'center' }}
        >
          <div>
            <span className="title" style={{ float: 'left', marginTop: 5, marginLeft: 5 }}>{data.deviceName}</span>
          </div>
          <div>
            <span
              className="counter"
              style={{
                float: 'right', marginRight: 5, fontWeight: 500, color: '#757575',
              }}
            >
              {data.deviceCategory}
            </span>
          </div>
        </div>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage" style={{ height: 150 }}>
          <div className="percentage positive" style={{ width: '35%', overflow: 'auto', display: 'block' }}>
            <div style={{ alignContent: 'center' }}>
              {data.deviceCategory === 'AQMII' ? <Link color="success" style={{ fontSize: '80px'}}/> : <LinkOff color="error" style={{ fontSize: '80px'}}/>}
              
            </div>
          </div>
          <div style={{ width: '65%', height: '100%' }}>
            <div style={{
              height: '80%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            >
              <Badge badgeContent={data.id} color="error" max={999}>
                <NotificationsActiveOutlined style={{ fontSize: 80 }} color="warning" />
              </Badge>
            </div>
            <div style={{ height: '20%', display: 'block' }}>
              <span>
                <Chip label={data.deviceMode}
                variant="outlined" 
                sx={{
                  color: modeColor,
                  borderColor: modeColor
                }} />
              </span>
            </div>
          </div>
        </div>
        {data.icon}
      </div>

    </div>
  );
}

export default DeviceWidget;
