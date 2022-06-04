<<<<<<< HEAD
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { FetchLocationService } from '../../../../services/LoginPageService';

const LocationGridComponent = ({locationDetails, setLocationDetails, setProgressState , setLocationCoordinationList, centerLat, centerLng}) => {
  const [dataList, setDataList] = useState([]);

  const columns = [
    {
      field: 'stateName',
      headerName: 'Location Name',
      width: 270,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'totalBuildings',
      headerName: 'Total Branches',
      width: 150,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
    },
  ];
  useEffect(()=>{
    FetchLocationService(handleSuccess, handleException);
  },[]);

  const LinkTo = ({selectedRow}) =>{
    return (
      <h3 onClick={()=>{
        setLocationDetails((oldValue)=>{
          return {...oldValue, location_id: selectedRow.id};
        })
        setProgressState(1);
      }}>
        {selectedRow.stateName}
      </h3>
    )
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
  }

  const handleException = (errorObject) => {
  };
  return (
    <div style={{ height: 400, width: '100%' }}>LocationGridComponent
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${70}%` }}
      />
    </div>
  )
}

=======
import { Breadcrumbs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { FetchLocationService } from '../../../../services/LoginPageService';

const LocationGridComponent = ({locationDetails, setLocationDetails, setProgressState, setBreadCrumbLabels}) => {
  const [dataList, setDataList] = useState([]);

  const columns = [
    {
      field: 'stateName',
      headerName: 'Location Name',
      width: 270,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'totalBuildings',
      headerName: 'Total Branches',
      width: 150,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
    },
  ];
  useEffect(()=>{
    FetchLocationService(handleSuccess, handleException);
  },[]);

  const LinkTo = ({selectedRow}) =>{
    return (
      <h3 onClick={()=>{
        setLocationDetails((oldValue)=>{
          return {...oldValue, location_id: selectedRow.id};
        });
        
        setBreadCrumbLabels((oldvalue)=>{
          return { ...oldvalue, stateLabel: selectedRow.stateName}
        });

        setProgressState(1);
      }}>
        {selectedRow.stateName}
      </h3>
    )
  }
  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
  }

  const handleException = (errorObject) => {
  };
  return (
    <div style={{ height: 400, width: '100%' }}>LocationGridComponent
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      <h3>
        Location
      </h3>
    </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${70}%` }}
      />
    </div>
  )
}

>>>>>>> cbd4b2f89c1ce32598d4cfb29720f7ee4ad749b5
export default LocationGridComponent