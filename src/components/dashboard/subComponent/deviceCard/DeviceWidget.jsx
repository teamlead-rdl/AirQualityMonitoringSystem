import './deviceWidget.scss';
import {
  NotificationsActiveOutlined,
} from '@mui/icons-material';

function DeviceWidget({
  type, data, setLocationDetails, setBreadCrumbLabels, setIsDashBoard,
}) {
  switch (type) {
  case 'aqmi': break;
  case 'aqmo': break;
  default: break;
  }

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
        console.log(data);
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
        <div style={{ display: 'inline', alignContent: 'center', height: 40 }}>
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
              {data.deviceTag}
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
              <NotificationsActiveOutlined style={{ fontSize: 80 }} color="warning" />
            </div>
            <div style={{ height: '20%', display: 'block' }}>
              <span>
                {data.deviceMode}
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
