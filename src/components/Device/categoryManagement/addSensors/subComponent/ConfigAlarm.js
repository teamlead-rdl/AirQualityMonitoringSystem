import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StelEditService } from "../../../../../services/LoginPageService";

const ConfigAlarm = ({ open, setOpen, editData }) => {
    console.log(editData);
  const [id, setId] = useState('');
  const [alarm, setAlarm] = useState('');
  const [unLatchDuration, setUnLatchDuration] = useState(0);
  const [isStel, setIsStel] = useState(false);
  const [stelDuration, setStelDuration] = useState('');
  const [stelType, setStelType] = useState('ppm');
  const [stelLimit, setStelLimit] = useState(0);
  const [stelAlert, setStelAlert] = useState('');
  const [twaDuration, setTwaDuration] = useState('');
  const [twaType, setTwaType] = useState('ppm');
  const [twaLimit, setTwaLimit] = useState(0);
  const [twaAlert, setTwaAlert] = useState('');

  useEffect(()=>{
    setId(editData?.id || '')
  },[editData]);

  const handleChange = () => {
    setIsStel((oldvalue) => {
      return !oldvalue;
    });
  };
  const onSubmit = (e) =>{
    e.preventDefault();
    StelEditService({id, alarm, unLatchDuration, isStel, stelDuration, stelType, stelLimit, stelAlert, twaDuration, twaType, twaLimit, twaAlert})
  }
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      sx={{ width: "100%", height: "100%" }}
      open={open}
    >
      <DialogContent sx={{ px: 0, p: 5 , paddingBottom: 2}}>
        <Typography sx={{ m: 0 }} variant="h5">
          Config Alarm
        </Typography>
        <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={1}
          sx={{ mt: 0 }}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Grid
            sx={{ mt: 2, padding: 1 }}
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid
            sx={{ mt: 0, padding: 0, textAlign: 'center', alignSelf: 'center' }}
            item
            xs={6}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            >
            Alarm :
            </Grid>
            <Grid
            sx={{ mt: 0, padding: 0, alignSelf: 'center' }}
            item
            xs={6}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            >
            <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                <InputLabel id="demo-simple-select-label3">Alarm Type</InputLabel>
                <Select
                sx={{ marginTop: 0 }}
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                value={alarm}
                label="Alarm Type"
                required
                onChange={(e) => {
                    setAlarm(e.target.value);
                }}
                // error={errorObject?.deviceName?.errorStatus}
                // helperText={errorObject?.deviceName?.helperText}
                >
                <MenuItem value={"Latch"}>Latch</MenuItem>
                <MenuItem value={"UnLatch"}>UnLatch</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            {alarm == 'UnLatch' 
            ?
            <>
            <Grid
            sx={{ mt: 0, padding: 0, textAlign: 'center', alignSelf: 'center'}}
            item
            xs={6}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            >
            Duration :
            </Grid>
            <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={6}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            >
            <div className="rounded-md -space-y-px">
                <TextField
                sx={{ marginTop: 0 }}
                value={unLatchDuration}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                    setUnLatchDuration(e.target.value);
                }}
                margin="dense"
                required
                id="outlined-required"
                label="Duration (In Seconds)"
                fullWidth
                type="number"
                // error={errorObject?.partId?.errorStatus}
                // helperText={errorObject?.partId?.helperText}
                autoComplete="off"
                InputLabelProps={{
                    shrink: true
                }}
                />
            </div>
            </Grid>
            </>
            :
            ''
            }
         </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isStel} onChange={handleChange} />}
                label="STEL & TWA"
              />
            </FormGroup>
          </Grid>
          
          <Grid
            sx={{ mt: 0, padding: 1, border: "1px solid black" }}
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid
              sx={{ mt: 0, padding: 0 }}
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              spacing={1}
            >
              <Grid
                sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
                item
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
              >
                STEL :
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={stelDuration}
                    // onBlur={() => validateForNullValue(partId, "partId")}
                    onChange={(e) => {
                        setStelDuration(e.target.value);
                    }}
                    margin="dense"
                    id="outlined-required"
                    label="Duration"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
                    fullWidth
                    type="time"
                    // error={errorObject?.partId?.errorStatus}
                    // helperText={errorObject?.partId?.helperText}
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true
                    }}
                  />
                </div>
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    sx={{ marginTop: 0 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={stelType}
                    label="Type"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
                    onChange={(e) => {
                        setStelType(e.target.value);
                    }}
                    // error={errorObject?.deviceName?.errorStatus}
                    // helperText={errorObject?.deviceName?.helperText}
                  >
                    <MenuItem value={"ppm"}>PPM</MenuItem>
                    <MenuItem value={"mg/m3"}>
                      mg/m<sup>3</sup>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={stelLimit}
                    // onBlur={() => validateForNullValue(partId, "partId")}
                    onChange={(e) => {
                        setStelLimit(e.target.value);
                    }}
                    margin="normal"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
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
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={stelAlert}
                    // onBlur={() => validateForNullValue(partId, "partId")}
                    onChange={(e) => {
                        setStelAlert(e.target.value);
                    }}
                    margin="normal"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
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
            <Grid
              sx={{ mt: 0, padding: 0 }}
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              spacing={1}
            >
              <Grid
                sx={{  padding: 0, textAlign: 'center', alignSelf: 'center' }}
                item
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
              >
                TWA :
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={twaDuration}
                    // onBlur={() => validateForNullValue(partId, "partId")}
                    onChange={(e) => {
                        setTwaDuration(e.target.value);
                    }}
                    margin="dense"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
                    id="outlined-required"
                    label="Duration"
                    fullWidth
                    type="time"
                    // error={errorObject?.partId?.errorStatus}
                    // helperText={errorObject?.partId?.helperText}
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true
                    }}
                  />
                </div>
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    sx={{ marginTop: 0 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={twaType}
                    label="Type"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
                    onChange={(e) => {
                        setTwaType(e.target.value);
                    }}
                    // error={errorObject?.deviceName?.errorStatus}
                    // helperText={errorObject?.deviceName?.helperText}
                  >
                    <MenuItem value={"ppm"}>PPM</MenuItem>
                    <MenuItem value={"mg/m3"}>
                      mg/m<sup>3</sup>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={twaLimit}
                    // onBlur={() => validateForNullValue(partId, "partId")}
                    onChange={(e) => {
                        setTwaLimit(e.target.value);
                    }}
                    margin="normal"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
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
                xs={12}
                sm={6}
                md={2.5}
                lg={2.5}
                xl={2.5}
              >
                <div className="rounded-md -space-y-px">
                  <TextField
                    sx={{ marginTop: 0 }}
                    value={twaAlert}
                    // onBlur={() => validateForNullValue(partId, "partId")}
                    onChange={(e) => {
                        setTwaAlert(e.target.value);
                    }}
                    margin="normal"
                    required={isStel == true ? true : false}
                    disabled={isStel == true? false : true}
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
        <div className="float-right">
          <Button
            sx={{ m: 2 , mt: 2}}
            onClick={(e) => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
              sx={{ m: 2, mt: 2 }}
              size="large"
              variant="contained"
              type="submit"
            >
            UPDATE
            </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigAlarm;