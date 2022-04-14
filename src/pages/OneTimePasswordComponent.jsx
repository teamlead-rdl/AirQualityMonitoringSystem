import { useEffect, useState } from "react"
import OTPoption from "../components/otpComponent/OTPoptionComponent";
import OTPvalidate from "../components/otpComponent/OTPvalidateComponent";
import ApplicationStore from '../utils/localStorageUtil';
import { useNavigate } from 'react-router-dom';

const OneTimePassword = () => {
    const [progressStatus, setStatus] = useState(1);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setphone] = useState('');

    useEffect((props) => {
        const {userDetails} = ApplicationStore().getStorage('userDetails');
        // if (!JSON.parse(userDetails?.secondLevelAuthorization)) {
        //     navigate(`/`);
        // }
    });

    return (
        <>
            {progressStatus === 1 && <OTPoption progress={setStatus} setEmail={setEmail} setphone={setphone}/>}
            {progressStatus === 2 && <OTPvalidate progress={setStatus} email={email} phone={phone}/>}
        </>
    )
}

export default OneTimePassword;