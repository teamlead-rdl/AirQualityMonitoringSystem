import React from 'react';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const DeviceListToolbar = (props) => {
  return (
    <Box
      sx={{
        mb: '10px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 0
      }}
    >
      <Typography
        sx={{ m: 0 }}
        variant="h5" >
        Device
      </Typography>
      <Box sx={{ m: 0 }}
        onClick ={()=>{
          props.setIsAddButton(true);
          props.setEditDevice([]);
          props.setOpen(true);
        }}
      >
        <Stack direction="row" spacing={2}>
          <Fab variant="extended" size="medium" color="primary" aria-label="add">
            <AddIcon sx={{ mr: 1 }} />
              Add Device
          </Fab>
        </Stack>
      </Box>
    </Box>
  );
};

export default DeviceListToolbar;