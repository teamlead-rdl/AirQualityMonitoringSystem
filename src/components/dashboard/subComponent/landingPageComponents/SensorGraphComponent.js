import React, { useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import {
  Button, Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import { DashboardIndividualSensorDetails } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
function SensorGraphComponent({
  open, setOpen, sensorTagId, segretionInterval, rangeInterval,
}) {
  useEffect(() => {
    DashboardIndividualSensorDetails({ sensorTagId, segretionInterval, rangeInterval }, handleSuccess, handleException);
  }, [sensorTagId, segretionInterval, rangeInterval]);

  const handleSuccess = (dataObject) => {
  };

  const handleException = () => {};

  const data = [
    {
      id: 'japan',
      color: 'hsl(57, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 275,
        },
        {
          x: 'helicopter',
          y: 62,
        },
        {
          x: 'boat',
          y: 86,
        },
        {
          x: 'train',
          y: 278,
        },
        {
          x: 'subway',
          y: 170,
        },
        {
          x: 'bus',
          y: 115,
        },
        {
          x: 'car',
          y: 266,
        },
        {
          x: 'moto',
          y: 120,
        },
        {
          x: 'bicycle',
          y: 276,
        },
        {
          x: 'horse',
          y: 295,
        },
        {
          x: 'skateboard',
          y: 280,
        },
        {
          x: 'others',
          y: 23,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(104, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 107,
        },
        {
          x: 'helicopter',
          y: 271,
        },
        {
          x: 'boat',
          y: 283,
        },
        {
          x: 'train',
          y: 196,
        },
        {
          x: 'subway',
          y: 57,
        },
        {
          x: 'bus',
          y: 223,
        },
        {
          x: 'car',
          y: 249,
        },
        {
          x: 'moto',
          y: 111,
        },
        {
          x: 'bicycle',
          y: 52,
        },
        {
          x: 'horse',
          y: 138,
        },
        {
          x: 'skateboard',
          y: 119,
        },
        {
          x: 'others',
          y: 74,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(79, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 249,
        },
        {
          x: 'helicopter',
          y: 180,
        },
        {
          x: 'boat',
          y: 211,
        },
        {
          x: 'train',
          y: 50,
        },
        {
          x: 'subway',
          y: 105,
        },
        {
          x: 'bus',
          y: 254,
        },
        {
          x: 'car',
          y: 259,
        },
        {
          x: 'moto',
          y: 175,
        },
        {
          x: 'bicycle',
          y: 66,
        },
        {
          x: 'horse',
          y: 272,
        },
        {
          x: 'skateboard',
          y: 57,
        },
        {
          x: 'others',
          y: 161,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(53, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 36,
        },
        {
          x: 'helicopter',
          y: 76,
        },
        {
          x: 'boat',
          y: 97,
        },
        {
          x: 'train',
          y: 59,
        },
        {
          x: 'subway',
          y: 130,
        },
        {
          x: 'bus',
          y: 76,
        },
        {
          x: 'car',
          y: 254,
        },
        {
          x: 'moto',
          y: 81,
        },
        {
          x: 'bicycle',
          y: 247,
        },
        {
          x: 'horse',
          y: 28,
        },
        {
          x: 'skateboard',
          y: 43,
        },
        {
          x: 'others',
          y: 110,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(152, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 262,
        },
        {
          x: 'helicopter',
          y: 96,
        },
        {
          x: 'boat',
          y: 284,
        },
        {
          x: 'train',
          y: 151,
        },
        {
          x: 'subway',
          y: 173,
        },
        {
          x: 'bus',
          y: 300,
        },
        {
          x: 'car',
          y: 110,
        },
        {
          x: 'moto',
          y: 126,
        },
        {
          x: 'bicycle',
          y: 278,
        },
        {
          x: 'horse',
          y: 85,
        },
        {
          x: 'skateboard',
          y: 85,
        },
        {
          x: 'others',
          y: 167,
        },
      ],
    },
  ];
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle />
      <DialogContent>
        <div style={{ height: 250 }}>
          <ResponsiveLine
            data={data}
            margin={{
              top: 50, right: 110, bottom: 50, left: 60,
            }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'transportation',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
        <Button
          sx={{ m: 1 }}
          size="large"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SensorGraphComponent;
