import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { BuildingFetchService } from '../../../../services/LoginPageService';

const BuildingGridComponent = ({locationDetails, setLocationDetails, setProgressState}) => {
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
  },[]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
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