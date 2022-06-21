import './deviceWidget.scss';
import {
  NotificationsActiveOutlined,
  WifiOffOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import { Badge, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

function DeviceWidget({
  data, setLocationDetails, setBreadCrumbLabels, setIsDashBoard,
}) {
  const [modeColor, setModeColor] = useState('primary');

  useEffect(() => {
    if (data) {
      switch (data.deviceMode) {
      case 'enabled': setModeColor('#1b5e20');
        break;
      case 'config': setModeColor('#4a148c');
        break;
      case 'calibration': setModeColor('#f57f17');
        break;
      case 'disabled': setModeColor('#b71c1c');
        break;
      case 'bumpTest': setModeColor('#01579b');
        break;
      case 'firmwareUpgradation': setModeColor('#c2185b');
        break;
      default: break;
      }
    }
  }, []);

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
        height: '190px', cursor: 'pointer', display: 'block', padding: 1,
      }}
    >
      <div
        className="left"
        style={{
          backgroundColor: data.deviceCategory === 'AQMII' ? '#dcedc8' : data.deviceCategory === 'AQMO' ? '#fff9c4' : '#e0e0e0',
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
          alignContent: 'space-between',
        }}
      >
        <div style={{
          display: 'flex',
          alignContent: 'center',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <div>
            <span
              className="title"
              style={{
                float: 'left',
                marginTop: 5,
                marginLeft: 5,
                color: data.deviceCategory === 'AQMII' ? '#388e3c' : data.deviceCategory === 'AQMO' ? '#ffa000' : '#757575',
              }}
            >
              {data.deviceName}
            </span>
          </div>
          <div>
            <span
              className="counter"
              style={{
                float: 'right',
                marginRight: 5,
                fontWeight: 500,
                color: data.deviceCategory === 'AQMII' ? '#388e3c'
                  : data.deviceCategory === 'AQMO' ? '#ffa000' : '#757575',
              }}
            >
              {data.deviceCategory}
            </span>
          </div>
        </div>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div
          className="percentage"
          style={{
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <div style={{
            height: data.deviceCategory === 'AQMP' ? '100%' : '70%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            {data.deviceCategory === 'AQMP'
              ? (
                <div style={{
                  height: '100%', width: '100%', overflow: 'auto', display: 'flex', alignItems: 'center',
                }}
                >
                  <div style={{ width: '100%', alignContent: 'center', color: 'black' }}>
                    {data.deviceCategory === 'AQMII'
                      ? <WifiOutlined color="success" style={{ fontSize: '40px' }} />
                      : <WifiOffOutlined style={{ fontSize: '70px', color: '#757575' }} />}

                  </div>
                </div>
              )
              : (
                <div style={{
                  width: '100%', height: '100%', overflow: 'auto', display: 'flex', alignItems: 'center',
                }}
                >
                  <div style={{ width: '60%', textAlignLast: 'center', paddingLeft: 10 }}>
                    Active Alarms :
                  </div>
                  <div style={{
                    width: '40%', alignContent: 'center', color: 'black', marginTop: 5,
                  }}
                  >
                    <Badge
                      badgeContent={data.deviceCategory === 'AQMP' ? '' : data.id}
                      style={{
                        color: data.deviceCategory === 'AQMP' ? '#757575' : '#f44336',
                      }}
                      color={data.deviceCategory === 'AQMP' ? 'info' : 'error'}
                      max={999}
                    >
                      <NotificationsActiveOutlined
                        style={{ fontSize: '40px' }}
                        sx={{
                          color: data.deviceCategory === 'AQMII' ? '#388e3c'
                            : data.deviceCategory === 'AQMO' ? '#ffa000' : '#757575',
                        }}
                      />
                    </Badge>
                  </div>
                </div>
              )}
          </div>
          {data.deviceCategory === 'AQMP' ? ''
            : (
              <div style={{
                height: '30%',
                width: '100%',
                display: 'flex',
                overflow: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: 15,
              }}
              >
                <div style={{
                  textAlignLast: 'left', textAlign: 'justify', paddingLeft: 10, marginRight: 5,
                }}
                >
                  Device Mode :
                </div>
                <div style={{
                  alignContent: 'center', color: 'black', textAlignLast: 'right',
                }}
                >
                  <Chip
                    label={data.deviceMode}
                    variant="outlined"
                    sx={{
                      color: data.deviceCategory === 'AQMP' ? '#757575' : modeColor,
                      borderColor: data.deviceCategory === 'AQMP' ? '#757575' : modeColor,
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

    </div>
  );
}

export default DeviceWidget;
