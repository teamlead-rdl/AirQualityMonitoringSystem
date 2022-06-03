import React, { useEffect, useState } from 'react'
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent'
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent'
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent'
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent'
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent'
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent'

<<<<<<< HEAD:src/components/dashboard/components/LocationComponent.js
const LocationComponent = ({locationDetails, setLocationDetails,setLocationCoordinationList, centerLat, centerLng}) => {
=======
const LocationGridWidget = ({locationDetails, setLocationDetails}) => {
>>>>>>> 40d45398dd30c95d2223e27b09e9f9d90f786bdd:src/components/dashboard/components/LocationGridWidget.js
  const [locationState, setProgressState] = useState(0);

  useEffect(()=>{

  },[locationState]);

  return (
    <div>
        LocationGridWidget
        {locationState === 0 ?
          <LocationGridComponent setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 1 ?
        <BranchGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} /> 
        : ''}
        {locationState === 2 ?
        <FacilityGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 3 ?
        <BuildingGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 4 ?
         <FloorGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
        {locationState === 5 ?
         <LabGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
        : ''}
    </div>
  )
}

export default LocationGridWidget