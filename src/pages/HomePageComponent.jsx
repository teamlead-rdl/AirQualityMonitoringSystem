import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navbarComponent/Sidebar';
import Navbar from '../components/navbarComponent/Navbar';
import './css/home.scss';
import { UserAccessProvider } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';
import { FetchBranchService, FetchFacilitiyService, FetchLocationService } from '../services/LoginPageService';
import GlobalNotifier from '../components/notification/GlobalNotificationBar';

function HomePageComponent() {
  const [locationLabel, setLocationLabel] = useState('');
  const [branchLabel, setBranchLabel] = useState('');
  const [facilityLabel, setFacilityLabel] = useState('');
  const [mobileMenu, setMobileOpen] = useState(true);
  const [notifierState, setNotifierState] = useState({
    open: true,
    message: 'New have new notification !',
    color: '#ffca28', // amber : '#ffca28', green: '#4caf50'
  });
  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const {
    location_id, branch_id, facility_id,
  } = locationDetails;

  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      date: '10-04-2022',
      primary: 'Warning!',
      secondary: 'Warning level reached of DataLoger004 at Chem-Lab in 3rd Floor',
      type: 'warning',
    },
    {
      id: 2,
      date: '10-04-2022',
      primary: 'Alert!',
      secondary: 'Critical level reached of DataLoger011 at Test-Lab in 5th Floor',
      type: 'alert',
    },
    {
      id: 3,
      date: '11-04-2022',
      primary: 'Warning!',
      secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
      type: 'warning',
    },
    {
      id: 4,
      date: '11-04-2022',
      primary: 'Alert!',
      secondary: 'I have the tickets to the ReactConf for this year.',
      type: 'alert',
    },
  ]);

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    ApplicationStore().setStorage('siteDetails', {
      locationLabel, branchLabel, facilityLabel,
    });
    const notifierInterval = setInterval(() => {
      setNotifierState((oldValue) => {
        return { ...oldValue, open: true };
      });
    }, 300000);

    return () => {
      clearInterval(notifierInterval);
    };
  });

  const handleSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === location_id) {
        setLocationLabel(datas.stateName);
      }
    });
  };
  const handleBranchSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === branch_id) {
        setBranchLabel(datas.branchName);
      }
    });
  };
  const handleFacilitySuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === facility_id) {
        setFacilityLabel(datas.facilityName);
      }
    });
  };

  const handleException = () => {};

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileMenu);
  };

  return (
    <div className="home">
      <Sidebar handleDrawerToggle={handleDrawerToggle} mobileMenu={mobileMenu} />
      <div className="homeContainer">
        <GlobalNotifier
          notifierState={notifierState}
          setNotifierState={setNotifierState}
        />
        <Navbar handleDrawerToggle={handleDrawerToggle} mobileMenu={mobileMenu} notificationList={notificationList} />
        <UserAccessProvider>
          <Outlet />
        </UserAccessProvider>
      </div>
    </div>
  );
}

export default HomePageComponent;
