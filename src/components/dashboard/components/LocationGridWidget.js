import React, { useEffect, useState } from 'react'
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent'
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent'
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent'
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent'
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent'
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent'
import DeviceGridComponent from '../subComponent/siteDetailsComponent/DeviceGridComponent'

const LocationGridWidget = ({locationDetails, setLocationDetails, locationState, setProgressState}) => {

  useEffect(()=>{

  },[locationState]);

  return (
    <div>
        LocationGridWidget
        {locationState === 0 ?
          <LocationGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} />
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
        {
          locationState === 6 ? 
          <DeviceGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState}/> 
        : ''
        }
    </div>
  )
}

export default LocationGridWidget