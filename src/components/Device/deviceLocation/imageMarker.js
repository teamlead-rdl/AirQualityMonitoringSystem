import React, { useEffect, useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import buildingPointerRight from '../../../images/icons/right.png';
import buildingPointerLeft from '../../../images/icons/left.png';
import building from '../../../images/departmentBlueprint.png';
import floorPointer from '../../../images/icons/placeholder.png';
import floorPlan from '../../../images/floorPlan.png';
import styled from 'styled-components';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button } from '@mui/material';

const ImageMarkerComponent = (props) => {
  let { setFloorCoordinations, floorCords, deviceIcon, height, width, src } = props;
  let coordinates = floorCords.replaceAll('"', '').split(',');
  let top = parseFloat(coordinates[0]);
  let left = parseFloat(coordinates[1]);

  const ImageMarkerWrapper = styled.div`
  border : 2px solid black;
  `;
  const MarkerResetWrapper = styled.div`
    // width: 100%;
    // height :100%
  `;
  const [markers, setMarkers] = useState([]);

  const [markerShape, setMarkerShape] = useState(floorPointer);
  useEffect(()=>{
    setMarkers([{
      top: top || 10,
      left: left || 20,
    }]);
  },[floorCords]);
  
  const CustomMarker = (props) => {
    setFloorCoordinations(props);
    
    return (
      <img 
        src={deviceIcon? require(`../../../images/deviceIcons/${deviceIcon}.gif`) : require('../../../images/deviceIcons/dataloger1.gif') }
        srcSet={deviceIcon? require(`../../../images/deviceIcons/${deviceIcon}.gif`) : require('../../../images/deviceIcons/dataloger1.gif') }
        alt="Pointer" width="80" height="80"></img>
    );
  };

  return (
    <div className="container mx-auto outline-black"
      style={{width:props.width, height:props.height}}
    >
      <ImageMarkerWrapper 
        style={{height:'100%'}}
      >
        <ImageMarker
          extraClass="imageMapperMaxSize"
          src={src || building}
          markers={markers}
          onAddMarker={(marker) => setMarkers([marker])}
          markerComponent={CustomMarker}
        />
      </ImageMarkerWrapper>
      <MarkerResetWrapper>
        <Button variant="contained" className="float-right w-full w-1/2" endIcon={<HistoryOutlinedIcon />}
          onClick={() => {
            setMarkers([]);
          }}>
          Reset the Pointer
        </Button>
      </MarkerResetWrapper>
    </div>
   
  );
};

export default ImageMarkerComponent;