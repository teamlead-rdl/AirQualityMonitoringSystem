import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function NotificationBar(props) {
  return (
    <Snackbar open={props.openNotification} autoHideDuration={props.hideLimit || 10000} onClose={props.handleClose}>
      <Alert onClose={props.handleClose} severity={props.type} sx={{ width: '100%' }}>
        {props.notificationContent}
      </Alert>
    </Snackbar>
  );
}
