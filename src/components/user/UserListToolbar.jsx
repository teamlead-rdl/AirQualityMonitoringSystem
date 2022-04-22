import {
  Box,
  Typography,
} from '@mui/material';

import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function UserListToolbar(props) {
  return (
    <Box
      sx={{
        mb: '10px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
      >
        User Management
      </Typography>
      {props.userAccess.add && (
        <Box sx={{ m: 1 }}>
          <Stack direction="row" spacing={2}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              onClick={() => {
                props.setIsAddButton(true);
                props.setEditUser([]);
                props.setOpen(true);
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add User
            </Fab>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
