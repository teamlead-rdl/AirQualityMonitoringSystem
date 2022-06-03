import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const FacilityGridComponent = ({locationDetails, setLocationDetails, setProgressState}) => {
  const branchColumns = [
    {
      field: 'facilityName',
      headerName: 'Branch Name',
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataList}
        columns={branchColumns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
    </div>
  )
}

export default FacilityGridComponent