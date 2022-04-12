import "./navbar.scss";
import {
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
  AccountCircle
} from "@mui/icons-material";
import ApplicationStore from "../../utils/localStorageUtil";
import { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { LogoutService } from "../../services/LoginPageService";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../notification/ServiceNotificationBar";

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNotification, setNotification] = useState({
    status: false,
    type: '',
    message: ''
  });
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () =>{
    // API call for logout
    LogoutService(logoutSuccessCallback, logoutErrorCallBack);
    handleClose();
  }

  const logoutSuccessCallback = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });
    setTimeout(() => {
      handleNotificationClose();
        ApplicationStore().setStorage('userDetails', '');
        navigate(`/login`);
    }, 2000);
  };

  const logoutErrorCallBack = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  };
  const handleNotificationClose = () => {
    setNotification({
        status: false,
        type: '',
        message: ''
    });
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
          {/* <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div> */}
          <IconButton
            size="small"
            aria-label="account of current user"
            // aria-controls="menu-appbar"
            // aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <div className="item" style={{marginRight:0}}>
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <NotificationBar
        handleClose={handleNotificationClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type} />
    </div>
  );
};

export default Navbar;
