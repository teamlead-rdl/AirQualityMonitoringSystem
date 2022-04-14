import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export const AddSensorCategoryToolbar = (props) => (
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
        sx={{ m: 0 }}
        variant="h5"
      >
      Sensor List
      </Typography>
      {props.userAccess.add && <Box sx={{ m: 0 }}
        onClick={()=>{
            props.setIsAddButton(true);
            props.setEditCategory([]);
            props.setOpen(true);
        }}
      >
        <Stack direction="row" spacing={2}>
          <Fab variant="extended" size="medium" color="primary" aria-label="add">
            <AddIcon sx={{ mr: 1 }} 
              
            />
            Add Sensor
          </Fab>
        </Stack>
      </Box>}
    </Box>
);




