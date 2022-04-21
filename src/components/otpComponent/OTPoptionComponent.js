import { useEffect, useState } from 'react';
import {
  TextField, Card, CardContent, Grid, Button,
} from '@mui/material';
import { LockClosedIcon } from '@heroicons/react/solid';
import LoadingButton from '@mui/lab/LoadingButton';
import { OTPoptionValidate } from '../../validation/formValidation';
import { ReceiveOTPService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

function OTPoption(props) {
  const [email, setUserEmail] = useState('');
  const [mobileno, setUserPhone] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (email) {
      setSubmitDisabled(false);
    }
    if (mobileno) {
      setSubmitDisabled(false);
    }
  }, [email, mobileno]);

  const validateForNullValue = (value, type) => {
    OTPoptionValidate(value, type, setErrorObject);
  };

  const handleSuccess = (data) => {
    props.setEmail(email);
    props.setphone(mobileno);
    setNotification({
      status: true,
      type: 'success',
      message: 'OTP has been sent to the above email/phone no.',
    });
    setLoading(false);
    setTimeout(() => {
      props.progress(2);
    }, 3000);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
    setLoading(false);
  };
  const handleException = (statusCode, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // if (email && mobileno) {
    //   setNotification({
    //     status: true,
    //     type: 'error',
    //     message: 'Please enter at least one option'
    //   });
    //   return false;
    // } else {
    setLoading(true);
    ReceiveOTPService({ email, mobileno }, handleSuccess, handleException);
    // }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Card
        variant="outlined"
        className="margin-center items-center justify-center mt-2"
      >
        <CardContent>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  AUTHENTICATION
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600" />
              </div>
              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <TextField
                      label="Email Id"
                      type="email"
                      variant="outlined"
                      placeholder="Email address"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      autoComplete="off"
                      value={email}
                      onBlur={() => validateForNullValue(email, 'email')}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                      error={errorObject?.emailId?.errorStatus}
                      helperText={errorObject?.emailId?.helperText}
                    />
                  </div>
                  <h5 className="mt-6 text-center font-extrabold text-gray-900">
                    Or
                  </h5>
                  <div>
                    <TextField
                      label="Phone"
                      maxLength="10"
                      type="number"
                      variant="outlined"
                      placeholder="Phone Number"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      autoComplete="off"
                      value={mobileno}
                      // disabled={true}
                      onBlur={() => validateForNullValue(mobileno, 'phone')}
                      onChange={(e) => {
                        setUserPhone(e.target.value);
                      }}
                      error={errorObject?.phone?.errorStatus}
                      helperText={errorObject?.phone?.helperText}
                    />
                  </div>
                </div>
                <div>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white-500 hover:bg-red-100 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-red-100 outline outline-offset-2 outline-2 outline-red-500"
                    disabled={submitDisabled || errorObject?.emailId?.errorStatus || errorObject?.phone?.errorStatus}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-white-500 group-hover:text-red-500 r-red" />
                    </span>
                    Get OTP
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Grid>
  );
}
export default OTPoption;
