import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';

function StelTWA({
  disable,
  isStel,
  setIsStel,
  isAQI,
  setIsAQI,
  stelDuration,
  setStelDuration,
  stelType,
  setStelType,
  stelLimit,
  setStelLimit,
  stelAlert,
  setStelAlert,
  twaDuration,
  setTwaDuration,
  twaType,
  setTwaType,
  twaLimit,
  setTwaLimit,
  twaAlert,
  setTwaAlert,
  parmGoodMinScale,
  setParmGoodMinScale,
  parmGoodMaxScale,
  setParmGoodMaxScale,
  parmSatisfactoryMinScale,
  setParmSatisfactoryMinScale,
  parmSatisfactoryMaxScale,
  setParmSatisfactoryMaxScale,
  parmModerateMinScale,
  setParmModerateMinScale,
  parmModerateMaxScale,
  setParmModerateMaxScale,
  parmPoorMinScale,
  setParmPoorMinScale,
  parmPoorMaxScale,
  setParmPoorMaxScale,
  parmVeryPoorMinScale,
  setParmVeryPoorMinScale,
  parmVeryPoorMaxScale,
  setParmVeryPoorMaxScale,
  parmSevereMinScale,
  setParmSevereMinScale,
  parmSevereMaxScale,
  setParmSevereMaxScale,
}) {
  const isStelHandleChange = () => {
    setIsStel((oldvalue) => {
      return !oldvalue;
    });
  };

  const isAQIHandleChange = () => {
    setIsAQI((oldvalue) => {
      return !oldvalue;
    });
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox disabled={disable || false} checked={isStel} onChange={isStelHandleChange} />
              }
              label="STEL & TWA"
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid
        sx={{
          mt: 0,
          padding: 1,
          border: '1px solid black',
          display: isStel ? 'block' : 'none',
        }}
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
                label="Duration (In Seconds)"
                required={isStel === true}
                disabled={(isStel !== true) || disable}
                fullWidth
                type="number"
                // error={errorObject?.partId?.errorStatus}
                // helperText={errorObject?.partId?.helperText}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
                onChange={(e) => {
                  setStelType(e.target.value);
                }}
                // error={errorObject?.deviceName?.errorStatus}
                // helperText={errorObject?.deviceName?.helperText}
              >
                <MenuItem value="ppm">PPM</MenuItem>
                <MenuItem value="mg/m3">
                  mg/m
                  <sup>3</sup>
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
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
            sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
                id="outlined-required"
                label="Duration (In Seconds)"
                fullWidth
                type="number"
                // error={errorObject?.partId?.errorStatus}
                // helperText={errorObject?.partId?.helperText}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
                onChange={(e) => {
                  setTwaType(e.target.value);
                }}
                // error={errorObject?.deviceName?.errorStatus}
                // helperText={errorObject?.deviceName?.helperText}
              >
                <MenuItem value="ppm">PPM</MenuItem>
                <MenuItem value="mg/m3">
                  mg/m
                  <sup>3</sup>
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
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
                required={isStel === true}
                disabled={(isStel !== true) || disable}
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
      <Grid container spacing={1}>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox disabled={disable || false} checked={isAQI} onChange={isAQIHandleChange} />}
              label="AQI"
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid
        sx={{
          mt: 2, padding: 1, border: '1px solid black', display: isAQI ? 'block' : 'none',
        }}
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            Good :
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmGoodMinScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmGoodMinScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Minimum Value"
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmGoodMaxScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmGoodMaxScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Maximum Value"
                fullWidth
                type="number"
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
            sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            Satisfactory :
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmSatisfactoryMinScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmSatisfactoryMinScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Minimum Value"
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmSatisfactoryMaxScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmSatisfactoryMaxScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Maximum Value"
                fullWidth
                type="number"
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
            sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            Moderately :
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmModerateMinScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmModerateMinScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Minimum Value"
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmModerateMaxScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmModerateMaxScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Maximum Value"
                fullWidth
                type="number"
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
            sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            Poor :
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmPoorMinScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmPoorMinScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Minimum Value"
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmPoorMaxScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmPoorMaxScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Maximum Value"
                fullWidth
                type="number"
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
            sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            Very Poor :
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmVeryPoorMinScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmVeryPoorMinScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Minimum Value"
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmVeryPoorMaxScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmVeryPoorMaxScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Maximum Value"
                fullWidth
                type="number"
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
            sx={{ padding: 0, textAlign: 'center', alignSelf: 'center' }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            Severe :
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmSevereMinScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmSevereMinScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Minimum Value"
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
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <TextField
                sx={{ marginTop: 0 }}
                value={parmSevereMaxScale}
                // onBlur={() => validateForNullValue(partId, "partId")}
                onChange={(e) => {
                  setParmSevereMaxScale(e.target.value);
                }}
                margin="normal"
                required={isAQI === true}
                disabled={(isAQI !== true) || disable}
                id="outlined-required"
                label="Maximum Value"
                fullWidth
                type="number"
                // error={errorObject?.partId?.errorStatus}
                // helperText={errorObject?.partId?.helperText}
                autoComplete="off"
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default StelTWA;
