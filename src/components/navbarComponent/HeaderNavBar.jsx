import React, { useState } from 'react';

import {
  AppBar,
  Tooltip,
  MenuItem,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LogoutService } from '../../services/LoginPageService';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HeaderNavBar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  //   const lastActiveIndexString = localStorage.getItem('lastActiveIndex');
  //   const lastActiveIndex = Number(lastActiveIndexString);
  //   const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

  // useEffect(() => {
  //     const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname));
  //     changeActiveIndex(activeItem);
  // }, [location])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutSuccessCallback = () => {
    localStorage.clear();
    navigate('/login');
  };

  const logoutErrorCallBack = () => {};

  const largeLogo = () => {
    return (
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        Client Logo
      </Typography>
    );
  };

  const smallLogo = () => {
    return (
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        Small resolution logo
      </Typography>
    );
  };

  const profileSettings = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem
              key={setting}
              onClick={async () => {
                handleCloseUserMenu();
                if (index === 3) {
                  LogoutService(logoutSuccessCallback, logoutErrorCallBack);
                }
              }}
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {largeLogo()}

          {smallLogo()}

          {profileSettings()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderNavBar;
