import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { FloorfetchService } from '../../../../services/LoginPageService';

const FloorGridComponent = ({setImg,locationDetails, setLocationDetails, setProgressState}) => {
  const dataColumns = [
    {
      field: 'floorName',
      headerName: 'Floor Name',
      width: 170,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'totalLabs',
      headerName: 'Total Labs',
      width: 230,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
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

  const LinkTo = ({selectedRow}) =>{
    return (
      <h3 onClick={()=>{
        setLocationDetails((oldValue)=>{
          return {...oldValue, floor_id: selectedRow.id};
        })
        setProgressState(5);
        setImg(selectedRow.floorMap);

      }}>
        {selectedRow.floorName}
      </h3>
    )
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      FloorGridComponent
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

export default FloorGridComponent