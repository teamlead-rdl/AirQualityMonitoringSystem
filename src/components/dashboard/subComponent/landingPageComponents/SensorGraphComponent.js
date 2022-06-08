import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import {
  Button, Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Grid from '@mui/material/Grid';
import { DashboardIndividualSensorDetails } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
function SensorGraphComponent({
  open, setOpen, sensorTagId, segretionInterval, rangeInterval,
}) {
  useEffect(() => {
   DashboardIndividualSensorDetails({ sensorTagId, segretionInterval, rangeInterval }, handleSuccess, handleException);
  }, [sensorTagId, segretionInterval, rangeInterval]);

  const handleSuccess = (dataObject) => {
    console.log(dataObject);
  };
  const [currency, setCurrency] = useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleException = () => {};
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
  
  const data = [
    {
      "country": "AD",
      "hot dog": 25,
      "hot dogColor": "hsl(345, 70%, 50%)",
      "burger": 123,
      "burgerColor": "hsl(303, 70%, 50%)",
      "sandwich": 6,
      "sandwichColor": "hsl(146, 70%, 50%)",
      "kebab": 70,
      "kebabColor": "hsl(107, 70%, 50%)",
      "fries": 185,
      "friesColor": "hsl(29, 70%, 50%)",
      "donut": 13,
      "donutColor": "hsl(216, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 6,
      "hot dogColor": "hsl(294, 70%, 50%)",
      "burger": 155,
      "burgerColor": "hsl(140, 70%, 50%)",
      "sandwich": 27,
      "sandwichColor": "hsl(155, 70%, 50%)",
      "kebab": 16,
      "kebabColor": "hsl(298, 70%, 50%)",
      "fries": 109,
      "friesColor": "hsl(199, 70%, 50%)",
      "donut": 178,
      "donutColor": "hsl(314, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 160,
      "hot dogColor": "hsl(9, 70%, 50%)",
      "burger": 135,
      "burgerColor": "hsl(221, 70%, 50%)",
      "sandwich": 161,
      "sandwichColor": "hsl(88, 70%, 50%)",
      "kebab": 180,
      "kebabColor": "hsl(347, 70%, 50%)",
      "fries": 105,
      "friesColor": "hsl(244, 70%, 50%)",
      "donut": 10,
      "donutColor": "hsl(246, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 93,
      "hot dogColor": "hsl(29, 70%, 50%)",
      "burger": 153,
      "burgerColor": "hsl(339, 70%, 50%)",
      "sandwich": 197,
      "sandwichColor": "hsl(322, 70%, 50%)",
      "kebab": 155,
      "kebabColor": "hsl(221, 70%, 50%)",
      "fries": 44,
      "friesColor": "hsl(228, 70%, 50%)",
      "donut": 114,
      "donutColor": "hsl(233, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 158,
      "hot dogColor": "hsl(28, 70%, 50%)",
      "burger": 47,
      "burgerColor": "hsl(211, 70%, 50%)",
      "sandwich": 47,
      "sandwichColor": "hsl(95, 70%, 50%)",
      "kebab": 134,
      "kebabColor": "hsl(176, 70%, 50%)",
      "fries": 188,
      "friesColor": "hsl(207, 70%, 50%)",
      "donut": 198,
      "donutColor": "hsl(53, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 59,
      "hot dogColor": "hsl(333, 70%, 50%)",
      "burger": 22,
      "burgerColor": "hsl(274, 70%, 50%)",
      "sandwich": 193,
      "sandwichColor": "hsl(234, 70%, 50%)",
      "kebab": 117,
      "kebabColor": "hsl(56, 70%, 50%)",
      "fries": 85,
      "friesColor": "hsl(78, 70%, 50%)",
      "donut": 106,
      "donutColor": "hsl(345, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 195,
      "hot dogColor": "hsl(181, 70%, 50%)",
      "burger": 137,
      "burgerColor": "hsl(139, 70%, 50%)",
      "sandwich": 69,
      "sandwichColor": "hsl(282, 70%, 50%)",
      "kebab": 163,
      "kebabColor": "hsl(121, 70%, 50%)",
      "fries": 70,
      "friesColor": "hsl(128, 70%, 50%)",
      "donut": 24,
      "donutColor": "hsl(176, 70%, 50%)"
    }
  ];
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        {'Graph Data'}
      </DialogTitle>
      <DialogContent>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>          
        </Grid>
        <Grid item xs={4}>
        <TextField
          id="filled-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid> 
        <Grid item xs={4}>
          {'Graph Data'}
        </Grid>              
      </Grid>
        <div style={{ height: 250 }}>
        <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
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
