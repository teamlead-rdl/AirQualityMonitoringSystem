import './notificationWidget.scss';
import {
  VolumeUp,
  Sensors,
  AccessTime,
  NotificationsActiveOutlined,
  SensorsOff,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function NotificationWidget({ type, figure }) {
  let data;
  const [dateTime, setDateTime] = useState({
    time: '',
    date: '',
  });
  switch (type) {
  case 'user':
    data = {
      title: 'Hooter',
      figure: (<VolumeUp style={{fontSize: '70px', color : '#808080'}}/>),
      link: '',
      icon: ''
      // (
      //   <Groups
      //     className="icon"
      //     style={{
      //       color: 'goldenrod',
      //       backgroundColor: 'rgba(218, 165, 32, 0.2)',
      //     }}
      //   />
      // )
      ,
    };
    break;
  case 'labs':
    data = {
      title: 'Disconnected Devices',
      link: '',
      figure: 3,
      icon: (
        <SensorsOff
          className="icon"
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            color: 'crimson',
          }}
        />
      ),
    };
    break;
  case 'devices':
    data = {
      title: 'Total Devices',
      link: '',
      figure: figure,
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
      figure: figure,
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
      icon: (
        <AccessTime
          className="icon"
          style={{
            backgroundColor: '#e1f5fe',
            color: '#0288d1',
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
    <div
      className="widget"
      onClick={() => {
        type === 'alerts'
        && console.log(data); // remove console once you started to implement the click functionality
      }}
      style={{ cursor: type === 'alerts' && 'pointer', justifyContent: type === 'user' && 'center' }}
    >
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.figure}
        </span>
        <span className="link">{data.link}</span>
      </div>
      {type !== 'user' && 
      <div className="right">
        <div className="percentage positive">
        </div>
        {data.icon}
      </div>
      }
    </div>
  );
}

export default NotificationWidget;
