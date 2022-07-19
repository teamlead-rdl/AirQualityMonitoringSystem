import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid } from '@mui/material';
import SitesReportForm from './SitesReportForm';
import Alarm from './Alarm';
import ServerUtilization from './ServerUtilization';
import FirmwareVersion from './FirmwareVersion';
import BumpTest from './BumpTest';
import IndividualReportForm from './IndividualReportForm';
import AqmiLog from './AqmiLog';
import SensorLog from './SensorLog';

import {
    FetchLocationService,
    FetchBranchService,
    FetchFacilitiyService,
    BuildingFetchService,
    FloorfetchService,
    LabfetchService,
    DeviceFetchService
} from '../../services/LoginPageService'

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ManagementReportTab() {
    const [location_id, setLocation_id] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [branch_id, setBranch_id] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [facility_id, setFacility_id] = useState('');
    const [facilityList, setFacilityList] = useState([]);
    const [building_id, setBuilding_id] = useState('');
    const [buildingList, setBuildingList] = useState([]);
    const [floor_id, setFloor_id] = useState('');
    const [floorList, setFloorList] = useState([]);
    const [lab_id, setLab_id] = useState('');
    const [labList, setLabList] = useState([]);
    const [device_id, setDevice_id] = useState('');
    const [deviceList, setDeviceList] = useState([]);

    useEffect(() => {
        loadLocation();
    }, []);

    const loadLocation = () => {
        FetchLocationService(LocationHandleSuccess, LocationHandleException);
    };

    const LocationHandleSuccess = (dataObject) => {
        setLocationList(dataObject.data);
    }
    const LocationHandleException = () => { };

    const LocationChanged = (location_id) => {
        setLocation_id(location_id);
        FetchBranchService({ location_id }, BranchHandleSuccess, BranchHandleException);
    }

    const BranchHandleSuccess = (dataObject) => {
        setBranchList(dataObject.data);

    }
    const BranchHandleException = () => { };

    const BranchChanged = (branch_id) => {
        setBranch_id(branch_id);
        FetchFacilitiyService({ location_id, branch_id }, FacilityHandleSuccess, FacilityHandleException);

    };
    const FacilityHandleSuccess = (dataObject) => {
        setFacilityList(dataObject.data);
    }

    const FacilityHandleException = () => { };

    const FacilityChanged = (facility_id) => {
        setFacility_id(facility_id)
        BuildingFetchService({ location_id, branch_id, facility_id }, BuildingHandleSuccess, BuildingHandleException);
    }

    const BuildingHandleSuccess = (dataObject) => {
        setBuildingList(dataObject.data)
    }

    const BuildingHandleException = () => { };

    const BuildingChanged = (building_id) => {
        setBuilding_id(building_id);
        FloorfetchService({ location_id, branch_id, facility_id, building_id }, FloorHandleSuccess, FloorHandleException);
    }

    const FloorHandleSuccess = (dataObject) => {
        setFloorList(dataObject.data)
    }
    const FloorHandleException = () => { };

    const FloorChanged = (floor_id) => {
        setFloor_id(floor_id);
        LabfetchService({ location_id, branch_id, facility_id, building_id, floor_id }, LabHandleSuccess, LabHandleException);
    }

    const LabHandleSuccess = (dataObject) => {
        setLabList(dataObject.data);
    };

    const LabHandleException = () => { };

    const LabHandleChange = (lab_id) => {
        setLab_id(lab_id);
        DeviceFetchService({ location_id, branch_id, facility_id, building_id, floor_id, lab_id }, DeviceHandleSuccess, DeviceHandleException);
    };

    const DeviceHandleSuccess = (dataObject) => {
        setDeviceList(dataObject.data)
    }
    const DeviceHandleException = () => { };

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Stack
                        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                        justifyContent={{ xs: "center", sm: "center", md: "space-around", lg: "space-around" }}
                        alignItems={{ xs: "flex-start", sm: "flex-start", md: "center", lg: "center" }}
                        spacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}
                        marginTop={2}
                        marginLeft={{ xs: 3, sm: 2, md: 0, lg: 1 }}
                        marginRight={{ xs: 3, sm: 2, md: 0, lg: 1 }}
                    >
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel >Location</InputLabel>
                                <Select
                                    value={location_id}
                                    label="Age"
                                    onChange={(e) => {
                                        LocationChanged(e.target.value);
                                    }}
                                >
                                    {locationList.map((data) => (
                                        <MenuItem value={data.id}>{data.stateName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel >Branch</InputLabel>
                                <Select
                                    value={branch_id}
                                    label="Age"
                                    onChange={(e) => {
                                        BranchChanged(e.target.value);
                                    }}
                                >
                                    {branchList.map((data) => (
                                        <MenuItem value={data.id}>{data.branchName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }} >
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel>Facility</InputLabel>
                                <Select
                                    value={facility_id}
                                    label="Age"
                                    onChange={(e) => {
                                        FacilityChanged(e.target.value);

                                    }}
                                >
                                    {facilityList.map((data) => (
                                        <MenuItem value={data.id}>{data.facilityName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel>Building</InputLabel>
                                <Select
                                    value={building_id}
                                    label="Age"
                                    onChange={(e) => {
                                        BuildingChanged(e.target.value)
                                    }}
                                >
                                    {buildingList.map((data) => (
                                        <MenuItem value={data.id}>{data.buildingName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel >Floor</InputLabel>
                                <Select
                                    value={floor_id}
                                    label="Age"
                                    onChange={(e) => {
                                        FloorChanged(e.target.value);
                                    }}
                                >
                                    {floorList.map((data) => (
                                        <MenuItem value={data.id}>{data.floorName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel>Zone</InputLabel>
                                <Select
                                    value={lab_id}
                                    label="Age"
                                    onChange={(e) => {

                                        LabHandleChange(e.target.value);
                                    }}
                                >
                                    {labList.map((data) => (
                                        <MenuItem value={data.id}>{data.labDepName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} >
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 0 }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" selectionFollowsFocus  >
                                <Tab label="Sites Report" {...a11yProps(0)} />
                                <Tab label="Individual Report" {...a11yProps(1)} />
                                <Tab label="Alarms" {...a11yProps(2)} />
                                <Tab label="AQMI logs" {...a11yProps(3)} />
                                <Tab label="Sensor logs" {...a11yProps(4)} />
                                <Tab label="Server Utilization" {...a11yProps(5)} />
                                <Tab label="Firmware version" {...a11yProps(6)} />
                                <Tab label="BumpTest" {...a11yProps(7)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <SitesReportForm />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <IndividualReportForm />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Alarm deviceList={deviceList} />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <AqmiLog />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <SensorLog />
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <ServerUtilization />
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <FirmwareVersion />
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            <BumpTest deviceList={deviceList} />
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}