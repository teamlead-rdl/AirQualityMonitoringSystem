import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
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
    Drawer,
} from '@mui/material';
import { DrawerObject, SidebarItems } from "./SidebarItems";
import { LogoutService } from '../../services/LoginPageService';
import { useNavigate } from "react-router-dom";

// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderNavBar = (props, { defaultActive, }) => {
    const navigate = useNavigate();
    const drawerWidth = 240;
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileMenu, setMobileOpen] = useState(false);
    const location = '/login';
    const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
    const lastActiveIndex = Number(lastActiveIndexString);
    const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

    // useEffect(() => {
    //     const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname));
    //     changeActiveIndex(activeItem);
    // }, [location])

    function getPath(path) {
        if (path && path.charAt(0) !== "/") {
            return "/" + path;
        }
        return path;
    }

    function changeActiveIndex(newIndex) {
        localStorage.setItem("lastActiveIndex", newIndex)
        setActiveIndex(newIndex)
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileMenu);
    };

    const logoutSuccessCallback = (data) => {
        localStorage.clear();
        navigate(`/login`);
    };

    const logoutErrorCallBack = (errorObject) => {
    };

    const hamBurgerMenu = () => {
        return (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' , sm : 'flex', md: 'flex' } }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'flex' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <Drawer
                        variant="temporary"
                        open={mobileMenu}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'block', md:'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {/* <DrawerObject activeIndex={activeIndex} /> */}
                    </Drawer>
                </Box>
            </Box>
        )
    }

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
        )
    }

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
        )
    }

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
                        <MenuItem key={setting} onClick={async()=>{
                            handleCloseUserMenu();
                            if(index == 3){
                                // const response = await LogoutService()
                                // .then(response =>
                                //     response.json()
                                // ).then(data => {
                                //     localStorage.clear();
                                //     navigate(`/login`);
                                // })
                                // .catch(error => {
                                //     return error;
                                // });
                                LogoutService(logoutSuccessCallback, logoutErrorCallBack);

                            }
                        }}>
                            <Typography textAlign="center" >{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        )
    }

    const largeHeadermenu = () => {
        return (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {/* {pages.map((page) => (
                    <Button
                        key={page}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                ))} */}
            </Box>
        )
    }

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {largeLogo()}

                    {hamBurgerMenu()}

                    {smallLogo()}

                    {largeHeadermenu()}

                    {profileSettings()}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default HeaderNavBar;