import React, { useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import styled from 'styled-components';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button } from '@mui/material';
import buildingPointerRight from '../../images/icons/right.png';
import buildingPointerLeft from '../../images/icons/left.png';
import building from '../../images/floorPlan.png';
import floorPointer from '../../images/icons/placeholder.png';
import floorPlan from '../../images/floorPlan.png';
import FloorMarker from '../../images/icons/placeholder.png';

function ImageMarkerComponent(props) {
  const { setFloorCoordinations, setLabCords, floorCords } = props;

  const ImageMarkerWrapper = styled.div`
    border : 2px solid black;
  `;

  const MarkerResetWrapper = styled.div`
    width: 100%;
    margin-top: 5px
  `;

  const [markers, setMarkers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [markerShape, setMarkerShape] = useState(FloorMarker);
  function CustomMarker(props) {
    return (
      <img src={markerShape} alt="Pointer" width="20" height="20" />
      // <img src={floorPointer} alt="Pointer" width="20" height="20"></img>
    );
  }
  return (
    <div className="container mx-auto outline-black">
      <ImageMarkerWrapper>
        <ImageMarker
          extraClass="imageMapperMaxSize"
          src={props.src || building}
          markers={markers}
          onAddMarker={(marker) => { setFloorCoordinations(marker); setMarkers([...markers, marker]); }}
          markerComponent={CustomMarker}
        />
      </ImageMarkerWrapper>
      <MarkerResetWrapper>
        <Button
          variant="contained"
          className="float-right w-full w-1/2"
          endIcon={<HistoryOutlinedIcon />}
          onClick={() => {
            setMarkers([]);
            setFloorCoordinations([]);
            setLabCords([]);
          }}
        >
          Reset the Pointer
        </Button>
      </MarkerResetWrapper>
    </div>

  );
}

export default ImageMarkerComponent;
