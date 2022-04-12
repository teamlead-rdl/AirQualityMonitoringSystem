import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { AddCategoryValidate } from '../../../../../validatation/formValidation';
import { CategoryAddService, CategoryEditService, SensorCategoryAddService, SensorCategoryEditService, SensorCategoryFetchService } from '../../../../../services/LoginPageService';
import { Box } from '@mui/system';
import SensorAdd from '../../../SensorAdd';
import SensorConfig from '../../../SensorConfigComponent';

const AddSensorModal = ({open, setOpen, isAddButton, categoryData, CategoryList, setRefreshData}) => {
  const [id, setId] = useState('');
  const [sensorName, setCategoryName] = useState('');
  const [sensorDescriptions, setCategoryDescription] = useState('');    
  const [errorObject, setErrorObject] = useState({});
  const [sensorCategoryList, setSensorCategoryList] = useState([]);

  useEffect(()=>{
    setOpen(open);
    loadData();
  },[categoryData]);
  
  const loadData = () =>{
    setId(categoryData.id || '');
    setCategoryName(categoryData.sensorName || '');
    setCategoryDescription(categoryData.sensorDescriptions || '');    
    setSensorCategoryList(CategoryList);  
  };

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const categoryHandleSuccess = (dataObject) => {
    setSensorCategoryList(dataObject.data);
  };

  const categoryHandleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  };

  const handleSuccess = (data) => {
    setRefreshData((oldvalue)=>{
      return !oldvalue;
    });
  };

  const handleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // -- API call -- //
    if(isAddButton){
      await SensorCategoryAddService({ sensorName,sensorDescriptions }, handleSuccess, handleException);    
    }
    else{         
      await SensorCategoryEditService({ id,sensorName,sensorDescriptions }, handleSuccess, handleException);
    }
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth = { true }
      maxWidth = "lg"
      sx = {{width:'100%' , height:'100%'}}
      open={open}
    > 
      <SensorConfig setOpen={setOpen} isAddButton={isAddButton} editData={categoryData} setRefreshData={setRefreshData}/>    
    </Dialog>
  );
};

export default AddSensorModal;