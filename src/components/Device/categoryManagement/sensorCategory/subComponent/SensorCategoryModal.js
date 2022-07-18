import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { AddCategoryValidate } from '../../../../../validation/formValidation';
import {
  SensorCategoryAddService, SensorCategoryEditService,
} from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';
import MeasureUnit from './MeasureUnit';

function SensorCategoryModal({
  open, setOpen, isAddButton, categoryData, setRefreshData,
}) {
  const [id, setId] = useState('');
  const [sensorName, setCategoryName] = useState('');
  const [sensorDescriptions, setCategoryDescription] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const [unitId, setUnitId] = useState('');
  const [unitLabel, setUnitLabel] = useState('');
  const [unitMeasure, setUnitMeasure] = useState('');
  const [measureUnits, setMeasureUnits] = useState([]);
  const [isAddUnit, setIsAddUnit] = useState(true);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  useEffect(() => {
    setOpen(open);
    loadData();
  }, [categoryData]);

  const loadData = () => {
    setId(categoryData.id || '');
    setCategoryName(categoryData.sensorName || '');
    setCategoryDescription(categoryData.sensorDescriptions || '');
    // console.log(categoryData?.measureUnitList);
    // console.log(categoryData?.measureUnitList?.replaceAll('"', ''));
    // if(categoryData.measureUnitList){
    //   console.log(JSON.parse(categoryData.measureUnitList));
    // }
    // console.log(categoryData.measureUnitList !== null ?
    // JSON.parse(categoryData?.measureUnitList !== null ?
    // categoryData.measureUnitList : '') : '');

    // if(stringified === null){
    //   setMeasureUnits([]);
    // }else{
    //   setMeasureUnits(JSON.parse(stringified));
    // }
  };

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
    setMeasureUnits([]);
  };

  /* eslint-disable-next-line */
  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddButton) {
      /* eslint-disable-next-line */
      SensorCategoryAddService({ sensorName, sensorDescriptions, measureUnitList: JSON.stringify(measureUnits) }, handleSuccess, handleException);
    } else {
      SensorCategoryEditService({ id, sensorName, sensorDescriptions }, handleSuccess, handleException);
    }
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const addMeasureUnits = () => {
    if (unitLabel === '') {
      setErrorObject((oldData) => {
        const status = {
          errorStatus: true,
          helperText: 'Enter valid unit Label',
        };
        return {
          ...oldData,
          unitLabel: status,
        };
      });
    } else if (measureUnits === '') {
      setErrorObject((oldData) => {
        const status = {
          errorStatus: true,
          helperText: 'Enter valid unit Measure',
        };
        return {
          ...oldData,
          unitMeasure: status,
        };
      });
    } else if (unitId === '') {
      const newMeasureUnits = [...measureUnits, { unitLabel, unitMeasure }];
      setMeasureUnits(newMeasureUnits);
      setUnitMeasure('');
      setUnitLabel('');
    } else {
      const newMeasureUnits = [...measureUnits];
      newMeasureUnits[unitId].unitLabel = unitLabel;
      newMeasureUnits[unitId].unitMeasure = unitMeasure;
      setMeasureUnits(newMeasureUnits);
      setUnitMeasure('');
      setUnitLabel('');
      setIsAddUnit(true);
      setUnitId('');
    }
  };

  const updateMeasureUnits = (index) => {
    setUnitId(index);
    setUnitLabel(measureUnits[index].unitLabel);
    setUnitMeasure(measureUnits[index].unitMeasure);
    setIsAddUnit(false);
  };

  const removeMeasureUnits = (index) => {
    const newMeasureUnits = [...measureUnits];
    newMeasureUnits.splice(index, 1);
    setMeasureUnits(newMeasureUnits);
  };

  const clearMeasureUnits = () => {
    setUnitMeasure('');
    setUnitLabel('');
    setErrorObject('');
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isAddButton ? 'Add Category' : 'Edit Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="outlined-required"
            label="Category Name"
            defaultValue=""
            fullWidth
            value={sensorName}
            required
            onBlur={() => validateForNullValue(sensorName, 'categoryName')}
            onChange={(e) => { setCategoryName(e.target.value); }}
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
            value={sensorDescriptions}
            required
            onBlur={() => validateForNullValue(sensorDescriptions, 'categoryDescription')}
            onChange={(e) => { setCategoryDescription(e.target.value); }}
            autoComplete="off"
            error={errorObject?.categoryDescription?.errorStatus}
            helperText={errorObject?.categoryDescription?.helperText}
          />
        </DialogContent>
        <DialogContent>
          <div className="flex items-center justify-between gap-2">
            <TextField
              id="dense"
              label="Units label"
              multiline
              margin="dense"
              maxRows={4}
              fullWidth
              value={unitLabel}
              /* eslint-disable-next-line */
              onBlur={() => validateForNullValue(unitLabel, 'unitLabel')}
              onChange={(e) => { setUnitLabel(e.target.value); }}
              autoComplete="off"
              error={errorObject?.unitLabel?.errorStatus}
              helperText={errorObject?.unitLabel?.helperText}
            />
            <TextField
              id="dense"
              multiline
              label="Units Measure"
              margin="dense"
              maxRows={4}
              fullWidth
              value={unitMeasure}
              onBlur={() => validateForNullValue(unitMeasure, 'unitMeasure')}
              onChange={(e) => { setUnitMeasure(e.target.value); }}
              autoComplete="off"
              error={errorObject?.unitMeasure?.errorStatus}
              helperText={errorObject?.unitMeasure?.helperText}
            />
            <Button
              size="large"
              autoFocus
              disabled={errorObject?.unitLabel?.errorStatus || errorObject?.unitMeasure?.errorStatus}
              onClick={addMeasureUnits}
            >
              {isAddUnit ? 'Add' : 'Update'}
            </Button>
            <Button
              size="large"
              autoFocus
              onClick={clearMeasureUnits}
            >
              Cancel
            </Button>
          </div>
          <div className="flex items-center justify-between gap-3 mt-5">
            <div className="todo-container">
              <div className="header">Units Label and Measures</div>
              <div className="tasks">
                {
                  measureUnits.length > 0
                    ? measureUnits.map((measureUnit, index) => (
                      /* eslint-disable-next-line */
                      <MeasureUnit  measureUnit={measureUnit} index={index}   key={index}
                        removeMeasureUnits={removeMeasureUnits}
                        updateMeasureUnits={updateMeasureUnits}
                      />
                    )) : ''
                }
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions sx={{ margin: '10px' }}>
          <Button
            size="large"
            autoFocus
            onClick={() => {
              setOpen(false);
              setErrorObject({});
              loadData();
              setMeasureUnits([]);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={errorObject?.categoryName?.errorStatus || errorObject?.categoryDescription?.errorStatus}
            size="large"
            type="submit"
          >
            {' '}
            {isAddButton ? 'Add' : 'Update'}
          </Button>

        </DialogActions>
      </form>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default SensorCategoryModal;
