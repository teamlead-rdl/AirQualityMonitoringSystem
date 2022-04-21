import {
  Button, Dialog, DialogContent, DialogTitle, TextField, Box, Grid, Autocomplete,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AddDeviceLocationService, EditDeviceLocationService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validation/locationValidation';
import ImageMarkerComponent from './imageMarker';
import floorPlan from '../../../images/departmentBlueprint.png';

function DeviceLocationModal({
  open, setOpen, isAddButton, locationData, categoryList,
}) {
  const [categoryName, setCategoryName] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [device_id, setDeviceId] = useState('');
  const [description, setDescription] = useState('');
  const [assetTag, setAssetTag] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [deviceIcon, setDeviceIcon] = useState('');
  const [floorCords, setFloorCords] = useState('');
  const [location_id, setLocationId] = useState(19);
  const [branch_id, setBranchId] = useState(22);
  const [facility_id, setFacilityId] = useState(12);
  const [building_id, setBuildingId] = useState(10);
  const [floor_id, setFloorId] = useState(7);
  const [lab_id, setLabId] = useState(19);
  const [devicelocationId, setDeviceLocationId] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const [category, setCategory] = useState([]);
  const countries = [
    { id: 1, code: 'dataloger', label: 'Data Loger' },
    {
      id: 2,
      code: 'thermosensor',
      label: 'Thermo Sensor',
    },
    { id: 3, code: 'computer', label: 'Computer' },
  ];

  const categorydefaultProps = {
    options: category,
    getOptionLabel: (option) => option.categoryName,
  };
  const defaultProps = {
    options: countries,
    getOptionLabel: (option) => option.label,
  };

  useEffect(() => {
    if (locationData) {
      setOpen(open);
      loaddata();
    }
  }, [locationData]);

  const loaddata = () => {
    setCategory(categoryList || []);
    const coordinates = locationData.Cordinates ? locationData.Cordinates.split(',') : ['', ''];
    // setLocationId(locationData.id || '');
    setCategoryName(locationData.categoryName || '');
    setCategoryId(locationData.category_id || '');
    setDeviceName(locationData.deviceName || '');
    setDeviceId(locationData.device_id || '');
    setDescription(locationData.description || '');
    setAssetTag(locationData.assetTag || '');
    setMacAddress(locationData.macAddress || '');
    setDeviceIcon(locationData.deviceIcon || '');
    setFloorCords(locationData.floorCords || '');
    setDeviceLocationId(locationData.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      AddDeviceLocationService({
        location_id, branch_id, facility_id, building_id, floor_id, lab_id, device_id, categoryName, deviceName, category_id, description, assetTag, macAddress, floorCords, deviceIcon,
      }, handleSuccess, handleException);
    } else {
      EditDeviceLocationService({
        location_id, branch_id, facility_id, building_id, floor_id, lab_id, device_id, categoryName, deviceName, category_id, description, assetTag, macAddress, floorCords, deviceIcon, devicelocationId,
      }, handleSuccess, handleException);
    }
    setOpen(false);
    setErrorObject({});
  };

  const handleSuccess = (data) => {
    setOpen(false);
    return data;
  };

  const handleException = (errorObject) => {
  };
  const onMapClick = (e) => {
    delete errorObject.coordinates;
  };

  const validateForNullValue = (value, type) => {
    LocationFormValidate(value, type, setErrorObject);
  };

  const setFloorCoordinations = (value) => {
    const cord = `${value.top},${value.left}`;
    setFloorCords(cord); // Error not yet solved
  };
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '95%', padding: 0 } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        {isAddButton ? 'Add Device' : 'Edit Device'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="mx-auto outline-black">
              <div className="inline">
                <div className="w-full sm:float-left lg:w-2/6 pr-3 p-0 ">
                  <div className="rounded-md -space-y-px mb-2">
                    <Autocomplete
                      disablePortal
                      {...categorydefaultProps}
                      autoHighlight
                      id="combo-box-demo"
                      options={category}
                      value={category[category_id - 1]}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ mb: 1 }}
                          type="text"
                          {...params}
                          label="Device Category"
                          value={category[category_id - 1]}
                          required
                        />
                      )}
                      onChange={(e, value) => {
                        setCategoryName(value.categoryName);
                        setCategoryId(value.id);
                      }}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <Autocomplete
                      disablePortal
                      {...defaultProps}
                      autoHighlight
                      id="combo-box-demo"
                      options={countries}
                      value={countries[device_id]}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="20"
                            src={require(`../../../images/deviceIcons/${option.code}.png`)}
                            srcSet={require(`../../../images/deviceIcons/${option.code}.png`)}
                            alt="icon"
                          />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          type="text"
                          sx={{ mb: 1 }}
                          {...params}
                          label="Device Name"
                          required
                          value={deviceName}
                        />
                      )}
                      onChange={(e, value) => {
                        setDeviceName(value.label);
                        setDeviceIcon(value.code);
                        setDeviceId(value.id);
                      }}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Device Description"
                      type="text"
                      value={description}
                      variant="outlined"
                      placeholder="Please enter the description"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      // onBlur={() =>validateForNullValue(buildingTotalFloors, 'buildingTotalFloors')}
                      onChange={(e) => { setDescription(e.target.value); }}
                      autoComplete="off"
                      // error={errorObject?.buildingTotalFloors?.errorStatus}
                      // helperText={errorObject?.buildingTotalFloors?.helperText}

                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Asset Tag"
                      type="text"
                      value={assetTag}
                      variant="outlined"
                      placeholder="Please enter asset tag"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      // onBlur={() =>validateForNullValue(buildingTotalFloors, 'buildingTotalFloors')}
                      onChange={(e) => { setAssetTag(e.target.value); }}
                      autoComplete="off"
                      // error={errorObject?.buildingTotalFloors?.errorStatus}
                      // helperText={errorObject?.buildingTotalFloors?.helperText}

                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="MAC Address"
                      type="text"
                      value={macAddress}
                      variant="outlined"
                      placeholder="Please enter MAC Address"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      // onBlur={() =>validateForNullValue(buildingTotalFloors, 'buildingTotalFloors')}
                      onChange={(e) => { setMacAddress(e.target.value); }}
                      autoComplete="off"
                      // error={errorObject?.buildingTotalFloors?.errorStatus}
                      // helperText={errorObject?.buildingTotalFloors?.helperText}

                    />
                  </div>
                </div>
                <div className="w-full sm:float-right lg:float-left lg:w-4/6 pr-1">
                  <div style={{
                    width: `${100}%`, height: `${60}vh`, borderColor: 'black', border: `${2}px` + ' solid' + ' black',
                  }}
                  >
                    <Box
                      sx={{
                      }}
                    >

                      <ImageMarkerComponent
                        src={floorPlan}
                        setFloorCoordinations={setFloorCoordinations}
                        floorCords={floorCords}
                        deviceIcon={deviceIcon}
                      />
                    </Box>
                  </div>
                </div>

              </div>
            </div>
            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                  type="submit"
                  disabled={errorObject?.coordinates?.errorStatus || errorObject?.stateName?.errorStatus}
                >
                  {isAddButton ? 'Add' : 'Update'}
                </Button>
                <Button
                  onClick={(e) => {
                    setOpen(false);
                    setErrorObject({});
                    loaddata();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>

    </Dialog>
  );
}

export default DeviceLocationModal;
