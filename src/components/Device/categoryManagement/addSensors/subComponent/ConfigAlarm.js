import { Checkbox, Dialog, DialogContent, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const ConfigAlarm = ({open}) => {
    const [checked, setChecked] = useState(false);
    const handleChange = () =>{
        setChecked((oldvalue)=>{
            return !oldvalue
        })
    }
  return (
    <Dialog
        fullWidth = { true }
        maxWidth = "lg"
        sx = {{width:'100%' , height:'100%'}}
        open={open}
    > 
      <DialogContent sx={{ px: 0, p: 5 }}>
        <Typography sx={{ m: 0 }} variant="h5">
            "Config Alarm"
        </Typography>
        <Grid container spacing={1} sx={{ mt: 0 }} xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              item
              xs={12}
              sm={2}
              md={2}
              lg={2}
              xl={2}
            >   
                <FormGroup>
                    <FormControlLabel
                    control = {<Checkbox
                        checked={checked}
                        onChange={handleChange}
                        />}
                    label = "STEL & TWA"
                    />
                </FormGroup>
            </Grid>
            <Grid
              sx={{ mt: 0, padding: 0 }}
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >  
                <Grid
                sx={{ mt: 0, padding: 0, border: '1px solid black' }}
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                >
                <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    lg={2}
                    xl={2}
                    > 
                    STEL :
                </Grid>
                <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={2}
                    sm={2.5}
                    md={2.5}
                    lg={2.5}
                    xl={2.5}
                    > 
                    <div className="rounded-md -space-y-px">
                        <TextField
                            sx={{ marginTop: 1 }}
                            // value={partId}
                            // onBlur={() => validateForNullValue(partId, "partId")}
                            onChange={(e) => {
                                // setPartId(e.target.value);
                            }}
                            margin="dense"
                            required
                            id="outlined-required"
                            label="Duration"
                            fullWidth
                            type="time"
                            // error={errorObject?.partId?.errorStatus}
                            // helperText={errorObject?.partId?.helperText}
                            autoComplete="off"
                        />
                    </div>
                </Grid>
                <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={2}
                    sm={2.5}
                    md={2.5}
                    lg={2.5}
                    xl={2.5}
                    > 
                    <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                        Type
                    </InputLabel>
                        <Select
                            sx={{ marginTop: 1 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={sensorOutput}
                            label="Type"
                            onChange={(e) => {
                            // setSensorOutput(e.target.value);
                            }}
                            // error={errorObject?.deviceName?.errorStatus}
                            // helperText={errorObject?.deviceName?.helperText}
                        >
                            <MenuItem value={"ppm"}>PPM</MenuItem>
                            <MenuItem value={"mg/m3"}>mg/m<sup>3</sup></MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={2}
                    sm={2.5}
                    md={2.5}
                    lg={2.5}
                    xl={2.5}
                    > 
                    <div className="rounded-md -space-y-px">
                        <TextField
                            sx={{ marginTop: 1 }}
                            // value={partId}
                            // onBlur={() => validateForNullValue(partId, "partId")}
                            onChange={(e) => {
                                // setPartId(e.target.value);
                            }}
                            margin="normal"
                            required
                            id="outlined-required"
                            label="Limit"
                            fullWidth
                            type="number"
                            // error={errorObject?.partId?.errorStatus}
                            // helperText={errorObject?.partId?.helperText}
                            autoComplete="off"
                        />
                    </div>
                </Grid>
                <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={2}
                    sm={2.5}
                    md={2.5}
                    lg={2.5}
                    xl={2.5}
                    > 
                    <div className="rounded-md -space-y-px">
                        <TextField
                            sx={{ marginTop: 1 }}
                            // value={partId}
                            // onBlur={() => validateForNullValue(partId, "partId")}
                            onChange={(e) => {
                                // setPartId(e.target.value);
                            }}
                            margin="normal"
                            required
                            id="outlined-required"
                            label="Alert Tag"
                            fullWidth
                            type="text"
                            // error={errorObject?.partId?.errorStatus}
                            // helperText={errorObject?.partId?.helperText}
                            autoComplete="off"
                        />
                    </div>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ConfigAlarm