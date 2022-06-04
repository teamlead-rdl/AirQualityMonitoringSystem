import React, { useEffect, useState } from 'react'
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent'
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent'
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent'
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent'
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent'
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent'
import DeviceGridComponent from '../subComponent/siteDetailsComponent/DeviceGridComponent'

const LocationGridWidget = ({locationDetails, setLocationDetails, setImageState,setImg,  setLocationCoordinationList, centerLat, centerLng}) => {
  const [locationState, setProgressState] = useState(0);

  const [breadCrumbLabels, setBreadCrumbLabels] = useState({
    stateLabel: 'State',
    branchLabel: 'Branch',
    facilityLabel: 'Facility',
    buildingLabel: 'Building',
    floorLabel: 'Floor',
    lablabel: 'Lab'
  });  

  useEffect(()=>{
      if(locationState === 4 || locationState === 5 || locationState === 6){
        setImageState(1);
      }
  },[locationState]);

  return (
    <div>
        LocationGridWidget
        {locationState === 0 ?
          <LocationGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} centerLnglocationDetails={locationDetails}  setLocationDetails={setLocationDetails} setProgressState={setProgressState}  breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/>
        : ''}
        {locationState === 1 ?
        <BranchGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/> 
        : ''}
        {locationState === 2 ?
        <FacilityGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/>
        : ''}
        {locationState === 3 ?
        <BuildingGridComponent setImg={setImg} setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/>
        : ''}
        {locationState === 4 ?        
         <FloorGridComponent setImg={setImg} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/>
        : ''}
        {locationState === 5 ?
         <LabGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/>
        : ''}
        {
          locationState === 6 ? 
          <DeviceGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels}/> 
        : ''
        }
    </div>
  )
}

export default LocationGridWidget