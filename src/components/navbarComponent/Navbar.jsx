import './navbar.scss';
import {
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  AccountCircle,
  ErrorOutlineOutlined,
  WarningAmber,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  IconButton, Toolbar, Menu, MenuItem, ListSubheader, ListItemAvatar, ListItemText, ListItem, Typography, Tooltip, Zoom,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { LogoutService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import ApplicationStore from '../../utils/localStorageUtil';

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

function Navbar(props) {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [customerDisplayName, setCustomerDisplayName] = useState('Company Name Here...');

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [openNotification, setNotification] = useState({
    status: false,
    type: '',
    message: '',
  });

  useEffect(() => {
    if (userDetails.userName) {
      setUserDisplayName(userDetails.userName);
      setCustomerDisplayName(userDetails.companyName);
    }
    setInterval(() => {
      // Alert Api here
    }, 1000);
  }, []);

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

  const logout = () => {
    LogoutService(logoutSuccessCallback, logoutErrorCallBack);
    handleClose();
  };

  const logoutSuccessCallback = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });

    setTimeout(() => {
      handleNotificationClose();
      ApplicationStore().setStorage('userDetails', '');
      ApplicationStore().setStorage('siteDetails', '');
      navigate('/login');
    }, 2000);
  };

  const logoutErrorCallBack = () => { };

  const handleNotificationClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  return (
    <div className="navbar">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'flex' } }}
        >
          <MenuIcon sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} />
          {props.mobileMenu
            ? <ChevronLeft sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} />
            : <ChevronRight sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} />}
        </IconButton>
      </Toolbar>
      <div className="wrapper">
        <div
          className="wrapper"
          style={{
            display: 'block',
          }}
        >
          <Typography variant="h5" gutterBottom component="div">
            {customerDisplayName}
          </Typography>
        </div>
        <div className="items">
          <Tooltip title="Alerts" placement="bottom" TransitionComponent={Zoom} arrow>
            <div className="item">
              <NotificationsNoneOutlined
                className="icon"
                style={{
                  cursor: 'pointer',
                }}
              />
              <div className="counter">1</div>

            </div>
          </Tooltip>
          <Tooltip title="Notifications" placement="bottom" TransitionComponent={Zoom} arrow>
            <div className="item">
              <ChatBubbleOutlineOutlined
                className="icon"
                onClick={handleNotificationMenu}
                style={{
                  cursor: 'pointer',
                }}
              />
              <div className="counter">{props.notificationList.length}</div>
            </div>
          </Tooltip>
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
              horizontal: 'left',
            }}
            open={Boolean(anchorElNotification)}
            onClose={handleClose}
            sx={{ height: '60vh', width: '100%' }}
            style={{ overflow: 'none', marginTop: 28 }}
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
                  right: 145,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <div style={{ overflow: 'auto', height: '50vh' }}>
              {props.notificationList.map(({
                id, primary, date, secondary, type,
              }) => (
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
                  <ListItem button onClick={handleClose} style={{ maxWidth: 500, minWidth: '300px' }}>
                    <ListItemAvatar>
                      {/* <Avatar alt="Profile Picture" src={person} /> */}
                      {type === 'alert'
                      // <ErrorOutlineOutlinedIcon/>
                        ? <ErrorOutlineOutlined sx={{ color: 'red' }} />
                        : <WarningAmber sx={{ color: 'yellow' }} />}
                    </ListItemAvatar>
                    <ListItemText primary={primary} secondary={secondary} />
                  </ListItem>
                </div>
              ))}
            </div>
          </Menu>
          <IconButton
            size="small"
            aria-label="account of current user"
            // aria-controls="menu-appbar"
            // aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <div className="item" style={{ marginRight: 0 }}>
              <AccountCircle />
            </div>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
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
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
          <div className="item">
            {userDisplayName}
          </div>
        </div>
      </div>
      <NotificationBar
        handleClose={handleNotificationClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
  );
}

export default Navbar;
