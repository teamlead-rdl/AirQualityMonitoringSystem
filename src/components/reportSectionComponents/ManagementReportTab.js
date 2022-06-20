import React, { useState } from 'react';
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
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [age, setAge] = useState('');

    const handleChange1 = (event) => {
        setAge(event.target.value);
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
                                    value={age}
                                    label="Age"
                                    onChange={handleChange1}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel >Branch</InputLabel>
                                <Select
                                    value={age}
                                    label="Age"
                                    onChange={handleChange1}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }} >
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel>Facility</InputLabel>
                                <Select
                                    value={age}
                                    label="Age"
                                    onChange={handleChange1}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel>Building</InputLabel>
                                <Select
                                    value={age}
                                    label="Age"
                                    onChange={handleChange1}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel >Floor</InputLabel>
                                <Select
                                    value={age}
                                    label="Age"
                                    onChange={handleChange1}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 130 }}>
                            <FormControl fullWidth size="small" style={{ minWidth: 170 }}>
                                <InputLabel>Lab</InputLabel>
                                <Select
                                    value={age}
                                    label="Age"
                                    onChange={handleChange1}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                            <Alarm />
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
                            <BumpTest />
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}