import { Outlet } from 'react-router-dom';
import Sidebar from "../components/navbarComponent/Sidebar";
import Navbar from "../components/navbarComponent/Navbar";
import "./css/home.scss";
import { UserAccessProvider } from "../context/UserAccessProvider";
import { useEffect, useState } from 'react';
import ApplicationStore from '../utils/localStorageUtil';
import { FetchBranchService, FetchFacilitiyService, FetchLocationService } from '../services/LoginPageService';

const HomePageComponent = () => {
  const [locationLabel, setLocationLabel] = useState('');
  const [branchLabel, setBranchLabel] = useState('');
  const [facilityLabel, setFacilityLabel] = useState('');
  const [buildingLabel, setBuildingLabel] = useState('');

  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const { location_id, branch_id, facility_id , building_id} = locationDetails;
 
  
  useEffect(()=>{
    FetchLocationService(handleSuccess, handleException);
    FetchBranchService({location_id}, handleBranchSuccess, handleException);
    FetchFacilitiyService({location_id, branch_id}, handleFacilitySuccess, handleException);
    ApplicationStore().setStorage('siteDetails', {locationLabel, branchLabel, facilityLabel, buildingLabel} );
  });
  
  const handleSuccess = (dataObject) => {
    dataObject?.data.map((datas, index)=>{
      if(datas.id == location_id){
        setLocationLabel(datas.stateName)
      }
    })
  }
  const handleBranchSuccess = (dataObject) => {
    dataObject?.data.map((datas, index)=>{
      if(datas.id == branch_id){
        setBranchLabel(datas.branchName)
      }
    })
  }
  const handleFacilitySuccess = (dataObject) => {
    dataObject?.data.map((datas, index)=>{
      if(datas.id == facility_id){
        setFacilityLabel(datas.facilityName)
      }
    })
  }
  const handleException = (errorObject) => {
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <UserAccessProvider>
          <Outlet />
        </UserAccessProvider>
      </div>
    </div>
  );
};

export default HomePageComponent;