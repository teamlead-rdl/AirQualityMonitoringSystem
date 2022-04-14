import { Button, Dialog, DialogContent, DialogTitle, TextField , Box, Grid, Autocomplete} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AddDeviceLocationService, EditDeviceLocationService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validatation/locationValidation';
import ImageMarkerComponent from './imageMarker';
import floorPlan from '../../../images/departmentBlueprint.png';

const DeviceLocationModal = ({open, setOpen, isAddButton, locationData, categoryList, src, floorCords, setFloorCords}) => {

    const labMap = 'http://varmatrix.com/Aqms/blog/public/'+src;
    const [categoryName, setCategoryName] =useState('');
    const [category_id, setCategoryId] =useState('');
    const [deviceName, setDeviceName] =useState('');
    const [device_id, setDeviceId] =useState('');
    const [description, setDescription] =useState('');
    const [assetTag, setAssetTag] =useState('');
    const [macAddress, setMacAddress] =useState('');
    const [deviceIcon, setDeviceIcon] = useState('');
    const [location_id, setLocationId] = useState(19);
    const [branch_id, setBranchId] = useState(22);
    const [facility_id, setFacilityId] = useState(12); 
    const [building_id, setBuildingId] = useState(10);
    const [floor_id, setFloorId] = useState(7);
    const [lab_id, setLabId] = useState(19);
    const [devicelocationId, setDeviceLocationId] =useState('');
    const [errorObject, setErrorObject] = useState({});
    const [category, setCategory] =useState([]);
    const countries = [
        { id: 1, code: 'dataloger', label: 'Data Loger' },
        {
          id: 2,
          code: 'thermosensor',
          label: 'Thermo Sensor'
        },
        { id: 3, code: 'computer', label: 'Computer' }
    ];

    const categorydefaultProps = {
        options : category,
        getOptionLabel: (option) => option.categoryName,
    };
    const defaultProps = {
        options: countries,
        getOptionLabel: (option) => option.label,
    };

    useEffect(()=>{
        if (locationData) {
            setOpen(open);
            loaddata();
        }
    },[locationData]);

    const loaddata = () =>{
        setCategory(categoryList || []);
        const coordinates = locationData.Cordinates ? locationData.Cordinates.split(',') : ['',''];
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

    }
        
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setOpen(false);
        setErrorObject({});
        
    }

    const handleSuccess = (data) => {
        setOpen(false);
        return data;
    }
    
    const handleException = (errorObject) => {
        console.log(JSON.stringify(errorObject));
    }
    const onMapClick = (e)=>{
        delete errorObject.coordinates;
    }

    const validateForNullValue = (value, type) => {
        LocationFormValidate(value, type, setErrorObject);
    };

    const setFloorCoordinations = (value) =>{
        let cord = value.top+","+value.left;
        setFloorCords(cord);
        console.log(floorCords);
    }
  return (
    <Dialog
        sx={{ "& .MuiDialog-paper": { minWidth: '50%', padding:0} }}
        maxWidth="sm"
        open={open}
    >
        <DialogTitle>
            {isAddButton ? "Locate Device" : "Locate Device"}
        </DialogTitle>
        <DialogContent >
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md  -space-y-px ">
                    <div className="mx-auto outline-black">
                        <div className="inline">
                            <div className="w-full sm:float-left lg:w-1/6 pr-3 p-0 ">
                                
                            </div>
                            <div className="w-full sm:float-right lg:float-left  pr-1">
                                <Box
                                    sx={{
                                        width: 1 ,
                                        height: '100%'
                                    }}
                                    // style={{width:1, height:60+'vh',borderColor:'black'}}
                                    >
                                    <ImageMarkerComponent
                                        src={labMap || floorPlan}
                                        height='100%'
                                        width='500px'
                                        setFloorCoordinations= {setFloorCoordinations}
                                        floorCords={floorCords}
                                        deviceIcon = {deviceIcon}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="float-right">
                        <div className="rounded-md -space-y-px">
                            <Button 
                                type="submit"
                                disabled={errorObject?.coordinates?.errorStatus || errorObject?.stateName?.errorStatus}
                            >
                                {/* {isAddButton ? "Add" : "Update"} */}
                                Done
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
    </Dialog>
  )
}

export default DeviceLocationModal