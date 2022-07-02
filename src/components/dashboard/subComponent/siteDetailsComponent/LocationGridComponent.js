import { Breadcrumbs, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { FetchLocationService } from '../../../../services/LoginPageService';
import ApplicationStore from '../../../../utils/localStorageUtil';

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
function LocationGridComponent({
  locationDetails, setLocationDetails, setProgressState, setBreadCrumbLabels, setLocationCoordinationList,
  setZoomLevel, setCenterLatitude, setCenterLongitude,
}) {
  const [dataList, setDataList] = useState([]);
  const { locationIdList } = ApplicationStore().getStorage('alertDetails');
  const columns = [
    {
      field: 'stateName',
      headerName: 'Location Name',
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
        alertObject = locationIdList?.find((alert) => {
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
  const [alertType, setAlertType] = useState('Normal');

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
  }, []);

  useEffect(() => {
    setAlertType('');
  }, [locationIdList]);
  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setLocationDetails((oldValue) => {
            return { ...oldValue, location_id: selectedRow.id };
          });

          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, stateLabel: selectedRow.stateName };
          });
          setProgressState(1);
          const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
          setCenterLatitude(parseFloat(coordList[0]));
          setCenterLongitude(parseFloat(coordList[1]));
        }}
      >
        {selectedRow.stateName}
      </h3>
    );
  }
  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.stateName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
    setZoomLevel(4);
  };

  const handleException = (errorObject) => {
  };

  const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.1));

  const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.1));

  return (
    <div style={{ height: '100%', width: '100%', paddingRight: 2 }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3>
          Location
        </h3>
      </Breadcrumbs>

      {/* <GridStylingWrapper
        dataList={dataList}
        columns={columns}
        locationIdList={locationIdList}
      /> */}
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
        // getRowClassName={(params) => {
        //   let alertObject = {alertType: 'Normal'};
        //   alertObject = locationIdList?.find((alert)=>{
        //     return alert.id == params.row.id;
        //   });
        //   // console.log(alertObject);
        //   return `super-app-theme--${alertObject?.alertType}`
        // }}
      />
    </div>
  );
}

export default LocationGridComponent;
