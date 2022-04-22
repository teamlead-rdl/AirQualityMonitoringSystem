import React, { useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import styled from 'styled-components';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button } from '@mui/material';
import buildingPointerRight from '../../../images/icons/right.png';
import buildingPointerLeft from '../../../images/icons/left.png';
import building from '../../../images/floorPlan.png';
import floorPointer from '../../../images/icons/placeholder.png';
import floorPlan from '../../../images/floorPlan.png';
import FloorMarker from '../../../images/icons/placeholder.png';
import Fan from '../../../images/fan.gif';
import CCTV from '../../../images/cctv.gif';

function ImageMarkerComponent(props) {
  const { setFloorCoordinations, floorCords, setLabCords } = props;

  const [markers, setMarkers] = useState([]);
  const [img, setImg] = useState([{
    top: 10,
    left: 20,
  }]);
  const [cctv, setCctv] = useState([{
    top: 5,
    left: 5,
  }]);

  const [toggle, setToggle] = useState(false);
  const [markerShape, setMarkerShape] = useState(FloorMarker);
  const [imgShape, setImgShape] = useState(Fan);
  const [cctvShape, setCctvShape] = useState(CCTV);

  // let coordinates = floorCords.replaceAll('}', "").split('{');

  useState(() => {
    const coordinates = floorCords ? JSON.parse(floorCords) : [];
    const arrayLenght = coordinates.length;
    setMarkers(coordinates);
    setLabCords('');
  }, [floorCords]);
  const ImageMarkerWrapper = styled.div`
    border : 2px solid black;
  `;

  const MarkerResetWrapper = styled.div`
    width: 100%;
    margin-top: 5px
  `;
  function CustomMarker(props) {
    return (
      <img src={markerShape} alt="Pointer" width="20" height="20" />
      // <img src={floorPointer} alt="Pointer" width="20" height="20"></img>
    );
  }
  function CustomMarker2(props) {
    return (
      <img src={imgShape} alt="Pointer" width="100" height="100" />
      // <img src={floorPointer} alt="Pointer" width="20" height="20"></img>
    );
  }
  function CustomMarker3(props) {
    return (
      <img src={cctvShape} alt="Pointer" width="100" height="100" />
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
        {/* <ImageMarker
          extraClass="imageMapperMaxSize"
          src={props.src || building}
          markers={markers ,cctv, img, cctv}
          onAddMarker={(marker) => { setFloorCoordinations(marker); setMarkers([...markers, marker]) }}
          markerComponent={CustomMarker, CustomMarker3, CustomMarker2, CustomMarker3}
        /> */}
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
