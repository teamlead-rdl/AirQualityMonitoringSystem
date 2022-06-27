import React, { useEffect } from 'react';
import LocationGridComponent from '../subComponent/siteDetailsComponent/LocationGridComponent';
import BranchGridComponent from '../subComponent/siteDetailsComponent/BranchGridComponent';
import BuildingGridComponent from '../subComponent/siteDetailsComponent/BuildingGridComponent';
import FacilityGridComponent from '../subComponent/siteDetailsComponent/FacilityGridComponent';
import FloorGridComponent from '../subComponent/siteDetailsComponent/FloorGridComponent';
import LabGridComponent from '../subComponent/siteDetailsComponent/LabGridComponent';
/* eslint-disable max-len */
function LocationGridWidget({
  locationDetails, setLocationDetails, locationState, setProgressState, setImageState, setImg,
  setDeviceCoordsList, setLocationCoordinationList, setIsDashBoard, setIsGeoMap, siteImages, setSiteImages,
  setZoomLevel, setCenterLatitude, setCenterLongitude, breadCrumbLabels, setBreadCrumbLabels,
}) {
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
              setZoomLevel={setZoomLevel}
              setCenterLatitude={setCenterLatitude}
              setCenterLongitude={setCenterLongitude}
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
              setZoomLevel={setZoomLevel}
              setCenterLatitude={setCenterLatitude}
              setCenterLongitude={setCenterLongitude}
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
              setZoomLevel={setZoomLevel}
              setCenterLatitude={setCenterLatitude}
              setCenterLongitude={setCenterLongitude}
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
              setZoomLevel={setZoomLevel}
              setCenterLatitude={setCenterLatitude}
              setCenterLongitude={setCenterLongitude}
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
              setCenterLatitude={setCenterLatitude}
              setCenterLongitude={setCenterLongitude}
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
            setIsDashBoard={setIsDashBoard}
            setIsGeoMap={setIsGeoMap}
            setDeviceCoordsList={setDeviceCoordsList}
            siteImages={siteImages}
            setSiteImages={setSiteImages}
            setCenterLatitude={setCenterLatitude}
            setCenterLongitude={setCenterLongitude}
          />
        ) : ''}
    </div>
  );
}

export default LocationGridWidget;
