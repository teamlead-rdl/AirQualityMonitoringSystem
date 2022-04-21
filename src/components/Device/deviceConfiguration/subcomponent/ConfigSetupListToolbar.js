import React from 'react';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function ConfigSetupListToolbar(props) {
  return (
    <Box
      sx={{
        mb: '0px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
        component="span"
      >
        Config Profiles
      </Typography>
      {props.userAccess.add && (
        <Box
          sx={{ m: 1 }}
          onClick={() => {
            props.setIsAddButton(true);
            props.setEditConfigSetup([]);
            props.setOpen(true);
          }}
        >
          <Stack direction="row" spacing={2}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Config Setup
            </Fab>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
