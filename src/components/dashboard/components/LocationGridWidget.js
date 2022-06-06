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
  locationDetails, setLocationDetails, locationState, setProgressState, setImageState, setImg, setDeviceCoordsList, setLocationCoordinationList, setIsDashBoard, setIsGeoMap, siteImages, setSiteImages,
}) {
  const [breadCrumbLabels, setBreadCrumbLabels] = useState({
    stateLabel: 'State',
    branchLabel: 'Branch',
    facilityLabel: 'Facility',
    buildingLabel: 'Building',
    floorLabel: 'Floor',
    lablabel: 'Lab',
    deviceLabel: '',
  });
  useEffect(() => {
    if (locationState === 4 || locationState === 5 || locationState === 6) {
      setImageState(1);
    }
  }, [locationState]);
  return (
    <div style={{ height: '100%' }}>
      {
        locationState === 0
          ? (
            <LocationGridComponent
              setLocationCoordinationList={setLocationCoordinationList}
              setLocationDetails={setLocationDetails}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setBreadCrumbLabels={setBreadCrumbLabels}
            />
          ) : ''
      }
      {
        locationState === 1
          ? (
            <BranchGridComponent
              setLocationCoordinationList={setLocationCoordinationList}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setBreadCrumbLabels={setBreadCrumbLabels}
              setIsGeoMap={setIsGeoMap}
              setDeviceCoordsList={setDeviceCoordsList}
            />
          ) : ''
      }
      {
        locationState === 2
          ? (
            <FacilityGridComponent
              setLocationCoordinationList={setLocationCoordinationList}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setBreadCrumbLabels={setBreadCrumbLabels}
              setIsGeoMap={setIsGeoMap}
              setDeviceCoordsList={setDeviceCoordsList}
            />
          ) : ''
      }
      {
        locationState === 3
          ? (
            <BuildingGridComponent
              setImg={setImg}
              setLocationCoordinationList={setLocationCoordinationList}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setBreadCrumbLabels={setBreadCrumbLabels}
              setIsGeoMap={setIsGeoMap}
              setDeviceCoordsList={setDeviceCoordsList}
              siteImages={siteImages}
              setSiteImages={setSiteImages}
            />
          ) : ''
      }
      {
        locationState === 4
          ? (
            <FloorGridComponent
              setImg={setImg}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setBreadCrumbLabels={setBreadCrumbLabels}
              setIsGeoMap={setIsGeoMap}
              setDeviceCoordsList={setDeviceCoordsList}
              siteImages={siteImages}
              setSiteImages={setSiteImages}
            />
          ) : ''
      }
      {locationState === 5
        ? (
          <LabGridComponent
            setImg={setImg}
            locationDetails={locationDetails}
            setLocationDetails={setLocationDetails}
            setProgressState={setProgressState}
            breadCrumbLabels={breadCrumbLabels}
            setBreadCrumbLabels={setBreadCrumbLabels}
            setIsGeoMap={setIsGeoMap}
            setDeviceCoordsList={setDeviceCoordsList}
            siteImages={siteImages}
            setSiteImages={setSiteImages}
          />
        ) : ''}
      {
        locationState === 6
          ? (
            <DeviceGridComponent
              setImg={setImg}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setDeviceCoordsList={setDeviceCoordsList}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setIsDashBoard={setIsDashBoard}
              setIsGeoMap={setIsGeoMap}
              siteImages={siteImages}
              setSiteImages={setSiteImages}
            />
          ) : ''
      }
    </div>
  );
}

export default LocationGridWidget;
