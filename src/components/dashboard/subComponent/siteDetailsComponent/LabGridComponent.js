import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { LabfetchService } from '../../../../services/LoginPageService';

const LabGridComponent = ({locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels}) => {
  const [dataList, setDataList] = useState([]);

  const dataColumns = [
    {
      field: 'labDepName',
      headerName: 'Lab Name',
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
  useEffect(() => {
    LabfetchService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
      facility_id: locationDetails.facility_id,
      building_id: locationDetails.building_id,
      floor_id: locationDetails.floor_id,
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
          return {...oldValue, lab_id: selectedRow.id};
        });
        setBreadCrumbLabels((oldvalue)=>{
          return { ...oldvalue, lablabel: selectedRow.labDepName}
        });
        setProgressState(6);
      }}>
        {selectedRow.labDepName}
      </h3>
    )
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      LabGridComponent
      <Breadcrumbs aria-label="breadcrumb" separator="›">
          <h3>
            Location
          </h3>
          <h3>
            {breadCrumbLabels.stateLabel}
          </h3>
          <h3>
            {breadCrumbLabels.branchLabel}
          </h3>
          <h3>
            {breadCrumbLabels.facilityLabel}
          </h3>
          <h3>
            {breadCrumbLabels.buildingLabel}
          </h3>
          <Typography
            underline="hover"
            color="inherit"
          >
          {breadCrumbLabels.floorLabel}
        </Typography>
      </Breadcrumbs>
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



export default LabGridComponent