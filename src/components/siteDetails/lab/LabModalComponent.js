import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LabAddService, LabEditService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validation/locationValidation';
import ImageMarkerComponent from './imageMarker';
// import ImageMarkerComponent from '../../maps/imageMarker';
import { LabFormValidate } from '../../../validation/locationValidation';
import NotificationBar from '../../notification/ServiceNotificationBar';
import previewImage from '../../../images/chooseFile.png';

function LabModal({
  open, setOpen, isAddButton, editData, locationId, branchId, facilityId, buildingId, floorId, setRefreshData, img,
}) {
  const [labDepName, setLabDepName] = useState('');
  const [labDepMap, setLabDepMap] = useState({});
  const [labCoordinates, setLabCords] = useState('');
  const [location_id, setLocationId] = useState(locationId);
  const [branch_id, setBranchId] = useState(branchId);
  const [facility_id, setFacilityId] = useState(facilityId);
  const [building_id, setBuildingId] = useState(buildingId);
  const [floor_id, setFloorId] = useState(floorId);
  const [labid, setLabId] = useState('');
  const [previewLab, setPreviewLab] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (editData) {
      setOpen(open);
      loaddata();
    }
  }, [editData]);

  const loaddata = () => {
    setLabDepName(editData.labDepName || '');
    setLabId(editData.id || '');
    setLabCords(editData.labCords || '');
    setPreviewLab(editData.labDepMap ? `http://varmatrix.com/Aqms/blog/public/${editData.labDepMap}` : previewImage);
  };
  const handleSubmit = async (e) => {
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
    const labCords = labCoordinates ? JSON.stringify(labCoordinates) : editData.labCords;
    if (isAddButton) {
      await LabAddService({
        labDepName, labDepMap, labDepMap, labCords, location_id, branch_id, facility_id, building_id, floor_id,
      }, handleSuccess, handleException);
    } else {
      await LabEditService({
        labDepName, labDepMap, labDepMap, labCords, location_id, branch_id, facility_id, building_id, floor_id, labid,
      }, handleSuccess, handleException);
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

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setErrorObject({});
  };

  const validateForNullValue = (value, type) => {
    // LocationFormValidate(value, type, setErrorObject);
    LabFormValidate(value, type, setErrorObject);
  };

  const setFloorCoordinations = (value) => {
    const newcoordinates = [{
      left: value.left,
      top: value.top,
    }];
    setLabCords((prevCoordinates) => [...prevCoordinates, ...newcoordinates]);
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
        {isAddButton ? 'Add Lab' : 'Edit Lab'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="container mx-auto outline-black">
              <div className="inline">
                <div className="w-full sm:float-left lg:w-2/5  pr-3 pl-3">
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Lab Name"
                      type="text"
                      value={labDepName}
                      variant="outlined"
                      placeholder="Please enter Floor name"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(labDepName, 'labDepName')}
                      onChange={(e) => { setLabDepName(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.labDepName?.errorStatus}
                      helperText={errorObject?.labDepName?.helperText}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      label="Lab Image"
                      required={!!isAddButton}
                      onBlur={() => {
                        validateForNullValue(labDepMap, 'buildingImg');
                      }}
                      onChange={(e) => {
                        // setCustomerLogo(e.target.files);
                        if (e.target.files && e.target.files.length > 0) {
                          setLabDepMap(e.target.files[0]);
                          // const reader = new FileReader();
                          // reader.readAsDataURL(e.target.files[0]);
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setLabDepMap(reader.result);
                              setPreviewLab(reader.result);
                              // setImgdata(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      type="file"
                      inputProps={{
                        accept: 'image/png',
                      }}
                      error={errorObject?.buildingImg?.errorStatus}
                      helperText={errorObject?.buildingImg?.helperText}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2" style={{ border: '2px black solid' }}>
                    <img src={previewLab} style={{ width: '-webkit-fill-available' }} />
                  </div>
                </div>
                <div className="w-full sm:float-right lg:float-left lg:w-3/5 pr-1">
                  <ImageMarkerComponent
                    src={img}
                    height="500px"
                    width="500px"
                    setFloorCoordinations={setFloorCoordinations}
                    floorCords={labCoordinates}
                    setLabCords={setLabCords}
                  />
                </div>
              </div>
            </div>
            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                  type="submit"
                  disabled={errorObject?.labDepName?.errorStatus}
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
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default LabModal;
