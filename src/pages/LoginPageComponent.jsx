import { useState, useContext, useEffect } from 'react';
import loginPageWallpaper from './../images/loginPageWallpaper.svg';
import logo from './../images/logo.svg';
import { LockClosedIcon } from '@heroicons/react/solid'
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthContext from '../context/AuthProvider';
import { LoginService } from '../services/LoginPageService';
import ApplicationStore from '../utils/localStorageUtil';
import { useNavigate } from "react-router-dom";
import { LoginFormValidate } from '../validatation/formValidation';
import NotificationBar from '../components/notification/ServiceNotificationBar';

const LoginPage = () => {
    const successCaseCode = [200, 201];
    const { setUserAuthetication } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const [errorObject, setErrorObject] = useState({});
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'success',
        message: 'Login Successful'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { user_token } = ApplicationStore().getStorage('userDetails');
        return user_token ? navigate(`/`) : {};
    }, []);

    const validateForNullValue = (value, type) => {
        LoginFormValidate(value, type, setErrorObject);
    }

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: ''
        });
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        await LoginService({ email, password })
            .then(response => {
                if (successCaseCode.indexOf(response.status) > 0) {
                    setNotification({
                        status: true,
                        type: 'success',
                        message: 'Login Success'
                    });
                    return response.json();
                } else {
                    throw {
                        errorStatus: response.status,
                        errorObject: response.json()
                    }
                }
            }).then(data => {
                ApplicationStore().setStorage('userDetails', data);
                setUserAuthetication(data.response);
                setTimeout(() => {
                    setLoading(false);
                    if (data.userDetails.secondLevelAuthorization === 'true') {
                        navigate(`/otp`);
                    }
                    else {
                        if (data.userDetails.forcePasswordReset === '0') {
                            navigate(`/`);
                        }
                        else {
                            navigate(`/passwordReset`);
                        }
                    }
                }, 3000);
            }).catch(error => {
                setLoading(false);
                error.errorObject.then(errorResponse => {
                    setNotification({
                        status: true,
                        type: 'error',
                        message: errorResponse.error ? errorResponse.error : errorResponse.message
                    });
                });
            });
    }

    return (
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-2 mb-4 ml-4 mt-4">
            <div className="ml-4 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  hidden sm:block">
                <div className="max-w-md w-full space-y-8">
                    <img className="ml-20 flex item-right mt-16 hidden sm:block " src={loginPageWallpaper} />
                </div>
            </div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-2 space-y-6" onSubmit={onFormSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className='mb-2'>
                                <TextField
                                    label="Email Id"
                                    type="email"
                                    value={email}
                                    variant="outlined"
                                    placeholder="Email address"
                                    className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                                    required
                                    onBlur={() => validateForNullValue(email, 'email')}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    autoComplete="off"
                                    error={errorObject?.emailId?.errorStatus}
                                    helperText={errorObject?.emailId?.helperText}
                                />
                            </div>
                            <div className='mt-2'>
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    variant="outlined"
                                    placeholder="Password"
                                    className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    required
                                    error={errorObject?.password?.errorStatus}
                                    helperText={errorObject?.password?.helperText}
                                    onBlur={() => validateForNullValue(password, 'password')}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className=" h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-red-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm"></div>
                        </div>
                        <div>
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white-500 hover:bg-red-100 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-red-100 outline outline-offset-2 outline-2 outline-red-500"
                                disabled={errorObject?.emailId?.errorStatus || errorObject?.password?.errorStatus}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-white-500 group-hover:text-red-500 r-red" aria-hidden="true" />
                                </span>
                                Sign in
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </div>
            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type} />
        </div>
    );
}

export default LoginPage;