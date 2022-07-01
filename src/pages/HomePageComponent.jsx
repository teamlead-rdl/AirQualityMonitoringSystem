import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navbarComponent/Sidebar';
import Navbar from '../components/navbarComponent/Navbar';
import './css/home.scss';
import { UserAccessProvider } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';
import {
  FetchBranchService, FetchFacilitiyService, FetchLocationService, NotificationAlerts,
} from '../services/LoginPageService';
import GlobalNotifier from '../components/notification/GlobalNotificationBar';
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable radix */

function HomePageComponent() {
  const [locationLabel, setLocationLabel] = useState('');
  const [branchLabel, setBranchLabel] = useState('');
  const [facilityLabel, setFacilityLabel] = useState('');
  const [mobileMenu, setMobileOpen] = useState(true);
  const [notifierState, setNotifierState] = useState({
    open: false,
    message: 'New have new notification !',
    color: '#ffca28', // amber : '#ffca28', green: '#4caf50'
  });
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const {
    location_id, branch_id, facility_id,
  } = locationDetails;

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    ApplicationStore().setStorage('siteDetails', {
      locationLabel, branchLabel, facilityLabel,
    });
    const notifierInterval = setInterval(() => {
      NotificationAlerts({ location_id, branch_id, facility_id }, handleNotificationSuccess, handleNotificationException);
      // setNotifierState((oldValue) => {
      //   return { ...oldValue, open: true, color: '#4caf50' };
      // });
    }, 10000);

    return () => {
      clearInterval(notifierInterval);
    };
  });

  const handleSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(location_id)) {
        setLocationLabel(datas.stateName);
      }
    });
  };
  const handleBranchSuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(branch_id)) {
        setBranchLabel(datas.branchName);
      }
    });
  };
  const handleFacilitySuccess = (dataObject) => {
    dataObject?.data.map((datas) => {
      if (datas.id === parseInt(facility_id)) {
        setFacilityLabel(datas.facilityName);
      }
    });
  };

  const handleException = () => {};

  const handleNotificationSuccess = (dataObject) => {
    setNotificationList((oldValue) => {
      const arraySet = dataObject.data.filter((object1) => {
        return !oldValue.some((object2) => {
          return object1.id === object2.id;
        });
      });

      if (arraySet.length !== 0) {
        let alertDetails = {
          locationIdList: [],
          branchIdList: [],
          facilityIdList: [],
          buildingIdList: [],
          floorIdList: [],
          labIdList: [],
          deviceIdList: [],
          sensorIdList: [],
        };

        arraySet?.map((data, index) => {
          alertDetails = {
            locationIdList: [...alertDetails.locationIdList, {
              id: data.location_id,
              alertType: data.alertType,
            }],
            branchIdList: [...alertDetails.branchIdList, {
              id: data.branch_id,
              alertType: data.alertType,
            }],
            facilityIdList: [...alertDetails.facilityIdList, {
              id: data.facility_id,
              alertType: data.alertType,
            }],
            buildingIdList: [...alertDetails.buildingIdList, {
              id: data.building_id,
              alertType: data.alertType,
            }],
            floorIdList: [...alertDetails.floorIdList, {
              id: data.floor_id,
              alertType: data.alertType,
            }],
            labIdList: [...alertDetails.labIdList, {
              id: data.lab_id,
              alertType: data.alertType,
            }],
            deviceIdList: [...alertDetails.deviceIdList, {
              id: data.deviceId,
              alertType: data.alertType,
            }],
            sensorIdList: [...alertDetails.sensorIdList, {
              id: data.sensorId,
              alertType: data.alertType,
            }],
          };
        });

        ApplicationStore().setStorage('alertDetails', alertDetails);
        let colorCode = '#4caf50';
        const setColor = arraySet?.find((data) => {
          const color = data.alertType === 'Critical' ? '#e53935' : data.alertType === 'outOfRange' ? '#ffc107' : colorCode;
          colorCode = color;
          return color;
        });

        setNotifierState((oldValue) => {
          return {
            ...oldValue,
            open: true,
            color: colorCode,
          };
        });
      }

      return [...oldValue, ...arraySet];
    });
  };

  const handleNotificationException = () => {};

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
          anchorElNotification={anchorElNotification}
          setAnchorElNotification={setAnchorElNotification}
        />
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          mobileMenu={mobileMenu}
          notificationList={notificationList}
          anchorElNotification={anchorElNotification}
          setAnchorElNotification={setAnchorElNotification}
        />
        <UserAccessProvider>
          <Outlet />
        </UserAccessProvider>
      </div>
    </div>
  );
}

export default HomePageComponent;
