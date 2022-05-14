import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  LocationAddService,
  LocationEditService,
} from '../../../services/LoginPageService';
import { LocationAddFormValidate } from '../../../validation/locationValidation';
import MapsComponent from '../../maps/googleMapsComponent';

import NotificationBar from '../../notification/ServiceNotificationBar';

function LocationModal({
  open, setOpen, isAddButton, locationData, setRefreshData, locationCoordinationList,
}) {
  const [stateName, setStateName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [locationId, setLocationId] = useState(19);
  const [errorObject, setErrorObject] = useState({});

  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (locationData) {
      setOpen(open);
      loaddata();
    }
  }, [locationData]);

  const loaddata = () => {
    const coordinates = locationData.coordinates
      ? locationData.coordinates.split(',')
      : ['', ''];
    setLongitude(coordinates[0]);
    setLatitude(coordinates[1]);
    setStateName(locationData.stateName || '');
    setLocationId(locationData.id || '');
    setMarkerLng(parseFloat(coordinates[0]));
    setMarkerLat(parseFloat(coordinates[1]));
  };
  /* eslint-disable-next-line */
  const clearForm = () => {
    setStateName('');
    setLongitude('');
    setLatitude('');
    setLocationId('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (longitude === '' || latitude === '') {
      setErrorObject((oldErrorState) => {
        let status = {};
        status = {
          errorStatus: true,
          helperText: 'Please choose the points in Map',
        };
        return {
          ...oldErrorState,
          coordinates: status,
        };
      });
    } else {
      const coordinates = JSON.stringify(`${longitude},${latitude}`).replaceAll(
        '"',
        '',
      );

      if (isAddButton) {
        await LocationAddService(
          { stateName, coordinates },
          handleSuccess,
          handleException,
        );
      } else {
        await LocationEditService(
          { stateName, coordinates, locationId },
          handleSuccess,
          handleException,
        );
      }
    }
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setOpen(false);
      setErrorObject({});
    }, 5000);
  };
  /* eslint-disable-next-line */
  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setErrorObject({});
  };

  const onMapClick = (e) => {
    delete errorObject.coordinates;
    setLongitude(e.latLng.lat());
    setLatitude(e.latLng.lng());
  };

  const validateForNullValue = (value, type) => {
    // LocationFormValidate(value, type, setErrorObject);
    LocationAddFormValidate(value, type, setErrorObject);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        {isAddButton ? 'Add Location' : 'Edit Location'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="container mx-auto outline-black">
              <div className="inline">
                <div className="w-full sm:float-left lg:w-2/5 pr-3 pl-3">
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Location Name"
                      type="text"
                      value={stateName}
                      variant="outlined"
                      placeholder="Please enter location name"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                      onBlur={() => {
                        validateForNullValue(stateName, 'stateName');
                      }}
                      onChange={(e) => {
                        setStateName(e.target.value);
                      }}
                      autoComplete="off"
                      error={errorObject?.stateName?.errorStatus}
                      helperText={errorObject?.stateName?.helperText}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Latitude"
                      type="text"
                      disabled
                      value={latitude}
                      variant="outlined"
                      // placeholder="Latitude"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                      // onBlur={() =>validateForNullValue(customerName, 'fullName')}
                      onChange={(e) => {
                        setLatitude(e.target.value);
                      }}
                      autoComplete="off"
                      error={errorObject?.coordinates?.errorStatus}
                      helperText={errorObject?.coordinates?.helperText}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Longitude"
                      type="text"
                      disabled
                      value={longitude}
                      variant="outlined"
                      // placeholder="Longitude"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                      // onBlur={() =>{validateForNullValue(longitude, 'fullName')}}
                      onChange={(e) => {
                        setLongitude(e.target.value);
                      }}
                      autoComplete="off"
                      error={errorObject?.coordinates?.errorStatus}
                      helperText={errorObject?.coordinates?.helperText}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // /^$|\s+/
                    />
                  </div>
                </div>
                <div className="w-full sm:float-right lg:float-left lg:w-3/5 pr-1">
                  <Grid item xs={4} sm={4} md={4} lg={4} />
                  <MapsComponent
                    onMarkerDrop={onMapClick}
                    longitude={markerLng}
                    latitude={markerLat}
                    stateName={locationData.stateName}
                    center={{ lat: locationCoordinationList[0]?.position.lat, lng: locationCoordinationList[0]?.position.lng }}
                    zoom={4}
                    flagDistance={3}
                  />
                </div>
              </div>
            </div>
            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                  type="submit"
                  disabled={
                    errorObject?.coordinates?.errorStatus
                    || errorObject?.stateName?.errorStatus
                  }
                >
                  {isAddButton ? 'Add' : 'Update'}
                </Button>
                <Button
                  onClick={() => {
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
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default LocationModal;
