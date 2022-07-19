import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import MachineCircularProgressbar from './MachineCircularProgressbar';

function MachineCard(props) {
  return (
    <Card
      sx={{ minWidth: 200, boxShadow: 5, borderRadius: 2 }}
      onClick={() => {
        props.setSensorTagId(props.id);
        props.setSensorTag(props.sensorName);
        props.setOpen(true);
      }}
    >
      <CardActionArea>
        <Grid item xs={12} style={{ backgroundColor: props.lightColor || '#cce6ff', height: '50px' }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
          >
            <Tooltip title={props.sensorNameUnit}>
              <Typography style={{
                color: props.color || '#004d99',
                marginTop: '15px',
                whiteSpace: 'nowrap',
                width: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: '500',
              }}
              >
                {props.sensorNameUnit}
              </Typography>
            </Tooltip>
            <Tooltip title={props.sensorName}>
              <Typography style={{
                color: props.color || '#004d99',
                marginTop: '15px',
                whiteSpace: 'nowrap',
                width: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: '500',
                fontSize: '20px',
              }}
              >
                {props.sensorName}
              </Typography>
            </Tooltip>
          </Stack>
        </Grid>
        <Box sx={{ width: '100%', borderRadius: '8' }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={5}
            mt={2}
            xs={{ justifyContent: 'space-around' }}
          >
            <div style={{
              width: 90, height: 90, float: 'left', marginTop: 2,
            }}
            >
              <MachineCircularProgressbar score={props.last} color={props.alertColor} />
            </div>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-end"
            spacing={1}
          >
            <div>
              <Typography style={{ marginLeft: 9, color: '#004d99' }} align="left" display="block" gutterBottom component="div">
                <b>MIN</b>
              </Typography>
              <Typography
                align="left"
                display="block"
                gutterBottom
                component="div"
                style={{ fontWeight: 600, color: props.color || '#7F8487', marginLeft: 9 }}
              >
                {props.min}
              </Typography>
            </div>
            <div>
              <Typography style={{ marginLeft: 9, color: '#004d99' }} align="left" display="block" gutterBottom component="div">
                <b>MAX</b>
              </Typography>
              <Typography
                align="left"
                display="block"
                gutterBottom
                component="div"
                style={{ fontWeight: 600, color: props.color || '#7F8487', marginLeft: 9 }}
              >
                {props.max}
              </Typography>
            </div>
            <div>
              <Typography style={{ color: '#004d99' }} align="center" display="block" gutterBottom component="div">
                <b>AVG</b>
              </Typography>
              <Typography
                align="center"
                display="block"
                gutterBottom
                component="div"
                style={{ fontWeight: 600, color: props.color || '#7F8487', marginLeft: 9 }}
              >
                {props.avg}
              </Typography>
            </div>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default MachineCard;
