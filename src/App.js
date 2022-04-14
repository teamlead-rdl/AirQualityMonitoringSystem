import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPageComponent';
import OneTimePassword from './pages/OneTimePasswordComponent';
import HomePage from './pages/HomePageComponent';
import VendorManagement from './pages/VendorComponent'
import ForcePasswordReset from './pages/ForcePasswordResetComponent';
import CategoryManagement from './pages/CategoryManagementComponent';
import CustomerManagement from "./pages/CustomerComponent";
import UserManagement from "./pages/UserComponent";
import SiteDetails from './pages/SiteDetailsComponent';

import Dashboard from './components/DashboardComponent';
import Branch from './components/BranchComponent';
import Facility from './components/FacilityComponent';
import Building from './components/BuildingComponent';
import Floor from './components/FloorComponent';
import Lab from './components/LabComponent';
import UserResetPassword from './components/UserResetPassword';
import DeviceLocation from './components/DeviceLocationComponent';
import AddDeviceSensor from './components/AddDeviceSensorComponent';

import ApplicationStore from './utils/localStorageUtil';
import AuthContext from './context/AuthProvider';

const ProtectedRoutes = () => {
  const { user_token } = ApplicationStore().getStorage('userDetails');
  return user_token ? <Outlet /> : <Navigate replace to="/login" />;
}

const App = () => {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/otp" element={<OneTimePassword />} />
              <Route path="/passwordReset" element={<ForcePasswordReset />} /> 
              <Route path="/" element={<HomePage />}>
                <Route path="CustomerManagement/*" element={<CustomerManagement />}/>
                <Route path="UserManagement/*" element={<UserManagement />}/>
                <Route path="Vendor/*" element={<VendorManagement/>}/>
                <Route path="ChangePassword/*" element={<UserResetPassword />}/>
                <Route path="Dashboard/*" element={<Dashboard/>}/>
                <Route path="Location/*" element={<SiteDetails/>}/>
                <Route path="Location/:locationId" element={<Branch/>}/>
                <Route path="Location/:locationId/:locationId" element={<Facility/>}/>
                <Route path="Location/:locationId/:locationId/:locationId/*" element={<Building/>}/>
                <Route path="Location/:locationId/:locationId/:locationId/:locationId/*" element={<Floor/>}/>
                <Route path="Location/:locationId/:locationId/:locationId/:locationId/:locationId/*" element={<Lab/>}/> 
                <Route path="Location/:locationId/:locationId/:locationId/:locationId/:locationId/:locationId/*" element={<AddDeviceSensor/>}/>
                <Route path="Device/*" element={<CategoryManagement/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;