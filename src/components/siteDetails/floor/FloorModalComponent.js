import { Button, Dialog, DialogContent, DialogTitle, TextField , Grid} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FloorAddService, FloorEditService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validatation/locationValidation';
import NotificationBar from '../../notification/ServiceNotificationBar';
import ImageMarkerComponent from './imageMarker';
import previewImage from '../../../images/chooseFile.png'

const FloorModal = ({open, setOpen, isAddButton, editData, locationId, branchId, facilityId, buildingId, setRefreshData, src}) => {

    const [floorName, setFloorName] = useState('');
    const [floorStage, setFloorStage] = useState(0);
    const [floorMap, setFloorMap] = useState({});
    const [floorCords, setFloorCords] = useState('');
    const [location_id, setLocationId] = useState(locationId);
    const [branch_id, setBranchId] = useState(branchId);
    const [facility_id, setFacilityId] = useState(facilityId);
    const [building_id, setBuildingId] = useState(buildingId);
    const [floor_id, setFloorId] = useState('');
    const [previewFloor, setPreviewFloor] = useState('');
    const [errorObject, setErrorObject] = useState({});
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    });

    useEffect(()=>{
        if (editData) {
            setOpen(open);
            loaddata();
        }
    },[editData]);

    const loaddata = () =>{
        setFloorName(editData.floorName ||'');
        setFloorId(editData.id || '');
        setFloorStage(editData.floorStage || '');
        setFloorCords(editData.floorCords || '');
        setPreviewFloor(editData.floorMap? "http://varmatrix.com/Aqms/blog/public/"+editData.floorMap : previewImage);
        // setFloorMap(editData.floorMap || '');
        // setFloorCords(editData.floorCords || []);
    }
   
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // if(longitude == '' || latitude == ''){
        //     setErrorObject(oldErrorState => {
        //         let status = {}
        //         status = {
        //             errorStatus: true,
        //             helperText: 'Please choose the points in Map'
        //         }
        //         return {
        //             ...oldErrorState,
        //             coordinates: status
        //         }
        //     });
        // }
        // else{
            if (isAddButton) {
                    // alert(floorCords+"\n"+floorName+"\n"+floorStage +"\n"+location_id+"\n"+branch_id+"\n"+facility_id+"\n"+building_id);
                    await FloorAddService({ floorName, floorStage , floorMap, floorCords, location_id, branch_id, facility_id, building_id}, handleSuccess, handleException);
            } else 
            {
                await FloorEditService({ floorName, floorStage , floorMap, floorCords, location_id, branch_id, facility_id, building_id, floor_id}, handleSuccess, handleException);
            }
        // }
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
        console.log(JSON.stringify(errorObject));
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setErrorObject({});
    }
    const onMapClick = (e)=>{
        delete errorObject.coordinates;
        // setLongitude(e.latLng.lat());
        // setLatitude(e.latLng.lng());
    }
    const validateForNullValue = (value, type) => {
        LocationFormValidate(value, type, setErrorObject);
      };

    const setFloorCoordinations = (value, direction) =>{
        let cord = value.top+","+value.left+","+direction;
        setFloorCords(cord); // Error not yet solved
        // setFloorCords(oldArray => [...oldArray,direction]); // Error not yet solved
        console.log(floorCords); 
        console.log(direction);

        // let cord = value.top+","+value.left;
        // setFloorCords(cord); // Error not yet solved
        // console.log(floorCords);
    }

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
            {isAddButton ? "Add Floor" : "Edit Floor"}
        </DialogTitle>
        <DialogContent>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md  -space-y-px ">
                    {/* <div className='rounded-md -space-y-px mb-2'>

                    </div> */}
                    <div className="container mx-auto outline-black">
                        <div className="inline">
                            <div className="w-full sm:float-left lg:w-2/5  pr-3 pl-3">
                                <div className='rounded-md -space-y-px mb-2'>
                                    <TextField
                                        fullWidth
                                        sx={{mb:1}}
                                        label="Floor Name"
                                        type="text"
                                        value={floorName}
                                        variant="outlined"
                                        placeholder="Please enter Floor name"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                                        required
                                        onBlur={() =>validateForNullValue(floorName, 'buildingName')}
                                        onChange={(e) => {setFloorName(e.target.value)}}
                                        autoComplete="off"
                                        error={errorObject?.buildingName?.errorStatus}
                                        helperText={errorObject?.buildingName?.helperText}
                                    />
                                </div>
                               
                                <div className='rounded-md -space-y-px mb-2'>
                                    <TextField
                                        fullWidth
                                        sx={{mb:1}}
                                        label="Floor number"
                                        type="number"
                                        value={floorStage}
                                        variant="outlined"
                                        placeholder="Please enter Floor number"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                                        required
                                        onBlur={() =>validateForNullValue(floorStage, 'buildingTotalFloors')}
                                        onChange={(e) => {setFloorStage(e.target.value)}}
                                        autoComplete="off"
                                        error={errorObject?.buildingTotalFloors?.errorStatus}
                                        helperText={errorObject?.buildingTotalFloors?.helperText}
                                        // InputLabelProps={{
                                        //     shrink: true,
                                        // }}
                                    />
                                </div>

                                
                                <div className='rounded-md -space-y-px mb-2'>
                                    <TextField 
                                            fullWidth
                                            label="Floor Image"
                                            required = {isAddButton? true: false}
                                            onBlur={() => {
                                                validateForNullValue(floorMap, 'buildingImg');
                                            }}
                                            onChange={(e) => {
                                            // setCustomerLogo(e.target.files);
                                            if(e.target.files && e.target.files.length > 0){
                                                setFloorMap(e.target.files[0]);
                                                // const reader = new FileReader();
                                                // reader.readAsDataURL(e.target.files[0]);
                                                const reader = new FileReader();
                                                reader.onload = () =>{
                                                    if(reader.readyState === 2){
                                                        setFloorMap(reader.result);
                                                        setPreviewFloor(reader.result);
                                                        // setImgdata(reader.result);
                                                    }
                                                }
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                            type="file"
                                            inputProps={{
                                                accept:"image/png",
                                            }}
                                            error={errorObject?.buildingImg?.errorStatus}
                                            helperText={errorObject?.buildingImg?.helperText}
                                        />
                                </div>
                                <div className='rounded-md -space-y-px mb-2' style={{border:'2px black solid'}}>
                                    <img src={ previewFloor || previewImage } style={{width:'-webkit-fill-available'}} />
                                </div>
                            </div>
                            <div className="w-full sm:float-right lg:float-left lg:w-3/5 pr-1">
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    
                                </Grid>
                                {/* <MapsComponent 
                                    height = '70vh'
                                    width = '100%'
                                    onMarkerDrop={onMapClick}
                                    longitude = {markerLng}
                                    latitude = {markerLat}
                                    stateName ={editData.buildingName}
                                /> */}
                                
                                
                                <ImageMarkerComponent
                                    src = {src}
                                    width = '500px'
                                    setFloorCoordinations= {setFloorCoordinations}
                                    floorCords={floorCords}
                                />
                                    
                            </div>

                        </div>
                    </div>
                    <div className="float-right">
                        <div className="rounded-md -space-y-px">
                            <Button 
                                type="submit"
                                disabled={errorObject?.buildingName?.errorStatus || errorObject?.buildingTotalFloors?.errorStatus}
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

export default FloorModal