import React, { useState, useEffect } from 'react';
import {
  InputLabel, MenuItem, FormControl, Select, Grid, Box, Button, TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  FetchBranchService,
  FetchFacilitiyService,
  FetchLocationService,
  FetchUserLogService,
  FetchUserLogDetails,
} from '../../../services/LoginPageService';

export default function UserLogForm() {
  const [location_id, setLocation_id] = useState('');
  const [branch, setBranch] = useState('');
  const [branch_id, setBranch_id] = useState('');
  const [facility, setFacility] = useState('');
  const [userId, setUserId] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [userLogList, setUserLogList] = useState([]);
  const [isLoading, setGridLoading] = useState(false);
  const [unTaggedUserList, setUnTaggedUserList] = useState(false);

  useEffect(() => {
    loadLocation();
    FetchUserLogService({}, UserLogHandleSuccess, userHandleException);
  }, [unTaggedUserList]);

  const columns = [
    {
      field: 'companyCode',
      headerName: 'Company Name',
      width: 150,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 130,
    },
    {
      field: 'userEmail',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
    },
    {
      field: 'created_at',
      headerName: 'Date & Time',
      width: 230,
    },
    // {
    //   field: 'date',
    //   headerName: 'Date',
    //   width: 100,
    // },
    // {
    //   field: 'time',
    //   headerName: 'Time',
    //   width: 100,
    // },
  ];

  const loadLocation = () => {
    FetchLocationService(LocationHandleSuccess, LocationHandleException);
  };

  const LocationHandleSuccess = (dataObject) => {
    setLocationList(dataObject.data);
  };

  const LocationHandleException = () => {};
  /* eslint-disable-next-line */
  const LocationChanged = (location_id) => {
    setLocation_id(location_id);
    FetchBranchService({ location_id }, BranchHandleSuccess, branchHandleException);
    FetchUserLogService({ location_id }, UserLogHandleSuccess, userHandleException);
  };
  /* eslint-disable-next-line */
  const BranchChanged = (branch_id) => {
    setBranch(branch_id);
    setBranch_id(branch_id);
    FetchFacilitiyService({ location_id, branch_id }, FacilityHandleSuccess, FacilityHandleException);
    FetchUserLogService({ location_id, branch_id }, UserLogHandleSuccess, userHandleException);
  };

  const BranchHandleSuccess = (dataObject) => {
    setBranchList(dataObject.data);
  };

  const branchHandleException = () => {};

  const userHandleException = () => {};

  const FacilityHandleSuccess = (dataObject) => {
    setFacilityList(dataObject.data);
  };

  const FacilityHandleException = () => {};

  const FacilityChanged = (facility_id) => {
    setFacility(facility_id);
    FetchUserLogService({ location_id, branch_id, facility_id }, UserLogHandleSuccess, userHandleException);
  };

  const UserLogHandleSuccess = (dataObject) => {
    setUserList(dataObject);
    setGridLoading(false);
  };

  const UserLogDetailsHandleSuccess = (dataObject) => {
    setUserLogList(dataObject);
    setGridLoading(false);
  };

  const userLogDetailsHandleException = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setGridLoading(true);
    FetchUserLogDetails({ userId, fromDate, toDate }, UserLogDetailsHandleSuccess, userLogDetailsHandleException);
  };

  const handleCancel = () => {
    setLocation_id('');
    setBranch('');
    setBranch_id('');
    setFacility('');
    setUserId('');
    setBranchList([]);
    setFacilityList([]);
    setUserList([]);
    setFromDate('');
    setToDate('');
    setUserLogList([]);
    setGridLoading(false);
    setUnTaggedUserList(!unTaggedUserList);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid sx={{ mt: 1 }} item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location_id}
                  label="Location"
                  onChange={(e) => {
                    setLocation_id(e.target.value);
                    LocationChanged(e.target.value);
                  }}
                >
                  {locationList.map((data) => (
                    <MenuItem value={data.id}>{data.stateName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Branch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={branch}
                label="Branch"
                onChange={(e) => {
                  BranchChanged(e.target.value);
                }}
              >
                {branchList.map((data) => (
                  <MenuItem value={data.id}>{data.branchName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Facility</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facility}
                label="Facility"
                onChange={(e) => {
                  FacilityChanged(e.target.value);
                }}
              >
                {facilityList.map((data) => (
                  <MenuItem value={data.id}>{data.facilityName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                required
                label="User"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              >
                {userList.map((data) => (
                  <MenuItem value={data.name}>{data.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              label="From date"
              type="date"
              value={fromDate}
              variant="outlined"
              className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
              text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
              required
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              label="to date"
              type="date"
              value={toDate}
              variant="outlined"
              className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
              text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
              required
              onChange={(e) => {
                setToDate(e.target.value);
              }}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <div className="mt-3 ml-2 float-right inline-block">
              <FormControl sx={{ margin: '5px' }}>
                <Button autoFocus onClick={handleCancel}>
                  Cancel
                </Button>
              </FormControl>
              <FormControl sx={{ margin: '5px' }}>
                <Button type="submit">
                  Submit
                </Button>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </form>
      <Grid>
        <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={userLogList}
            columns={columns}
            pageSize={5}
            loading={isLoading}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Grid>
    </div>
  );
}
