import React, { useEffect, useState } from 'react';
import './dashboard/dragResize.scss';
import GridLayout from 'react-grid-layout';
import { Fab } from '@mui/material';
import Widget from './widget/Widget';
import Featured from './featured/Featured';
import BarChart from './chart/barChart/BarChart';
import LineChart from './chart/lineChart/LineChart';
import AddIcon from '@mui/icons-material/Add';
import { lineChartData } from './chart/lineChart/responsiveLineChartData';
import Table from './table/Table';
import { DisplayLineChart, FetchDeviceGraphData, FetchDeviceSensorGraphData } from '../services/LoginPageService';
import AddWidgetModal from './dashboard/AddWidgetModal';
/* eslint-disable no-unused-vars */
function Dashboard() {
  const [addWidget, setAddWidget] = useState(false);
  const [deviceGraphList, setDeviceGraphList] = useState([]);
  const [deviceSensorGraphList, setDeviceSensorGraphList] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [showSave, setSaveLayout] = useState(false);
  const [layout, setLayout] = useState([
    {
      i: 'a', x: 0, y: 0, w: 4, h: 11, minW: 4, maxW: 9, minH: 11, maxH: 12,
    },
    {
      i: 'b', x: 1, y: 0, w: 6, h: 11, minW: 4, maxW: 9, minH: 11, maxH: 11,
    },
    {
      i: 'c', x: 1, y: 0, w: 6, h: 11, minW: 4, maxW: 9, minH: 11, maxH: 11,
    },
    {
      i: 'd', x: 4, y: 0, w: 11, h: 13, minW: 4, maxW: 11, minH: 13, maxH: 13,
    },
    {
      i: 'e', x: 1, y: 0, w: 6, h: 11, minW: 4, maxW: 9, minH: 11, maxH: 11,
    },
    {
      i: 'f', x: 1, y: 0, w: 6, h: 11, minW: 4, maxW: 9, minH: 11, maxH: 11,
    },
    {
      i: 'g', x: 1, y: 0, w: 6, h: 11, minW: 4, maxW: 9, minH: 11, maxH: 11,
    },
  ]);

  useEffect(() => {
    setSaveLayout(true);
    DisplayLineChart(handleSuccess, handleException);
    FetchDeviceGraphData({deviceId:"3",
    segretionInterval:"60",
    rangeInterval:"48*60"}, handleDeviceGraphSuccess, handleDeviceGraphException);
    FetchDeviceSensorGraphData({sensorTagId:"43",
    segretionInterval:"60",
    rangeInterval:"50*60"}, handleDeviceSensorGraphSuccess, handleDeviceSensorGraphException)
  }, [layout]);

  const handleDeviceGraphSuccess = (dataObject) =>{
    const dataList = dataObject.map((data, index) =>{
      return {...data, id: data.sensorTag, sensorTagId: data.id}
    })
    // console.log(dataList);
    // dataList.splice(0, 1);
    // let maxXValue = 0;
    // dataList.map((data, index) =>{
    //   if(data.data.length >maxXValue){
    //     maxXValue = data.data.length;
    //   }
    // });
    // console.log(dataList);
    // console.log(maxXValue);
    setDeviceGraphList(dataList);
  }

  const handleDeviceSensorGraphSuccess = (dataObject) =>{
    const dataList = dataObject.map((data, index) =>{
      return {...data, id: data.sensorTag, sensorTagId: data.id}
    })
    // console.log(dataObject);
    setDeviceSensorGraphList(dataObject);
    console.log(lineChartData);
    console.log(dataObject);
  }

  const handleDeviceGraphException = (errorObject, errorMessage) => {
  };

  const handleDeviceSensorGraphException = (errorObject, errorMessage) => {
  };
  const handleSuccess = (dataObject) => {
    // const res = Object.values(dataObject.reduce((acc, {
    //   parameterName, last_val, avg_val, min_val, max_val,
    // }) => {
    //   acc[parameterName] = acc[parameterName] || {
    //     parameterName, last_val: [], max_val: [], min_val: [], avg_val: [],
    //   };
    //   acc[parameterName].avg_val.push(avg_val);
    //   acc[parameterName].min_val.push(min_val);
    //   acc[parameterName].max_val.push(max_val);
    //   acc[parameterName].last_val.push(last_val);
    //   return acc;
    // }, {}));
    console.log(dataObject);
    setArrayList(dataObject);
  };
  const handleException = (errorObject, errorMessage) => {
  };
  return (
    <div>
      <div className="widgets" style={{ flexFlow: 'row-reverse', paddingTop: 5, paddingBottom: 0 }}>
        <Fab color="primary" variant="extended" onClick={() => setAddWidget((oldvalue) => !oldvalue)}>
          <AddIcon sx={{ mr: 1 }} />
            Add Widget
        </Fab>
      </div>
      <div className="widgets" style={{ paddingTop: 5 }}>
        <Widget type="user" />
        <Widget type="labs" />
        <Widget type="devices" />
        <Widget type="calibration" />
      </div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a">
          <Featured />
        </div>
        <div key="b">
          <BarChart title="Gas Emissions (AQMS-Floor:02-LAB:12)" aspect={2 / 1} data={arrayList} />
        </div>
        <div key="c">
          <LineChart title="Gas Emissions (AQMS-Floor:02-LAB:12)" aspect={2 / 1} data={lineChartData} />
        </div>
        <div key="e">
          <LineChart title="Gas Emissions (AQMS-Floor:02-LAB:12)" aspect={2 / 1} data={arrayList} />
        </div>
        <div key="f">
          <LineChart title="Gas Emissions (AQMS-Floor:02-LAB:12)" aspect={2 / 1} data={deviceGraphList} />
        </div>
        <div key="g">
          <LineChart title="Gas Emissions (AQMS-Floor:02-LAB:12)" aspect={2 / 1} data={deviceSensorGraphList} />
        </div>
        <div key="d">
          <div className="listContainer">
            <div className="listTitle">Recently Added Users and Respective Status</div>
            <Table />
          </div>
        </div>
      </GridLayout>
      <AddWidgetModal
        open={addWidget}
        setAddWidget={setAddWidget}
      />
    </div>
  );
}

export default Dashboard;
