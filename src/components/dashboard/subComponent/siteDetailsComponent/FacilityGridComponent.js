import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { FetchFacilitiyService } from '../../../../services/LoginPageService';

const FacilityGridComponent = ({locationDetails, setLocationDetails, setProgressState}) => {
  const facilityColumns = [
    {
      field: 'facilityName',
      headerName: 'Facility Name',
      width: 170,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      width: 170,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      width: 170,
    },
    {
      field: 'totalBuildings',
      headerName: 'Total buildings',
      width: 230,
    },
  ];

  const [dataList, setDataList] = useState([]);

  useEffect(()=>{
    FetchFacilitiyService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
    }, handleSuccess, handleException);
  },[locationDetails]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
  }

  const handleException = (errorObject) => {
  };

  const LinkTo = ({selectedRow}) =>{
    return (
      <h3 onClick={()=>{
        setLocationDetails((oldValue)=>{
          return {...oldValue, facility_id: selectedRow.id};
        })
        setProgressState(3);
      }}>
        {selectedRow.facilityName}
      </h3>
    )
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      FacilityGridComponent
      <DataGrid
        rows={dataList}
        columns={facilityColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
    </div>
  )
}

export default FacilityGridComponent