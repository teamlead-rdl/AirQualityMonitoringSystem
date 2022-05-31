import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import {
  /* eslint-disable max-len */
  BuildingFetchService, DeviceFetchService, FetchBranchService, FetchFacilitiyService, FetchLocationService, FloorfetchService, LabfetchService,
} from '../../services/LoginPageService';

function AddWidgetModal({ open, setAddWidget }) {
  /* eslint-disable no-unused-vars */
  const columns = [
    {
      field: 'deviceName',
      headerName: 'Device Name',
      width: 150,
    },
    {
      field: 'deviceCategory',
      headerName: 'Device Category',
      width: 120,
    },
    {
      field: 'deviceTag',
      headerName: 'Device Tag',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
    },
    {
      field: 'deviceMode',
      headerName: 'Mode',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      disableClickEventBubbling: true,
    },
    {
      field: 'firmwareVersion',
      headerName: 'Firm Ware',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
    },
  ];
  const [location_id, setLocationId] = useState('');
  const [branch_id, setBranchId] = useState('');
  const [facility_id, setFacilityId] = useState('');
  const [building_id, setBuildingId] = useState('');
  const [floor_id, setFloorId] = useState('');
  const [lab_id, setLabId] = useState('');
  const [device_id, setDeviceId] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [buildingList, setBuidlingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [labList, setLabList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    FetchLocationService((locationRespObj) => {
      locationHandleSuccess(locationRespObj);
    }, locationHandleException);
  }, [open]);

  const locationHandleSuccess = (dataObject) => {
    setLocationList(dataObject.data);
    setLocationId('');
    setBranchList([]);
    setBranchId('');
    setFacilityList([]);
    setFacilityId('');
    setBuidlingList([]);
    setBuildingId('');
    setFloorList([]);
    setFloorId('');
    setLabList([]);
    setLabId('');
    setDeviceList([]);
    setDeviceId('');
  };

  const locationHandleException = () => {};
  /* eslint-disable react/no-array-index-key */
  /* eslint-disable no-shadow */

  const onLocationChange = (location_id) => {
    setLocationId(location_id);
    if (location_id) {
      FetchBranchService({ location_id }, branchHandleSuccess, branchHandleException);
    } else {
      setBranchList([]);
      setFacilityList([]);
      setBuidlingList([]);
      setFloorList([]);
      setLabList([]);
      setDeviceList([]);
      setBranchId('');
      setFacilityId('');
      setBuildingId('');
      setFloorId('');
      setLabId('');
      setDeviceId('');
    }
  };

  const branchHandleSuccess = (dataObject) => {
    setBranchList(dataObject.data);
    setFacilityList([]);
    setBuidlingList([]);
    setFloorList([]);
    setLabList([]);
    setDeviceList([]);
    setFacilityId('');
    setBuildingId('');
    setFloorId('');
    setLabId('');
    setDeviceId('');
  };

  const branchHandleException = () => {};

  const onBranchChange = (branch_id) => {
    setBranchId(branch_id);
    if (branch_id) {
      FetchFacilitiyService({ location_id, branch_id }, facilityHandleSuccess, facilityHandleException);
    } else {
      setFacilityList([]);
      setBuidlingList([]);
      setFloorList([]);
      setLabList([]);
      setDeviceList([]);
      setFacilityId('');
      setBuildingId('');
      setFloorId('');
      setLabId('');
      setDeviceId('');
    }
  };

  const facilityHandleSuccess = (dataObject) => {
    setFacilityList(dataObject.data);
    setBuidlingList([]);
    setFloorList([]);
    setLabList([]);
    setDeviceList([]);
    setBuildingId('');
    setFloorId('');
    setLabId('');
    setDeviceId('');
  };

  const facilityHandleException = () => {};

  const onFacilityChange = (facility_id) => {
    setFacilityId(facility_id);
    if (facility_id) {
      BuildingFetchService({ location_id, branch_id, facility_id }, buildinghandleSuccess, buildinghandleException);
    } else {
      setBuidlingList([]);
      setFloorList([]);
      setLabList([]);
      setDeviceList([]);
      setBuildingId('');
      setFloorId('');
      setLabId('');
      setDeviceId('');
    }
  };

  const buildinghandleSuccess = (dataObject) => {
    setBuidlingList(dataObject.data);
    setFloorList([]);
    setLabList([]);
    setDeviceList([]);
    setFloorId('');
    setLabId('');
    setDeviceId('');
  };

  const buildinghandleException = () => {};

  const onBuildingChange = (building_id) => {
    setBuildingId(building_id);
    if (building_id) {
      FloorfetchService({
        location_id, branch_id, facility_id, building_id,
      }, floorhandleSuccess, floorhandleException);
    } else {
      setFloorList([]);
      setLabList([]);
      setDeviceList([]);
      setFloorId('');
      setLabId('');
      setDeviceId('');
    }
  };

  const floorhandleSuccess = (dataObject) => {
    setFloorList(dataObject.data);
    setLabList([]);
    setDeviceList([]);
    setLabId('');
    setDeviceId('');
  };

  const floorhandleException = (errorObject) => {};

  const onFloorChange = (floor_id) => {
    setFloorId(floor_id);
    if (floor_id) {
      LabfetchService({
        location_id, branch_id, facility_id, building_id, floor_id,
      }, labhandleSuccess, labhandleException);
    } else {
      setLabList([]);
      setDeviceList([]);
      setLabId('');
      setDeviceId('');
    }
  };

  const labhandleSuccess = (dataObject) => {
    setLabList(dataObject.data);
    setDeviceList([]);
    setDeviceId('');
  };

  const labhandleException = () => {};

  const onLabChange = (lab_id) => {
    setLabId(lab_id);
    if (lab_id) {
      DeviceFetchService({
        location_id, branch_id, facility_id, building_id, floor_id, lab_id,
      }, devicehandleSuccess, devicehandleException);
    } else {
      setDeviceList([]);
      setDeviceId('');
    }
  };

  const devicehandleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
  };

  const devicehandleException = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        Add Widget
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} sx={{ mt: 0, mb: 2 }}>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                  <Select
                    value={location_id}
                    onChange={(e) => onLocationChange(e.target.value)}
                    label="Location"
                  >
                    <MenuItem value="" key={0}>
                      <em>N/A</em>
                    </MenuItem>
                    {locationList?.map((data, index) => {
                      return (
                        <MenuItem value={data.id} key={index + 1}>{data.stateName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Branch</InputLabel>
                  <Select
                    value={branch_id}
                    onChange={(e) => onBranchChange(e.target.value)}
                    label="Branch"
                  >
                    <MenuItem value="" key={0}>
                      <em>N/A</em>
                    </MenuItem>
                    {branchList?.map((data, index) => {
                      return (
                        <MenuItem value={data.id} key={index + 1}>{data.branchName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Facility</InputLabel>
                  <Select
                    value={facility_id}
                    onChange={(e) => onFacilityChange(e.target.value)}
                    label="Facility"
                  >
                    <MenuItem value="" key={0}>
                      <em>N/A</em>
                    </MenuItem>
                    {facilityList?.map((data, index) => {
                      return (
                        <MenuItem value={data.id} key={index + 1}>{data.facilityName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Building</InputLabel>
                  <Select
                    value={building_id}
                    onChange={(e) => onBuildingChange(e.target.value)}
                    label="Building"
                  >
                    <MenuItem value="" key={0}>
                      <em>N/A</em>
                    </MenuItem>
                    {buildingList?.map((data, index) => {
                      return (
                        <MenuItem value={data.id} key={index + 1}>{data.buildingName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Floor</InputLabel>
                  <Select
                    value={floor_id}
                    onChange={(e) => onFloorChange(e.target.value)}
                    label="Floor"
                  >
                    <MenuItem value="" key={0}>
                      <em>N/A</em>
                    </MenuItem>
                    {floorList?.map((data, index) => {
                      return (
                        <MenuItem value={data.id} key={index + 1}>{data.floorName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <div className="rounded-md -space-y-px">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Laboratory</InputLabel>
                  <Select
                    value={lab_id}
                    onChange={(e) => onLabChange(e.target.value)}
                    label="Laboratory"
                  >
                    <MenuItem value="" key={0}>
                      <em>N/A</em>
                    </MenuItem>
                    {labList?.map((data, index) => {
                      return (
                        <MenuItem value={data.id} key={index + 1}>{data.labDepName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid>
            <div style={{ height: 300, width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={deviceList}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </Grid>
          <div className="rounded-md -space-y-px float-right">
            <Button
              type="submit"
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setLocationId('');
                setBranchList([]);
                setBranchId('');
                setFacilityList([]);
                setFacilityId('');
                setBuidlingList([]);
                setBuildingId('');
                setFloorList([]);
                setFloorId('');
                setLabList([]);
                setLabId('');
                setDeviceList([]);
                setDeviceId('');
                setAddWidget(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddWidgetModal;
