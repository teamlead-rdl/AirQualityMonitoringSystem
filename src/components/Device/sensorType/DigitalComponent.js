import {
  DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import React from 'react';
import { AddCategoryValidate } from '../../../validation/formValidation';
import { useUserAccess } from '../../../context/UserAccessProvider';

function Digital({
  errorObject, setErrorObject, digitalAlertType, setDigitalAlertType, digitalLowAlert, setDigitalLowAlert,
  digitalHighAlert, setDigitalHighAlert,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };
  return (
    <DialogContent sx={{ px: 0, p: 0 }}>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }} disabled={moduleAccess.edit === false && true}>
            <InputLabel id="demo-simple-select-label">
              Sensor alert
            </InputLabel>
            <Select
              sx={{ minWidth: 250 }}
              labelId="demo-simple-select-label"
              value={digitalAlertType}
              required
              label="Sensor alert"
              onChange={(e) => {
                setDigitalAlertType(e.target.value);
              }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Disable">Disable</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {digitalAlertType == 'Low'
          ? (
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <div className="rounded-md -space-y-px">
                <TextField
                  sx={{ marginTop: 0 }}
                  value={digitalLowAlert}
                  disabled={moduleAccess.edit === false && true}
                  onBlur={() => validateForNullValue(digitalLowAlert, 'digitalLowAlert')}
                  onChange={(e) => {
                    setDigitalLowAlert(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Low alert message"
                  fullWidth
                  error={errorObject?.digitalLowAlert?.errorStatus}
                  helperText={errorObject?.digitalLowAlert?.helperText}
                  autoComplete="off"
                />
              </div>
            </Grid>
          )
          : digitalAlertType == 'High'
            ? (
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={digitalHighAlert}
                    disabled={moduleAccess.edit === false && true}
                    onBlur={() => validateForNullValue(digitalHighAlert, 'digitalHighAlert')}
                    onChange={(e) => {
                      setDigitalHighAlert(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="High alert message"
                    fullWidth
                    error={errorObject?.digitalHighAlert?.errorStatus}
                    helperText={errorObject?.digitalHighAlert?.helperText}
                    autoComplete="off"
                  />
                </div>
              </Grid>
            )
            : ''}
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <div className="rounded-md -space-y-px" />
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default Digital;
