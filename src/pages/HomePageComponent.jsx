import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navbarComponent/Sidebar';
import Navbar from '../components/navbarComponent/Navbar';
import './css/home.scss';
import { UserAccessProvider } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';
import { FetchBranchService, FetchFacilitiyService, FetchLocationService } from '../services/LoginPageService';

function HomePageComponent() {
  const [locationLabel, setLocationLabel] = useState('');
  const [branchLabel, setBranchLabel] = useState('');
  const [facilityLabel, setFacilityLabel] = useState('');
  const [mobileMenu, setMobileOpen] = useState(true);

  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const {
    location_id, branch_id, facility_id,
  } = locationDetails;

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({ location_id }, handleBranchSuccess, handleException);
    FetchFacilitiyService({ location_id, branch_id }, handleFacilitySuccess, handleException);
    ApplicationStore().setStorage('siteDetails', {
      locationLabel, branchLabel, facilityLabel,
    });
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
        <Navbar handleDrawerToggle={handleDrawerToggle} mobileMenu={mobileMenu} />
        <UserAccessProvider>
          <Outlet />
        </UserAccessProvider>
      </div>
    </div>
  );
}

export default HomePageComponent;
