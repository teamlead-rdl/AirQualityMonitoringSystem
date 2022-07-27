import './widget.scss';
import {
  KeyboardArrowUp,
  Groups,
  DeviceThermostat,
  Science,
  Sensors,
  AccessTime,
  NotificationsActiveOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';

function Widget({ type , setAlertOpen, totalSensors, totalAlerts }) {
  let data; 


  const [dateTime, setDateTime] = useState({
    time: '',
    date: '',
  });
  switch (type) {
  // case 'user':
  //   data = {
  //     title: 'AQMS Users',
  //     figure: 45,
  //     link: 'See all users',
  //     diff: '20%',
  //     icon: (
  //       <Groups
  //         className="icon"
  //         style={{
  //           color: 'crimson',
  //           backgroundColor: 'rgba(255, 0, 0, 0.2)',
  //         }}
  //       />
  //     ),
  //   };
  //   break;
  case 'labs':
    data = {
      title: 'Labs under your location',
      link: '',
      figure: 8,
      diff: '30%',
      icon: (
        <Science
          className="icon"
          style={{
            backgroundColor: 'rgba(218, 165, 32, 0.2)',
            color: 'goldenrod',
          }}
        />
      ),
    };
    break;
  case 'devices':
    data = {
      title: 'Total Sensors',
      link: '',
      figure: totalSensors,
      diff: '40%',
      icon: (
        <Sensors
          className="icon"
          style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
        />
      ),
    };
    break;
  case 'alerts':
    data = {
      title: 'Active Alerts',
      link: '',
      figure: totalAlerts,
      diff: '50%',
      icon: (
        <NotificationsActiveOutlined
          className="icon"
          style={{
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            color: 'purple',
          }}
        />
      ),
    };
    break;
  case 'time':
    data = {
      title: 'Time',
      link: '',
      figure: dateTime.time,
      diff: '',
      icon: (
        <AccessTime
          className="icon"
          style={{
            backgroundColor: '#e1f5fe',
            color: '#0288d1'
          }}
        />
      ),
    };
    break;
  default:
    break;
  }
  useEffect(() => {
    setInterval(() => {
      const currentTime = new Date();
      setDateTime(() => {
        return {
          time: currentTime.toLocaleTimeString('en', {
            hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric',
          }),
        };
      });
    });
  }, []);
  return (
    <div className="widget" onClick={() => {
        type === 'alerts' &&        
        setAlertOpen(true);
      }}
      style={{ cursor: type === 'alerts' && 'pointer', display: 'inline-block' }}
    >
      <div>
        <span className="title">{data.title}</span>
      </div>
      <div>
        <div className="left" >
          <span className="counter">
            {data.figure}
          </span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            {/* {data.diff && <KeyboardArrowUp /> }
            {data.diff} */}
          </div>
          {data.icon}
        </div>
      </div>
    </div>
  );
}

export default Widget;
