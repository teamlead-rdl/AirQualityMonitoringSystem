import { Button, Snackbar } from '@mui/material';
import React from 'react';

function GlobalNotifier({
  notifierState, setNotifierState, setAnchorElNotification,
}) {
  const handleClose = (e) => {
    e.preventDefault();
    setNotifierState((currentProps) => {
      return { ...currentProps, open: false };
    });
  };

  const handleMenu = (e) => {
    setNotifierState((currentProps) => {
      return { ...currentProps, open: false };
    });
    setAnchorElNotification({ ...e.currentTarget, top: '16px', left: '708px' });
  };

  const action = (
    <>
      <Button
        variant="text"
        onClick={handleMenu}
        style={{ color: 'white', textTransform: 'none' }}
      >
        Go
      </Button>
      <Button
        onClick={handleClose}
        variant="contained"
        style={{ backgroundColor: '#cfd8dc', color: 'black', textTransform: 'none' }}
      >
        Ignore
      </Button>
      {/* <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton> */}
    </>
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
