import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import MachineCircularProgressbar from './MachineCircularProgressbar';

function MachineCard(props) {
  return (
    <Card
      sx={{ minWidth: 200 }}
      onClick={() => {
        props.setSensorTagId(props.id);
        props.setOpen(true);
      }}
    >
      <CardActionArea>
        <Grid item xs={12} style={{ backgroundColor: props.color || '#cce6ff' }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
          >
            <Typography style={{ color: '#004d99' }}>
              {props.cardTitle}

            </Typography>
            <Typography style={{ color: '#004d99' }}>
              {props.sensorName}
            </Typography>
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
              <MachineCircularProgressbar score={props.reviewScore} />
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
                style={{ fontWeight: 600, color: '#7F8487', marginLeft: 9 }}
              >
                {props.actualValue}
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
                style={{ fontWeight: 600, color: '#7F8487', marginLeft: 9 }}
              >
                {props.plannedValue}
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
                style={{ fontWeight: 600, color: '#7F8487', marginLeft: 9 }}
              >
                {props.capacityValue}
              </Typography>
            </div>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default MachineCard;
