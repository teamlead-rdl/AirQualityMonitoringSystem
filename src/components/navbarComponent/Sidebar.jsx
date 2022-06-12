import './Sidebar.scss';
import {
  Box,
  Drawer,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DrawerObject } from './SidebarItems';

export default function Sidebar(props) {
  // const lastActiveIndexString = localStorage.getItem('lastActiveIndex');
  // const lastActiveIndex = Number(lastActiveIndexString);
  // const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);
  const theme = useTheme();
  // const [mobileMenu, setMobileOpen] = useState(true);

  // useEffect(() => {
  //   const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname));
  //   changeActiveIndex(activeItem);
  // }, [location])

  const openedMixin = () => ({
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = () => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const MediumScaleDrawer = styled(Drawer)(
    () => ({
      width: 240,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(props.mobileMenu && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!props.mobileMenu && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  const hamBurgerMenu = () => {
    const drawerWidth = 240;
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'none' } }}>
        <Drawer
          variant="temporary"
          open={props.mobileMenu}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerObject />
        </Drawer>
      </Box>
    );
  };

  const sidebarMenu = () => {
    return (
      <MediumScaleDrawer
        open={props.mobileMenu}
        variant="permanent"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
      >
        <DrawerObject />
      </MediumScaleDrawer>
    );
  };

  return (
    <>
      <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
        {hamBurgerMenu()}
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
        {sidebarMenu()}
      </Box>
    </>
  );
}
