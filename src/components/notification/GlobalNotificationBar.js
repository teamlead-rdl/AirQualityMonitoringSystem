import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import React from 'react';

function GlobalNotifier({ notifierState, setNotifierState }) {
  const handleClose = (e) => {
    e.preventDefault();
    setNotifierState((currentProps) => {
      return { ...currentProps, open: false };
    });
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={notifierState.open}
      // onClose={handleClose}
      message={notifierState.message}
      ContentProps={{ style: { backgroundColor: notifierState.color, color: 'black', height: 100 } }}
      action={action}
    />
  );
}

export default GlobalNotifier;
