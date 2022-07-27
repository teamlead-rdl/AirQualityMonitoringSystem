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
function LocationGridComponent(props) {
  const {
    setLocationDetails, setProgressState, setBreadCrumbLabels, setLocationCoordinationList,
    setZoomLevel, setCenterLatitude, setCenterLongitude
  } = props;
  const [dataList, setDataList] = useState([]);
  let { locationIdList } = ApplicationStore().getStorage('alertDetails');
  const [ notificationStatus, setNotificationStatus ] = useState(locationIdList);
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
      width: 170,
      renderCell: ((params) => {
        let element = {
          alertLabel: 'Good',
          alertColor : 'green',
          alertPriority: 4
        }
        let alertObject = notificationStatus?.filter((alert) => {
          return params.row.id === parseInt(alert.id);
        });

        alertObject?.map((data)=>{
          element = element.alertPriority < data.alertPriority ? element : 
            { 
              alertLabel: data.alertType === 'Critical'? 'Critical' : data.alertType === 'outOfRange'? 'Out Of Range' : 'Good',
              alertColor : data.alertType === 'Critical'? 'red' : data.alertType === 'outOfRange'? 'orange' : data.alertType === 'Warning' ? '#9c27b0' : 'green',
              alertPriority: data.alertType === 'Critical'? 1 : data.alertType === 'outOfRange'? 2 : data.alertType === 'Warning' ? 3 : 4
            }
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

  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
    const { locationDetails } = ApplicationStore().getStorage('userDetails');

    setProgressState((oldValue)=>{
      let newValue = 0;
      if(locationDetails.facility_id){
        newValue = 2;
      } 
      else if(locationDetails.branch_id){
        newValue = 1;
      } 
      return newValue;
    });
  }, []);

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
