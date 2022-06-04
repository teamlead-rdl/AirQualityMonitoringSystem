import React, { useEffect, useState } from 'react';
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent';
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent';
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent';
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent';
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent';
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent';
import DeviceGridComponent from '../subComponent/siteDetailsComponent/DeviceGridComponent';
/* eslint-disable max-len */
function LocationGridWidget({
  locationDetails, setLocationDetails, locationState, setProgressState,
}) {
  const [breadCrumbLabels, setBreadCrumbLabels] = useState({
    stateLabel: 'State',
    branchLabel: 'Branch',
    facilityLabel: 'Facility',
    buildingLabel: 'Building',
    floorLabel: 'Floor',
    lablabel: 'Lab',
  });

  useEffect(() => {

  }, [locationState]);

  return (
    <div style={{ height: '100%' }}>
      {locationState === 0
        ? <LocationGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
      {locationState === 1
        ? <BranchGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
      {locationState === 2
        ? <FacilityGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
      {locationState === 3
        ? <BuildingGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
      {locationState === 4
        ? <FloorGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
      {locationState === 5
        ? <LabGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
      {locationState === 6
        ? <DeviceGridComponent locationDetails={locationDetails} setLocationDetails={setLocationDetails} setProgressState={setProgressState} breadCrumbLabels={breadCrumbLabels} setBreadCrumbLabels={setBreadCrumbLabels} />
        : ''}
    </div>
  );
}

export default LocationGridWidget;
