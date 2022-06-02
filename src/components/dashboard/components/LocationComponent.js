import React from 'react'
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent'
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent'
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent'
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent'
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent'
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent'

const LocationComponent = ({locationDetails}) => {
  return (
    <div>
        LocationComponent
        {/* <LabGridComponent />
        <FloorGridComponent />
        <FacilityGridComponent />
        <BuildingGridComponent />
        <BranchGridComponent /> */}
        <LocationGridComponent />
    </div>
  )
}

export default LocationComponent