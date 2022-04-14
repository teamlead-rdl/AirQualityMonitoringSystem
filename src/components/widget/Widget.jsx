import "./widget.scss";
import {
  KeyboardArrowUp,
  Groups,
  DeviceThermostat,
  Science,
  Sensors
} from "@mui/icons-material";

const Widget = ({ type }) => {
  let data;
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "AQMS Users",
        figure: 45,
        link: "See all users",
        icon: (
          <Groups
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "labs":
      data = {
        title: "Labs under your location",
        link: "View Details",
        figure: 15,
        icon: (
          <Science
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "devices":
      data = {
        title: "Total Devices",
        link: "View Devices",
        figure: 298,
        icon: (
          <DeviceThermostat
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "calibration":
      data = {
        title: "Devices due for calibration",
        link: "See details",
        figure: 45,
        icon: (
          <Sensors
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.figure}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
