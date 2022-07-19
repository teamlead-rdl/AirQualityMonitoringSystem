import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FloorfetchService } from '../../../../services/LoginPageService';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
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
      width: 170,
      renderCell: ((params) => {
        let element = {
          alertLabel: 'Good',
          alertColor: 'green',
          alertPriority: 3,
        };
        const alertObject = floorIdList?.filter((alert) => {
          return params.row.id === parseInt(alert.id);
        });

        alertObject?.map((data) => {
          element = element.alertPriority < data.alertPriority ? element
            : {
              alertLabel: data.alertType === 'Critical' ? 'Critical' : data.alertType === 'outOfRange' ? 'Out Of Range' : 'Good',
              alertColor: data.alertType === 'Critical' ? 'red' : data.alertType === 'outOfRange' ? 'orange' : 'green',
              alertPriority: data.alertType === 'Critical' ? 1 : data.alertType === 'outOfRange' ? 2 : 3,
            };
        });

        return (
          <Chip
            variant="outlined"
            label={element.alertLabel}
            style={{
              color: element.alertColor,
              borderColor: element.alertColor,
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

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setProgressState((oldValue) => {
      let newValue = value;
      if (locationDetails.facility_id) {
        newValue = 2;
      } else if (locationDetails.branch_id) {
        newValue = 1;
      }
      return newValue;
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            setLocationlabel(0);
            // setProgressState(0);
            setDeviceCoordsList([]);
            // setCenterLatitude(23.500);
            // setCenterLongitude(80.000);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            setLocationlabel(1);
            // setProgressState(1);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3
          onClick={() => {
            setLocationlabel(2);
            // setProgressState(2);
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
