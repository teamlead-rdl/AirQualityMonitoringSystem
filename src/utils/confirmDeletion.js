import { WarningAmber } from '@mui/icons-material';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import React from 'react';

export default function DeleteConfirmationDailog(props) {
  function onSubmit() {
    props.setOpen(false);
    props.deleteService(props.deleteId, props.handleSuccess, props.handleException);
  }
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      open={props.open}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <WarningAmber color="warning" style={{ fontSize: 95 }} />
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography
          sx={{ m: 1 }}
          variant="h5"
          component="span"
        >
          Do you really want to delete this record?
        </Typography>
        <br />
        This process cannot be undone.
      </DialogContent>
      <DialogActions sx={{ margin: '10px' }}>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => { onSubmit(); }}>
            Confirm
          </Button>
          <Button
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
