import React , {useState, useEffect } from 'react'
import Widget from './../../../../components/widget/Widget';
import LayoutMachine from "../landingPageComponents/LayoutMachine";
import SensorGraphComponent from '../landingPageComponents/SensorGraphComponent';
const LandingPageComponent = () => {
  const [open, setOpen] = useState(false); //Abhishek 6-6-2022 begin
  
  return (
    <div>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="labs" />
        <Widget type="devices" />
        <Widget type="calibration" />
      </div>
      <LayoutMachine setOpen={setOpen}/>
      <SensorGraphComponent open={open} setOpen={setOpen} />      
    </div>
  )
}

export default LandingPageComponent