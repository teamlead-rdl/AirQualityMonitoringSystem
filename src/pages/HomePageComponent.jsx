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
import { alertSeverityCode, setAlertColor } from '../utils/helperFunctions';
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
  const [newNotification, setNewNotification] = useState(false);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const { notificationList } = ApplicationStore().getStorage('notificationDetails');
  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const {
    location_id, branch_id, facility_id,
  } = locationDetails;

  // const [notificationList, setNotificationList] = useState([]);
  const {  locationIdList, branchIdList, facilityIdList, buildingIdList, floorIdList,
    labIdList, deviceIdList, sensorIdList, } = ApplicationStore().getStorage('alertDetails');

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
  },[]);
  
  useEffect(()=>{
    ApplicationStore().setStorage('siteDetails', {
      locationLabel, branchLabel, facilityLabel,
    });
    const notifierInterval = setInterval(() => {
      NotificationAlerts({ location_id, branch_id, facility_id }, handleNotificationSuccess, handleNotificationException);
      // setNotifierState((oldValue) => {
      //   return { ...oldValue, open: true, color: '#4caf50' };
      // });
    }, 10000); // pick data from 'userDetails'(sessionData)
  
    return () => {
      clearInterval(notifierInterval);
    };
  })

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
    // limit the notification count
    let newDataObject = dataObject.data.sort((firstElement, secondElement) => secondElement.id - firstElement.id).slice(0, 12);
    // Check for new alert with existing stack
    const arraySet = newDataObject.filter((object1) => {
      return !notificationList.some((object2) => {
        return object1.id === object2.id;
      });
    });
    // make an alert if we have new alert
    let newNotificationValue = newNotification;
    if (arraySet.length !== 0) {
      setNewNotification((oldValue)=>{
        newNotificationValue = !oldValue;
        return !oldValue;
      });
      let colorCode = setAlertColor(arraySet);
      setNotifierState((oldValue) => {
        return {
          ...oldValue,
          open: true,
          color: colorCode.color,
        };
      });
      ApplicationStore().setStorage('notificationDetails', {notificationList: newDataObject, newNotification: newNotificationValue});
    }
    
    ApplicationStore().setStorage('notificationDetails', {notificationList: newDataObject,
       newNotification: newNotificationValue
      });

    let updatedAlertDetails = {
      locationIdList: [],
      branchIdList: [],
      facilityIdList: [],
      buildingIdList: [],
      floorIdList: [],
      labIdList: [],
      deviceIdList: [],
      sensorIdList: [],
    };

    newDataObject?.map((data, index) => {
      updatedAlertDetails = {
        locationIdList: [...updatedAlertDetails.locationIdList, {
          id: data.location_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        branchIdList: [...updatedAlertDetails.branchIdList, {
          id: data.branch_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        facilityIdList: [...updatedAlertDetails.facilityIdList, {
          id: data.facility_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        buildingIdList: [...updatedAlertDetails.buildingIdList, {
          id: data.building_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        floorIdList: [...updatedAlertDetails.floorIdList, {
          id: data.floor_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        labIdList: [...updatedAlertDetails.labIdList, {
          id: data.lab_id,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        deviceIdList: [...updatedAlertDetails.deviceIdList, {
          id: data.deviceId,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
        sensorIdList: [...updatedAlertDetails.sensorIdList, {
          id: data.sensorId,
          alertType: data.alertType,
          alertPriority: alertSeverityCode(data.alertType)
        }],
      };
    });

    ApplicationStore().setStorage('alertDetails', {...updatedAlertDetails});
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
