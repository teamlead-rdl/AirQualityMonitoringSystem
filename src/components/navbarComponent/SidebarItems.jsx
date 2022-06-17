import {
  Dashboard, Group, BusinessOutlined, LockReset, Map,
  Storefront,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import allowedSidebarItems from '../../utils/accessRoleUtil';
import ApplicationStore from '../../utils/localStorageUtil';
import defaultCompanyLogo from '../../images/defaultCompanyLogo.png';

const SidebarItems = {
  'Dashboard Management': [{
    name: 'Dashboard',
    route: 'Dashboard',
    icon: <Dashboard className="sidebarIcon" />,
  }, {
    name: 'User',
    route: 'UserManagement',
    icon: <ChatBubbleOutline className="sidebarIcon" />,
  }, {
    name: 'Vendor',
    route: 'Vendor',
    icon: <Group className="sidebarIcon" />,
  }],
  'Customer Management': [{
    name: 'Customer',
    route: 'CustomerManagement',
    icon: <BusinessOutlined className="sidebarIcon" />,
  }],
  'Profile Settings': [{
    name: 'ChangePassword ',
    route: 'ChangePassword',
    icon: <LockReset className="sidebarIcon" />,
  }],
  'Site Details': [{
    name: 'Location',
    route: 'Location',
    icon: <Map className="sidebarIcon" />,
  }],
  'Device Management': [{
    name: 'Devices',
    route: 'Device',
    icon: <Storefront className="sidebarIcon" />,
  },
  ],
};

function DrawerObject() {
  const allowedItems = allowedSidebarItems();
  const sectionCollection = {};
  for (const section in SidebarItems) {
    const allowedCollection = SidebarItems[section].filter((item) => (allowedItems.indexOf(item.route) > -1));

    if (allowedCollection.length > 0) {
      sectionCollection[section] = allowedCollection;
    }
  }

  const fetchSideBar = (sideBarObject) => {
    const returnObj = [];
    for (const section in sideBarObject) {
      returnObj.push(<div className="sidebarMenu" key={`${section}01`}>
        <h3 className="sidebarTitle">{section}</h3>
        <ul className="sidebarList">
          {sideBarObject[section].map((item, liIndex) => (
            <Link to={item.route} className="link" key={item.name + liIndex}>
              <li className="sidebarListItem">
                {item.icon}
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>);
    }
    return returnObj;
  };

  const [companyLogo, setCompanyLogo] = useState(defaultCompanyLogo);
  const { userDetails } = ApplicationStore().getStorage('userDetails');

  useEffect(() => {
    if (userDetails.companyLogo) {
      setCompanyLogo(`http://varmatrix.com/Aqms/blog/public/${userDetails.companyLogo}?${new Date().getTime()}`);
    }
  }, []);

  return (
    <div className="block" >
      <div className="wrapper" style={{ display: 'flex' }}>
        <div className="items">
          <div className="">
            <Link to="Dashboard">
              <img
                src={companyLogo}
                alt=""
                className="avatar"
                style={{ width: 200, height: 50 }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar" style={{ top: 0 }}>
        <div className="sidebarWrapper">
          {fetchSideBar(sectionCollection)}
        </div>
      </div>
    </div>
  );
}

export { DrawerObject, SidebarItems };
