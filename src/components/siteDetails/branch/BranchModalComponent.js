import { Button, Dialog, DialogContent, DialogTitle, TextField , Box, Grid} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BranchAddService, BranchEditService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validatation/locationValidation';
import MapsComponent from '../../maps/googleMapsComponent';
import { BranchFormValidate } from '../../../validatation/locationValidation';
import NotificationBar from '../../notification/ServiceNotificationBar';

const BranchModal = ({open, setOpen, isAddButton, editData, locationId, setRefreshData}) => {

    const [branchName, setbranchName] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [location_id, setLocationId] = useState(locationId);
    const [branch_id, setBranchId] = useState('');
    const [Cordinates, setCordinates] = useState({});
    const [errorObject, setErrorObject] = useState({});

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    });

    const [markerLat, setMarkerLat] =useState(0);
    const [markerLng, setMarkerLng] =useState(0);

    useEffect(()=>{
        if (editData) {
            setOpen(open);
            loaddata();
        }
    },[editData]);

    const loaddata = () =>{
        const coordinates = editData.coordinates ? editData.coordinates.split(',') : ['',''];
        setbranchName(editData.branchName ||'');
        setLongitude(coordinates[0]);
        setLatitude(coordinates[1]);
        setBranchId(editData.id || '');
        setMarkerLng(parseFloat(coordinates[0]));
        setMarkerLat(parseFloat(coordinates[1]));
    }
    const clearForm = () =>{
        setbranchName('');
        setLongitude('');
        setLatitude('');
        setLocationId('');
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(longitude == '' || latitude == ''){
            setErrorObject(oldErrorState => {
                let status = {}
                status = {
                    errorStatus: true,
                    helperText: 'Please choose the points in Map'
                }
                return {
                    ...oldErrorState,
                    coordinates: status
                }
            });
        }
        else{
            const coordinates = JSON.stringify(longitude+","+latitude).replaceAll('"', "");
            if (isAddButton) {
                    await BranchAddService({ location_id, branchName, coordinates}, handleSuccess, handleException);
                    // clearForm();
              } else {
                  await BranchEditService({ location_id, branchName, coordinates, branch_id }, handleSuccess, handleException);
                    // clearForm();
              }
            
        }
    }

    const handleSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message
          });
          setRefreshData((oldvalue)=>{
              return !oldvalue;
          });
          setTimeout(() => {
            handleClose();
            setOpen(false);
            setErrorObject({});
          }, 5000);
    }
    
    const handleException = (errorObject, errorMessage) => {
        // console.log(JSON.stringify(errorObject));
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setErrorObject({});
    }

    const onMapClick = (e)=>{
        delete errorObject.coordinates;
        setLongitude(e.latLng.lat());
        setLatitude(e.latLng.lng());
    }
    const validateForNullValue = (value, type) => {
        // LocationFormValidate(value, type, setErrorObject);
        BranchFormValidate(value, type, setErrorObject);
    };
    
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: ''
        });
      }

  return (
    <Dialog
        sx={{ "& .MuiDialog-paper": { minWidth: '80%'} }}
        maxWidth="sm"
        open={open}
    >
        <DialogTitle>
            {isAddButton ? "Add Branch" : "Edit Branch"}
        </DialogTitle>
        <DialogContent>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md  -space-y-px ">
                    
                    <div className="container mx-auto outline-black">
                        <div className="inline">
                            <div className="w-full sm:float-left lg:w-2/5  pr-3 pl-3">
                                <div className='rounded-md -space-y-px mb-2'>
                                    <TextField
                                        fullWidth
                                        sx={{mb:1}}
                                        label="Location Name"
                                        type="text"
                                        value={branchName}
                                        variant="outlined"
                                        placeholder="Please enter Branch name"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                                        required
                                        // onBlur={() =>validateForNullValue(branchName, 'stateName')}
                                        onBlur={() =>validateForNullValue(branchName, 'branchName')}
                                        onChange={(e) => {setbranchName(e.target.value)}}
                                        autoComplete="off"
                                        error={errorObject?.branchName?.errorStatus}
                                        helperText={errorObject?.branchName?.helperText}
                                    />
                                </div>
                                <div className='rounded-md -space-y-px mb-2'>
                                    <TextField
                                        fullWidth
                                        sx={{mb:1}}
                                        label="Latitude"
                                        type="text"
                                        disabled
                                        value={latitude}
                                        variant="outlined"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                                        required
                                        onChange={(e) => {setLatitude(e.target.value)}}
                                        autoComplete="off"
                                        error={errorObject?.coordinates?.errorStatus}
                                        helperText={errorObject?.coordinates?.helperText}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className='rounded-md -space-y-px mb-2'>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        sx={{mb:1}}
                                        label="Longitude"
                                        type="text"
                                        disabled
                                        value={longitude}
                                        variant="outlined"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                                        required
                                        onChange={(e) => {setLongitude(e.target.value)}}
                                        autoComplete="off"
                                        error={errorObject?.coordinates?.errorStatus}
                                        helperText={errorObject?.coordinates?.helperText}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full sm:float-right lg:float-left lg:w-3/5 pr-1">
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                </Grid>
                                    <MapsComponent 
                                        onMarkerDrop={onMapClick}
                                        height = '50vh'
                                        width = '100%'
                                        longitude = {markerLng}
                                        latitude = {markerLat}
                                        stateName ={editData.branchName}
                                    />
                            </div>

                        </div>
                    </div>
                    <div className="float-right">
                        <div className="rounded-md -space-y-px">
                            <Button 
                                type="submit"
                                disabled={errorObject?.coordinates?.errorStatus || errorObject?.stateName?.errorStatus}
                            >
                                {isAddButton ? "Add" : "Update"}
                            </Button>
                            <Button 
                                onClick={(e)=>{
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
  )
}

export default BranchModal