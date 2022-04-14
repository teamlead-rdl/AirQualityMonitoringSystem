import { Dashboard, Group, BusinessOutlined, LockReset, StoreMallDirectory, Map } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { allowedSidebarItems } from '../../utils/accessRoleUtil';

import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import ApplicationStore from '../../utils/localStorageUtil';

const SidebarItems = {
    "Dashboard Management": [{
        name: "Dashboard",
        route: 'Dashboard',
        icon: <Dashboard className="sidebarIcon" />
    }, {
        name: "User",
        route: 'UserManagement',
        icon: <ChatBubbleOutline className="sidebarIcon" />,
    }, {
        name: "Vendor",
        route: 'Vendor',
        icon: <Group className="sidebarIcon" />,
    }],
    "Customer Management": [{
        name: "Customer",
        route: 'CustomerManagement',
        icon: <BusinessOutlined className="sidebarIcon" />,
    }],
    "Profile Settings": [{
        name: "ChangePassword ",
        route: "ChangePassword",
        icon: <LockReset className="sidebarIcon" />
    }],
    "Site Details": [{
        name: "Location",
        route: 'Location',
        icon: <Map className="sidebarIcon" />
    }],
    "Device Management": [{
        name: "Devices",
        route: 'Device',
        icon: <Storefront className="sidebarIcon" />
    }
    // , {
    //     name: "Add Device ",
    //     route: "AddDevice",
    //     icon: <Group className="sidebarIcon" />
    // }, {
    //     name: "Locate Device ",
    //     route: "DeviceLocation",
    //     icon: <Group className="sidebarIcon" />
    // }
]
};

const DrawerObject = (props) => {
    const allowedItems = allowedSidebarItems();
    const sectionCollection = {};
    for (let section in SidebarItems) {
        const allowedCollection = SidebarItems[section].filter((item) => {
            return allowedItems.indexOf(item.route) > -1 ? true : false;
        });

        if (allowedCollection.length > 0) {
            sectionCollection[section] = allowedCollection;
        }
    }

    const fetchSideBar = (sideBarObject) => {
        let returnObj = [];
        for (let section in sideBarObject) {
            returnObj.push(<div className="sidebarMenu" key={section + "01"}>
                <h3 className="sidebarTitle">{section}</h3>
                <ul className="sidebarList">
                    {sideBarObject[section].map((item, liIndex) => {
                        return (<Link to={item.route} className="link" key={item.name + liIndex}>
                            <li className="sidebarListItem">{item.icon}{item.name}</li>
                        </Link>);
                    })}
                </ul>
            </div>);
        }
        return returnObj;
    }

    const [companyLogo, setCompanyLogo] = useState('https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500');
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    
    useEffect(()=>{
        if(userDetails.companyLogo){
        setCompanyLogo("http://varmatrix.com/Aqms/blog/public/"+userDetails.companyLogo);
        }
    },[]);
    
    return (
        <div className="block">  
        <div className="wrapper" style={{display:'flex'}}>
          <div className="items">
            <div className="">
                <img
                src={companyLogo}
                alt=""
                className="avatar"
                style={{width:200, height:50}}
                />
            </div>
          </div>    
        </div>
        <div className="sidebar" style={{top:0}}>
            <div className="sidebarWrapper">
                {fetchSideBar(sectionCollection)}
            </div>
        </div>
        </div>
    )
}

export { DrawerObject, SidebarItems };