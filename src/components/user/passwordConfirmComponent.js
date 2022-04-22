import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import React from 'react';

function ConfirmPassword({
  open, passwordSubmit, setConfirmPassword, setBtnReset,
}) {
  return (
    <Dialog
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        Confirm your password
      </DialogTitle>
      <DialogContent>
        <form onSubmit={passwordSubmit}>
          <div className="col-span-6 sm:col-span-2 lg:col-span-2 ">
            <div className="inline">
              <TextField
                placeholder="Enter your password"
                type="password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-3 ml-2 float-right">
            <Button
              onClick={() => {
                setBtnReset(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmPassword;
