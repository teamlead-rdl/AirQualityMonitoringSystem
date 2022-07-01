import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchBranchService } from '../../../../services/LoginPageService';
import ApplicationStore from '../../../../utils/localStorageUtil';

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */

function BranchGridComponent({
  locationDetails, setLocationDetails, setProgressState, breadCrumbLabels,
  setBreadCrumbLabels, setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList,
  setZoomLevel, setCenterLatitude, setCenterLongitude,
}) {
  const [dataList, setDataList] = useState([]);
  const { branchIdList } = ApplicationStore().getStorage('alertDetails');
  const branchColumns = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
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
        alertObject = branchIdList?.find((alert) => {
          return params.row.id === parseInt(alert.id);
        });
        let alertLabel = 'Good';
        let alertColor = 'green';
        switch (alertObject?.alertType) {
        case 'Critical': alertLabel = 'Critical';
          alertColor = 'red';
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
  useEffect(() => {
    FetchBranchService({
      location_id: locationDetails.location_id,
    }, handleSuccess, handleException);
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
    setProgressState(1);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.branchName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
    setZoomLevel(6);
  };

  const handleException = (errorObject) => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          setLocationDetails((oldValue) => {
            return { ...oldValue, branch_id: selectedRow.id };
          });
          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, branchLabel: selectedRow.branchName };
          });
          setProgressState(2);
          const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
          setCenterLatitude(parseFloat(coordList[0]));
          setCenterLongitude(parseFloat(coordList[1]));
        }}
      >
        {selectedRow.branchName}
      </h3>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setProgressState(0);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
        >
          Location
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.stateLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={branchColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default BranchGridComponent;
