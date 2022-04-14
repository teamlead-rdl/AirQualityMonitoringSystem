import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogActions from '@mui/material/DialogActions';
import { AddCategoryValidate } from '../../../../../validatation/formValidation';
import { CategoryAddService, CategoryEditService } from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';

const CategoryModel = ({open, setOpen, isAddButton, categoryData, setRefreshData}) => {
    const [id, setId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');    
    const [errorObject, setErrorObject] = useState({});

    const [openNotification, setNotification] = useState({
      status: false,
      type: 'error',
      message: ''
    });

    useEffect(()=>{
        setOpen(open);
        loadData();
      },[categoryData]);
  
    const loadData = () =>{
      setId(categoryData.id || '');
      setCategoryName(categoryData.categoryName || '');
      setCategoryDescription(categoryData.categoryDescription || '');      
    }

    const validateForNullValue = (value, type) => {
        AddCategoryValidate(value, type, setErrorObject);
    };

    const handleSuccess = (dataObject) => {
      console.log(JSON.stringify(dataObject));
      setNotification({
        status: true,
        type: 'success',
        message: dataObject.message
      });

      setRefreshData((oldvalue)=>{
        return !oldvalue;
      });

      setTimeout(()=>{
        setOpen(false);
      },4000);
    }

    const handleException = (errorObject, errorMessage) => {
      console.log(JSON.stringify(errorObject));
      setNotification({
        status: true,
        type: 'error',
        message: errorMessage
      });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(isAddButton){
          await CategoryAddService({ categoryName,categoryDescription }, handleSuccess, handleException);    
        }
        else{         
          await CategoryEditService({ id,categoryName,categoryDescription }, handleSuccess, handleException);
        }
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
          fullWidth = { true }
          maxWidth = "sm"
          sx = {{'& .MuiDialog-paper':{width: '80%', maxHeight: '100%' }}
          }
          open={open}
      >
        <form onSubmit={handleSubmit} >
          <DialogTitle>
            {isAddButton ? "Add Catagory" : "Edit Category"}
          </DialogTitle>        
          <DialogContent>        
            <TextField
                margin="dense"
                id="outlined-required"
                label="Category Name"              
                defaultValue=""
                fullWidth
                value={categoryName}
                required
                onBlur={() =>validateForNullValue(categoryName, 'categoryName')}
                onChange={(e) => { setCategoryName(e.target.value)}}
                autoComplete="off"
                error={errorObject?.categoryName?.errorStatus}
                helperText={errorObject?.categoryName?.helperText} 
            />
            <TextField
                id="dense"
                label="Category Descriptions"
                multiline
                margin="dense"
                maxRows={4}
                fullWidth
                value={categoryDescription}
                required
                onBlur={() =>validateForNullValue(categoryDescription, 'categoryDescription')}
                onChange={(e) => { setCategoryDescription(e.target.value)}}
                autoComplete="off"
                error={errorObject?.categoryDescription?.errorStatus}
                helperText={errorObject?.categoryDescription?.helperText} 
            />       
          </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
            <Button 
                size = "large"
                variant = "outlined"
                autoFocus 
                onClick={(e)=>{
                      setOpen(false);
                      setErrorObject({});
                      loadData();
                    }} >
                Cancel 
            </Button> 
            <Button 
                disabled={errorObject?.categoryName?.errorStatus || errorObject?.categoryDescription?.errorStatus }
                size="large"
                variant ="contained"
                type = "submit">  {isAddButton ? "Add" : "Update"}
            </Button> 

          </DialogActions> 
        </form>  
        <NotificationBar
            hideLimit={3000}
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type} 
          />   
      </Dialog>
  )
}

export default CategoryModel