import React, { useState } from "react";
import {
  Button,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { PasswordResetValidate } from "../validatation/formValidation";
import { PasswordResetService } from "../services/LoginPageService";
import { Box } from "@mui/system";
import { LogoutService } from "../services/LoginPageService";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ApplicationStore from '../utils/localStorageUtil';
import NotificationBar from '../components/notification/ServiceNotificationBar';

const UserResetPassword = (props) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldpassword] = useState(false);
  const [showNewPassword, setShowNewpassword] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [openNotification, setNotification] = useState({
    status: false,
    type: '',
    message: ''
  });
  
  const validateForNullValue = (value, type) => {
    PasswordResetValidate(value, type, setErrorObject);
  };

  const handleSuccess = (data) => {
    setNotification({
      status: true,
      type: 'success',
      message: 'Password has been successfully updated. Please relogin.'
    });
    setTimeout(() => {
      LogoutService(logoutSuccessCallback, logoutErrorCallBack);
    }, 2000);
  };

  const handleException = (errorStatus, errorMessage) => {
      setNotification({
          status: true,
          type: 'error',
          message: errorMessage
      });
  };

  const logoutSuccessCallback = (data) => {
    ApplicationStore().setStorage('userDetails', '');
    navigate(`/login`);
  };

  const logoutErrorCallBack = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorObject((oldData) => {
        let status = {
          errorStatus: true,
          helperText: "Password does not matched",
        };
        return {
          ...oldData,
          confirmPassword: status,
        };
      });
    } else {
      PasswordResetService({ oldPassword, newPassword }, handleSuccess, handleException);
    }
  };

  const handleNotificationClose = () => {
    setNotification({
        status: false,
        type: '',
        message: ''
    });
  }

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorObject({});
    setShowOldpassword(false);
    setShowNewpassword(false);
  }
  return (
    <div className="w-full max-w-lg" style={{ marginTop: props.padding || 0 }}>
      <form
        className="shadow-md px-0 pt-0 pb-1 mb-0 ml-2 mt-2"
        onSubmit={handleSubmit}
      >
        <DialogContent sx={{ px: 1, p: 1 }}>
          <Box
            sx={{
              mb: "1px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography sx={{ m: 1 }} variant="h5">
              Change Password
            </Typography>
          </Box>
          <div className="mb-4 ">
            <TextField
              margin="dense"
              id="outlined-required"
              label="Old Password"
              type={showOldPassword ? 'text' : 'password'}
              fullWidth
              value={oldPassword}
              required
              onBlur={() => {
                validateForNullValue(oldPassword, "oldPassword");
                setShowOldpassword(false);
              }}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              autoComplete="off"
              error={errorObject?.oldPassword?.errorStatus}
              helperText={errorObject?.oldPassword?.helperText}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      setShowOldpassword(!showOldPassword);
                    }}
                    onMouseDown={(e) => { e.preventDefault(); }}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }}
            />
          </div>
          <div className="mb-4 ">
            <TextField
              id="dense"
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              required
              onBlur={() => {
                validateForNullValue(newPassword, "newPassword");
                setShowNewpassword(false);
              }}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              autoComplete="off"
              error={errorObject?.newPassword?.errorStatus}
              helperText={errorObject?.newPassword?.helperText}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      setShowNewpassword(!showNewPassword);
                    }}
                    onMouseDown={(e) => { e.preventDefault(); }}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }}
            />

          </div>
          <div className="mb-4 ">
            <TextField
              id="dense"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              fullWidth
              required
              value={confirmPassword}
              onBlur={() =>
                validateForNullValue(confirmPassword, "confirmPassword")
              }
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              autoComplete="off"
              error={errorObject?.confirmPassword?.errorStatus}
              helperText={errorObject?.confirmPassword?.helperText}
            />
          </div>
          <div className="mt-3 ml-2 float-right">
            <Button
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              disabled={
                errorObject?.confirmPassword?.errorStatus ||
                errorObject?.newPassword?.errorStatus ||
                errorObject?.oldPassword?.errorStatus
              }
              type="submit"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </form>
      <NotificationBar
        handleClose={handleNotificationClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type} />
    </div>
  );
};

export default UserResetPassword;