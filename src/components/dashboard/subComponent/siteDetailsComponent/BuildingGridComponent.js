import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { BuildingFetchService } from '../../../../services/LoginPageService';

const BuildingGridComponent = ({locationDetails, setLocationDetails, setProgressState, setLocationCoordinationList, centerLat, centerLng}) => {
  const dataColumns = [
    {
      field: 'buildingName',
      headerName: 'Building Name',
      width: 170,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'buildingTotalFloors',
      headerName: 'Total Floors',
      width: 230,
    },
    {
      field: 'buildingTag',
      headerName: 'Building Tag',
      width: 230,
    },
  ];
  const [dataList, setDataList] = useState([]);

  useEffect(()=>{
    BuildingFetchService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
      facility_id: locationDetails.facility_id,
    }, handleSuccess, handleException);
  },[locationDetails]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.buildingName,
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

  const LinkTo = ({selectedRow}) =>{
    return (
      <h3 onClick={()=>{
        setLocationDetails((oldValue)=>{
          return {...oldValue, building_id: selectedRow.id};
        })
        setProgressState(4);
      }}>
        {selectedRow.buildingName}
      </h3>
    )
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      BuildingGridComponent
      <DataGrid
        rows={dataList}
        columns={dataColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
      </div>
  )
}

export default BuildingGridComponent