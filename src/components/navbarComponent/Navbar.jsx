import "./navbar.scss";
import {
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
  AccountCircle,
  ErrorOutlineOutlined,
  WarningAmber
} from "@mui/icons-material";
import ApplicationStore from "../../utils/localStorageUtil";
import { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem, ListSubheader ,ListItemAvatar, Avatar, ListItemText, ListItem} from "@mui/material";
import { LogoutService } from "../../services/LoginPageService";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../notification/ServiceNotificationBar";

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const notificationList = [
    {
      id: 1,
      date:'10-04-2022',
      primary: 'Warning!',
      secondary: "Warning level reached of DataLoger004 at Chem-Lab in 3rd Floor",
      type: 'warning'
    },
    {
      id: 2,
      date:'10-04-2022',
      primary: 'Alert!',
      secondary: "Critical level reached of DataLoger011 at Test-Lab in 5th Floor",
      type: 'alert'
    },
    {
      id: 3,
      date:'11-04-2022',
      primary: 'Warning!',
      secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
      type: 'warning'
    },
    {
      id: 4,
      date:'11-04-2022',
      primary: 'Alert!',
      secondary: 'I have the tickets to the ReactConf for this year.',
      type: 'alert'
    },
    {
      id: 5,
      date:'12-04-2022',
      primary: "Alert!",
      secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
      type: 'alert'
    },
    {
      id: 6,
      date:'12-04-2022',
      primary: 'Alert!',
      secondary: `Menus that are generated by the bottom app bar (such as a bottom
        navigation drawer or overflow menu) open as bottom sheets at a higher elevation
        than the bar.`,
      type: 'alert'
    },
    {
      id: 7,
      date:'12-04-2022',
      primary: 'Warning!',
      secondary: `Who wants to have a cookout this weekend? I just got some furniture
        for my backyard and would love to fire up the grill.`,
      type: 'warning'
    }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [openNotification, setNotification] = useState({
    status: false,
    type: '',
    message: ''
  });
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElNotification(null);
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
        ApplicationStore().setStorage('siteDetails', '');
        navigate(`/login`);
    }, 2000);
  };

  const logoutErrorCallBack = (errorObject) => {
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
          <div className="item" >
            <ChatBubbleOutlineOutlined className="icon" onClick={handleNotificationMenu}/>
            <div className="counter">{notificationList.length}</div>
          </div>
          <Menu
            id="menu-appbar1"
            anchorEl={anchorElNotification}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNotification)}
            onClose={handleClose}
            sx={{ height:'50vh', width:"100%"}}
            style={{overflow:"none"}}
          >
            {notificationList.map(({id, primary, date, secondary, type})=>(
              <div key={id}>
                {/* {id === 1 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Today
                  </ListSubheader>
                )}

                {id === 3 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Yesterday
                  </ListSubheader>
                )} */}
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  {date}
                </ListSubheader>
                <ListItem button onClick={handleClose} style={{maxWidth:300}}>
                  <ListItemAvatar>
                    {/* <Avatar alt="Profile Picture" src={person} /> */}
                    {type=="alert"?
                    // <ErrorOutlineOutlinedIcon/>
                    <ErrorOutlineOutlined sx={{ color:"red" }}/>
                  : <WarningAmber sx={{ color:"yellow" }}/>
                  }
                  </ListItemAvatar>
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
              </div>
            ))}
          </Menu>
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
              {/* <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              /> */}
              <AccountCircle />
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
