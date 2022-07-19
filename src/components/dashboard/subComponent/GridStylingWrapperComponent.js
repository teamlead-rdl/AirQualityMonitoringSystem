import React from 'react';
import { Box } from '@mui/material';
import { darken, lighten } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

function GridStylingWrapper({ dataList, columns, locationIdList }) {
  const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.1));

  const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.1));

  return (
    <Box
      sx={{
        height: '100%',
        // maxHeight: `${100}%`,
        '& .super-app-theme--Critical': {
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
        '& .super-app-theme--Kerala1': {
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
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
        getRowClassName={(params) => {
          let alertObject = { alertType: 'Normal' };
          alertObject = locationIdList?.find((alert) => {
            return alert.id == params.row.id;
          });
          // console.log(alertObject);
          return `super-app-theme--${alertObject?.alertType}`;
        }}
      />
    </Box>
  );
}

export default GridStylingWrapper;
