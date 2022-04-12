import React from 'react';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export const VendorListToolbar = (props) => {
  return (
    <Box
      sx={{
        mb: '10px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
      >
            Vendors
      </Typography>
      {props.userAccess.add && <Box sx={{ m: 1 }}
        onClick ={()=>{
          props.setIsAddButton(true);
          props.setEditVendor([]);
          props.setOpen(true);
        }}
      >
        <Stack direction="row" spacing={2}>
          <Fab variant="extended" size="medium" color="primary" aria-label="add">
            <AddIcon sx={{ mr: 1 }} />
              Add Vendor
          </Fab>
        </Stack>
      </Box>}
    </Box>
  );
};
