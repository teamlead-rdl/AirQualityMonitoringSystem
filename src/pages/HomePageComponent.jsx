import { Outlet } from 'react-router-dom';
import Sidebar from "../components/navbarComponent/Sidebar";
import Navbar from "../components/navbarComponent/Navbar";
import "./css/home.scss";
import { UserAccessProvider } from "../context/UserAccessProvider";

const HomePageComponent = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <UserAccessProvider>
          <Outlet />
        </UserAccessProvider>
      </div>
    </div>
  );
};

export default HomePageComponent;