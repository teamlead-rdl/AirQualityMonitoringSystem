import React, { useEffect, useState } from 'react'
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent'
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent'
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent'
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent'
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent'
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent'

const LocationGridWidget = ({locationDetails, setLocationDetails, setLocationCoordinationList, centerLat, centerLng}) => {
  const [locationState, setProgressState] = useState(0);

  
  

  useEffect(()=>{

  },[locationState]);

  return (
    <div>
        LocationGridWidget
        {locationState === 0 ?
          <LocationGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} centerLnglocationDetails={locationDetails}  setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 1 ?
        <BranchGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} /> 
        : ''}
        {locationState === 2 ?
        <FacilityGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 3 ?
        <BuildingGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 4 ?
         <FloorGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 5 ?
         <LabGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {
          locationState === 6 ? 'Device List goes here...' : ''
        }
    </div>
  )
}

export default LocationGridWidget