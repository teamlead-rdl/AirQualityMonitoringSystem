import { Breadcrumbs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { LabfetchService } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function LabGridComponent({
  setImg, locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
}) {
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

  const handleException = () => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3 style={{cursor: 'pointer'}} onClick={() => {
        setLocationDetails((oldValue) => {
          return { ...oldValue, lab_id: selectedRow.id };
        });

        setBreadCrumbLabels((oldvalue) => {
          return { ...oldvalue, lablabel: selectedRow.labDepName };
        });

        setProgressState(6);
        setImg(selectedRow.labDepMap);
      }}
      >
        {selectedRow.labDepName}
      </h3>
    );
  }
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3 onClick={() => setProgressState(0)} style={{ cursor: 'pointer' }}>
          Location
        </h3>
        <h3 onClick={() => setProgressState(1)} style={{ cursor: 'pointer' }}>
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3 onClick={() => setProgressState(2)} style={{ cursor: 'pointer' }}>
          {breadCrumbLabels.branchLabel}
        </h3>
        <h3 onClick={() => setProgressState(3)} style={{ cursor: 'pointer' }}>
          {breadCrumbLabels.facilityLabel}
        </h3>
        <h3 onClick={() => setProgressState(4)} style={{ cursor: 'pointer' }}>
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
  );
}

export default LabGridComponent;
