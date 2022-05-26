import "./featured.scss";
import {
  MoreVert,
  KeyboardArrowDown,
  KeyboardArrowUpOutlined
} from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Devices Enabled</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Functional Devices</p>
        <p className="amount">200</p>
        <p className="desc">
          Disable devices could be the one's with no configurations or could be the one's disbaled intentionally.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Disbaled</div>
            <div className="itemResult negative">
              <KeyboardArrowDown fontSize="small" />
              <div className="resultAmount">98</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Enabled</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount">200</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Total Devices</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className="resultAmount">298</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
