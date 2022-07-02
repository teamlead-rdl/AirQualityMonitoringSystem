import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FloorfetchService } from '../../../../services/LoginPageService';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
function FloorGridComponent({
  setImg, locationDetails, setLocationDetails, setProgressState, breadCrumbLabels,
  setBreadCrumbLabels, setIsGeoMap, setDeviceCoordsList, siteImages, setSiteImages,
  setCenterLatitude, setCenterLongitude,
}) {
  const { floorIdList } = ApplicationStore().getStorage('alertDetails');

  const dataColumns = [
    {
      field: 'floorName',
      headerName: 'Floor Name',
      width: 400,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'id',
      headerName: 'Status',
      width: 100,
      renderCell: ((params) => {
        let alertObject = { alertType: 'Good' };
        alertObject = floorIdList?.find((alert) => {
          return params.row.id === parseInt(alert.id);
        });
        let alertLabel = 'Good';
        let alertColor = 'green';
        switch (alertObject?.alertType) {
        case 'Critical': alertLabel = 'Critical';
          alertColor = 'red';
          break;
        case 'outOfRange': alertLabel = 'outOfRange';
          alertColor = 'orange';
          break;
        default: break;
        }

        return (
          <Chip
            variant="outlined"
            label={alertLabel}
            style={{
              color: alertColor,
              borderColor: alertColor,
            }}
          />
        );
      }),
    },
  ];

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    FloorfetchService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
      facility_id: locationDetails.facility_id,
      building_id: locationDetails.building_id,
    }, handleSuccess, handleException);
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
  };

  const handleException = (errorObject) => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setLocationDetails((oldValue) => {
            return { ...oldValue, floor_id: selectedRow.id };
          });

          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, floorLabel: selectedRow.floorName };
          });

          setProgressState(5);
          setImg(selectedRow.floorMap);
          setSiteImages((oldValue) => {
            return { ...oldValue, floorImage: selectedRow.floorMap };
          });
        }}
      >
        {selectedRow.floorName}
      </h3>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            setProgressState(0);
            setDeviceCoordsList([]);
            setCenterLatitude(23.500);
            setCenterLongitude(80.000);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            setProgressState(1);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3
          onClick={() => {
            setProgressState(2);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.branchLabel}
        </h3>
        <h3
          onClick={() => {
            setProgressState(3);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.facilityLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.buildingLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={dataColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default FloorGridComponent;
