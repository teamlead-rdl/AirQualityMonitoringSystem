import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import {
  Box, Breadcrumbs, CircularProgress, Typography,
} from '@mui/material';
import {
  PlayArrow, PlayDisabled, Science, Upgrade,
} from '@mui/icons-material';
import { darken, lighten } from '@mui/material/styles';
import { DeviceFetchService } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function DeviceGridComponent({
  locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
}) {
  const columns = [
    {
      field: 'deviceName',
      headerName: 'Device Name',
      width: 150,
    },
    {
      field: 'deviceCategory',
      headerName: 'Device Category',
      width: 120,
    },
    {
      field: 'deviceTag',
      headerName: 'Device Tag',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
    },
    {
      field: 'deviceMode',
      headerName: 'Mode',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      disableClickEventBubbling: true,
      // type: 'actions',
      // cellClassName: 'actions',
      // getActions: (params) => [
      // <ChangeMode selectedRow={params.row} />,
      // ],
    },
    {
      field: 'firmwareVersion',
      headerName: 'Firm Ware',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
    },
    {
      field: 'status',
      type: 'actions',
      headerName: 'Status',
      width: 70,
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <ChangeStatus selectedRow={params.row} />,
      ],
    },
  ];

  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    DeviceFetchService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
      facility_id: locationDetails.facility_id,
      building_id: locationDetails.building_id,
      floor_id: locationDetails.floor_id,
      lab_id: locationDetails.lab_id,
    }, handleSuccess, handleException);
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
  };

  const handleException = () => { };

  const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6));
  const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5));

  function ChangeStatus(props) {
    switch (props.selectedRow.deviceMode) {
    case 'calibration':
      return <Upgrade />;
    case 'firmwareUpgradation':
      return (
        <Box sx={{ width: '50%' }}>
          <CircularProgress color="secondary" style={{ width: 20, height: 20 }} />
        </Box>
      );
    case 'disabled':
      return <PlayDisabled />;
    case 'bumpTest':
      return <Science />;
    default:
      return <PlayArrow />;
    }
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
        <h3 onClick={() => setProgressState(5)} style={{ cursor: 'pointer' }}>
          {breadCrumbLabels.floorLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.lablabel}
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          height: '100%',
          '& .super-app-theme--calibration': {
            color: 'maroon',
            bgcolor: (theme) => getBackgroundColor('#FAE8FA', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor('#FAE8FA', theme.palette.mode),
            },
            ':hover': { backgroundColor: '#FAE8FA' },
          },
          '& .super-app-theme--firmwareUpgradation': {
            color: 'purple',
            bgcolor: (theme) => getBackgroundColor('#9fa8da', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor(
                '#9fa8da',
                theme.palette.mode,
              ),
            },
          },
          '& .super-app-theme--disabled': {
            bgcolor: (theme) => getBackgroundColor('#ffcdd2', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor(
                '#ffcdd2',
                theme.palette.mode,
              ),
            },
          },
          '& .super-app-theme--enabled': {
            bgcolor: (theme) => getBackgroundColor('#A5D6A7', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor(
                '#A5D6A7',
                theme.palette.mode,
              ),
            },
          },
          '& .super-app-theme--bumpTest': {
            color: 'darkgoldenrod',
            bgcolor: (theme) => getBackgroundColor('#FFFCE3', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor('#FFFCE3', theme.palette.mode),
            },
          },
          '& .super-app-theme--config': {
            color: 'green',
            bgcolor: (theme) => getBackgroundColor('#F2FFF2', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor('#F2FFF2', theme.palette.mode),
            },
          },
        }}
      >
        <DataGrid
          rows={deviceList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowClassName={(params) => `super-app-theme--${params.row.deviceMode}`}
          style={{ maxHeight: `${85}%` }}
        />
      </Box>
    </div>
  );
}

export default DeviceGridComponent;
