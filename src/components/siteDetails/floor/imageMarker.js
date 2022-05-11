import React, { useEffect, useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import styled from 'styled-components';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button } from '@mui/material';
import buildingPointerRight from '../../../images/icons/right.png';
import buildingPointerLeft from '../../../images/icons/left.png';
import building from '../../../images/building-real-estate-service-250x250.jpeg';
import floorPointer from '../../../images/icons/placeholder.png';
import floorPlan from '../../../images/floorPlan.png';

function ImageMarkerComponent(props) {
  const [rotateImg, setRotateImg] = useState(2);
  const {
    setFloorCoordinations, floorCords, height, src,
  } = props;
  const coordinates = floorCords.replaceAll('"', '').split(',');
  const top = parseFloat(coordinates[0]);
  const left = parseFloat(coordinates[1]);
  const pointerDirection = coordinates[2];

  const ImageMarkerWrapper = styled.div`
  height: 100%;
  `;

  const MarkerResetWrapper = styled.div`
    width: 100%;
  `;
  const [markers, setMarkers] = useState([{
    top: top || 10,
    left: left || 20,
  }]);

  const [direction, setDirection] = useState(pointerDirection || false);
  const [markerShape, setMarkerShape] = useState();

  useEffect(() => {
    if (direction == 'false') {
      setMarkerShape(() => buildingPointerRight);
    } else {
      setMarkerShape(() => buildingPointerLeft);
    }
  }, []);

  function CustomMarker(props) {
    setFloorCoordinations(props, direction);

    return (
      <img src={markerShape} alt="Pointer" width="50" height="50" />
    );
  }

  const toggleDirection = () => {
    setDirection((prevdirection) => prevdirection == 'false');
    if (direction) {
      setMarkerShape(buildingPointerLeft);
    } else {
      setMarkerShape(buildingPointerRight);
    }
  };
  return (
    // ------------------------------------------------------------------------------------------------------------------------
    // Building Plan
    <div className="container mx-auto outline-black">
      <ImageMarkerWrapper>
        <ImageMarker
          extraClass="imageMapperMaxSize"
          src={src || building}
          // src='https://1.bp.blogspot.com/-6uL4YhQICoU/XRNup_w25-I/AAAAAAAAAKE/pMGI0DVUecsO9f6boeMsfVs0U17dLCAWACLcBGAs/s1600/5%2Bstorey%2Bbuilding%2Bdesign.jpg'
          markers={markers}
          onAddMarker={(marker) => {
            setMarkers([marker]);
            setMarkers([{
              top: marker.top + -0.5,
              left: marker.left + rotateImg
            }])
          }}
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
            setMarkerShape();
          }}
        >
          Reset the Pointer
        </Button>
        <Button
          variant="contained"
          className="float-left w-full w-1/2"
          endIcon={<HistoryOutlinedIcon />}
          onClick={() => {
            setMarkerShape((prevMarker) => (prevMarker == buildingPointerLeft ? buildingPointerRight : buildingPointerLeft));
            setDirection((prevdirection) => (prevdirection == 'false' ? 'true' : 'false'));
            setRotateImg((oldValue)=>{
              if(oldValue === 2)
                return -6;
              else
                return 2;
            })
          }}
        >
          Toggle Pointer Shape
        </Button>
      </MarkerResetWrapper>
    </div>

  );
}

export default ImageMarkerComponent;
