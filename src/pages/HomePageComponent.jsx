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
  const { notificationList } = ApplicationStore().getStorage('notificationDetails');
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
    ApplicationStore().setStorage('siteDetails', {
      locationLabel, branchLabel, facilityLabel,
    });
  },[]);
  
  useEffect(()=>{
    const notifierInterval = setInterval(() => {
      NotificationAlerts({ location_id, branch_id, facility_id }, handleNotificationSuccess, handleNotificationException);
      // setNotifierState((oldValue) => {
      //   return { ...oldValue, open: true, color: '#4caf50' };
      // });
    }, 10000);
  
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
    // setNotificationList((oldValue) => {
    // });
    const arraySet = dataObject.data.filter((object1) => {
      return !notificationList.some((object2) => {
        return object1.id === object2.id;
      });
    });

    // Managing stack limit in notification list 
    console.log(notificationList);
    let availableStack = 12 - notificationList.length;
    let requiredStack = arraySet.length - availableStack;
    console.log(requiredStack);
    if( requiredStack > 0){
        // remove 'requiredStack' number of elements from the old stack
        let requiredStack = arraySet.length - availableStack;
        notificationList.splice(12 - requiredStack);
        console.log(requiredStack);
      } else
      {
        // remoeve all elements from the old stack
        // notificationList.length = 0;
        console.log(notificationList);
      }

    console.log(notificationList);
    console.log(arraySet);
    console.log(arraySet.length);

    if (arraySet.length !== 0) {
      let updatedAlertDetails = {
        locationIdList: [...locationIdList],
        branchIdList: [...branchIdList],
        facilityIdList: [...facilityIdList],
        buildingIdList: [...buildingIdList],
        floorIdList: [...floorIdList],
        labIdList: [...labIdList],
        deviceIdList: [...deviceIdList],
        sensorIdList: [...sensorIdList],
      };

      arraySet?.map((data, index) => {
        updatedAlertDetails = {
          locationIdList: [...updatedAlertDetails.locationIdList, {
            id: data.location_id,
            alertType: data.alertType,
          }],
          // branchIdList: [...updatedAlertDetails.branchIdList, {
          //   id: data.branch_id,
          //   alertType: data.alertType,
          // }],
          // facilityIdList: [...updatedAlertDetails.facilityIdList, {
          //   id: data.facility_id,
          //   alertType: data.alertType,
          // }],
          // buildingIdList: [...updatedAlertDetails.buildingIdList, {
          //   id: data.building_id,
          //   alertType: data.alertType,
          // }],
          // floorIdList: [...updatedAlertDetails.floorIdList, {
          //   id: data.floor_id,
          //   alertType: data.alertType,
          // }],
          // labIdList: [...updatedAlertDetails.labIdList, {
          //   id: data.lab_id,
          //   alertType: data.alertType,
          // }],
          // deviceIdList: [...updatedAlertDetails.deviceIdList, {
          //   id: data.deviceId,
          //   alertType: data.alertType,
          // }],
          // sensorIdList: [...updatedAlertDetails.sensorIdList, {
          //   id: data.sensorId,
          //   alertType: data.alertType,
          // }],
        };
      });


      ApplicationStore().setStorage('alertDetails', updatedAlertDetails);
      let colorCode = {
        priority: 3,
        color: '#4caf50'
      };
      const setColor = arraySet?.map((data) => {
        const color = data.alertType === 'Critical' ? {
          priority: 1,
          color: '#e53935'
        } : data.alertType === 'outOfRange' ? {
          priority: 2,
          color: '#ffc107'
        } : colorCode;

        colorCode = colorCode.priority < color.priority ? colorCode : color;
        return color;
      });
      console.log(setColor);
      setNotifierState((oldValue) => {
        return {
          ...oldValue,
          open: true,
          color: colorCode.color,
        };
      });
    }

    ApplicationStore().setStorage('notificationDetails', {notificationList: [...arraySet, ...notificationList]});
    // return [...oldValue, ...arraySet];
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
