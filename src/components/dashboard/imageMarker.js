import React, { useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import styled from 'styled-components';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button } from '@mui/material';
import buildingPointerRight from '../../images/icons/right.png';
import buildingPointerLeft from '../../images/icons/left.png';
import building from '../../images/building-real-estate-service-250x250.jpeg';
import floorPointer from '../../images/icons/placeholder.png';
import floorPlan from '../../images/floorPlan.png';

function ImageMarkerComponent() {
  const ImageMarkerWrapper = styled.div`
    display: inline-block;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    display: block;
    width: 460px;
    height: 460px;
    overflow: scroll;
  `;
  const MarkerResetWrapper = styled.div`
    font-size: 1em;
    margin: 1em;
    display: block;
    height: 40px;
    overflow: scroll;
    padding: 1px;
  `;
  const [markers, setMarkers] = useState([]);
  const [markerShape, setMarkerShape] = useState(buildingPointerLeft);
  function CustomMarker(props) {
    return (
      <img src={markerShape} alt="Pointer" width="50" height="50" />
      // <img src={floorPointer} alt="Pointer" width="20" height="20"></img>
    );
  }
  return (
    // ------------------------------------------------------------------------------------------------------------------------
    // Building Plan
    <div className="container mx-auto outline-black">
      <ImageMarkerWrapper>
        <ImageMarker
          extraClass="imageMapperMaxSize"
          src={building}
          markers={markers}
          onAddMarker={(marker) => setMarkers([...markers, marker])}
          markerComponent={CustomMarker}
        />
      </ImageMarkerWrapper>
      <MarkerResetWrapper>
        <Button
          variant="contained"
          endIcon={<HistoryOutlinedIcon />}
          onClick={() => {
            setMarkers([]);
          }}
        >
          Reset the Pointer
        </Button>
        <Button
          variant="contained"
          endIcon={<HistoryOutlinedIcon />}
          onClick={() => {
            setMarkerShape(buildingPointerRight);
          }}
        >
          Toggle Pointer Shape
        </Button>
      </MarkerResetWrapper>
    </div>
    // ------------------------------------------------------------------------------------------------------------------------
    // Floor Plan
    // <div class="container mx-auto outline-black">
    //   <ImageMarkerWrapper>
    //     <ImageMarker
    //       extraClass="imageMapperMaxSize"
    //       src={floorPlan}
    //       markers={markers}
    //       onAddMarker={(marker) => setMarkers([...markers, marker])}
    //       markerComponent={CustomMarker}
    //     />
    //   </ImageMarkerWrapper>
    //   <MarkerResetWrapper>
    //     <Button variant="contained" endIcon={<HistoryOutlinedIcon />}
    //       onClick={() => {
    //         setMarkers([])
    //       }}>
    //       Reset the Pointer
    //     </Button>
    //   </MarkerResetWrapper>
    // </div>
  );
}

export default ImageMarkerComponent;
