import { useEffect, useRef, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Typography, Grid, CardContent, TextField, Card, Button, Snackbar, Alert } from '@mui/material';
import { ReceiveOTPService, ValidateOTPService } from './../../services/LoginPageService';
import { OTPvalidationValidate } from './../../validatation/formValidation';
import { useNavigate } from 'react-router-dom';
import NotificationBar from '../notification/ServiceNotificationBar';
import ApplicationStore from '../../utils/localStorageUtil';

// var email = "ra******@rdltech.in";

const OTPvalidate = (props) => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null); 
  const validateRef = useRef(null); 
  const [open, setOpen] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [isButtonDisabled,setButtonDisabled] =useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });
  useEffect(()=>{
    setEmail(props.email);
    setPhone(props.phone);
  });
  const validateForNullValue = (value) => {
    OTPvalidationValidate(value, setErrorObject);
  };

  const handleSuccess = (data) => {
    setNotification({
      status: true,
      type: 'success',
      message: 'User Authentication Successfull..!'
    });
    setTimeout(() => {
      const { userDetails } = ApplicationStore().getStorage('userDetails');
      if(userDetails.forcePasswordReset === '0'){
        navigate('/');
      }
      else{
        navigate('/passwordReset');
      }
    }, 3000);
  };
  
  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const otpGen = otp1 + otp2 + otp3 + otp4;
    ValidateOTPService({otp: otpGen, email: props.email, phone: props.phone}, handleSuccess, handleException);
  };

  const onButtonResend = () => {
    setOpen(true);
    otp1Ref.current.value = '';
    otp2Ref.current.value = '';
    otp3Ref.current.value = '';
    otp4Ref.current.value = '';
    setButtonDisabled(true);
    setTimeout(()=>setButtonDisabled(false),60000);
    ReceiveOTPService({email: props.email, mobileno :props.phone }, handleResetSuccess, handleResetException);
  };

  const handleResetSuccess = (data) => {
    setNotification({
      status: true,
      type: 'success',
      message: 'OTP has been sent to the above email/phone no.'
    });
  };
  
  const handleResetException = (statusCode, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: ''
    });
  };

  const textFieldStyle = {
    padding: 7,
    fontSize: '1rem',
    width: '3rem',
    height: '3rem',
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
                <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                  Please Enter the OTP
                </h2>
                <h5 className="mt-6 text-center  font-extrabold text-gray-900">
                </h5>
                <p className="mt-2 text-center text-sm text-gray-600"></p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="container inline">
                    <TextField
                      id="otp1"
                      type="number"
                      variant="outlined"
                      inputRef={otp1Ref}
                      inputProps={{
                        style: textFieldStyle,
                        tabIndex: '1'
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                      }}
                      onChange={(e) => {
                        setOtp1(e.target.value);
                        {otp1Ref.current.value == '' ? otp1Ref.current.focus() : otp2Ref.current.focus();}
                      }}
                      onBlur={() => validateForNullValue(otp1)}
                      error={errorObject?.otp?.errorStatus}
                    />
                    <span className="otpSeparator"> - </span>
                    <TextField
                      type="number"
                      id="otp2"
                      variant="outlined"
                      inputRef = {otp2Ref}
                      inputProps={{
                        style: textFieldStyle,
                        tabIndex: '2'
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                      }}
                      onChange={(e) => {
                        setOtp2(e.target.value);
                        {otp2Ref.current.value == '' ? otp1Ref.current.focus() : otp3Ref.current.focus();}
                      }}
                      onBlur={() => validateForNullValue(otp2)}
                      error={errorObject?.otp?.errorStatus}
                    />
                    <span className="otpSeparator"> - </span>
                    <TextField
                      type="number"
                      id="otp3"
                      inputRef = {otp3Ref}
                      variant="outlined"
                      inputProps={{
                        style: textFieldStyle,
                        tabIndex: '3'
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                      }}
                      onChange={(e) => {
                        setOtp3(e.target.value);
                        {otp3Ref.current.value == '' ? otp2Ref.current.focus() : otp4Ref.current.focus();}
                      }}
                      onBlur={() => validateForNullValue(otp3)}
                      error={errorObject?.otp?.errorStatus}
                    />
                    <span className="otpSeparator"> - </span>
                    <TextField
                      type="number"
                      id="otp4"
                      variant="outlined"
                      inputRef = {otp4Ref}
                      inputProps={{
                        style: textFieldStyle,
                        tabIndex: '4'
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                      }}
                      onChange={(e) => {
                        setOtp4(e.target.value);
                        {otp4Ref.current.value == '' ? otp3Ref.current.focus() : validateRef.current.focus();}
                      }}
                      onBlur={() => validateForNullValue(otp4)}
                      error={errorObject?.otp?.errorStatus}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    ref = {validateRef}
                    type="submit"
                    variant="outlined"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white-500 hover:bg-red-100 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-red-100 outline outline-offset-2 outline-2 outline-red-500"
                    disabled={
                      errorObject?.otp?.errorStatus
                    }
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-white-500 group-hover:text-red-500 r-red"
                        aria-hidden="true"
                      />
                    </span>
                    Validate
                  </Button>
                </div>
                <div>
                  <Typography>
                    Didn't get the code?
                    <Button
                      type="button"
                      onClick={onButtonResend}
                      className="border border-transparent hover:bg-red-100 bold"
                      disabled={isButtonDisabled}
                    >
                      Resend
                    </Button>
                  </Typography>
                  <Typography>
                    Change the authentication option?
                    <Button
                      type="button"
                      onClick={()=>{props.progress(1);}}
                      className="border border-transparent hover:bg-red-100 bold"
                    >
                      Go Back
                    </Button>
                  </Typography>
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
        type={openNotification.type} />
    </Grid>
  );
};
export default OTPvalidate;
