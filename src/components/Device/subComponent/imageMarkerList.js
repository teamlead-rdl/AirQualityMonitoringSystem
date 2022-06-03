import React, { useEffect, useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import styled from 'styled-components';
import building from '../../../images/floorPlan.png';
import FloorMarker from '../../../images/icons/placeholder.png';

function ImageMarkerList({ labImage, deviceCoordsList }) {

  const [markers, setMarkers] = useState(deviceCoordsList);
  const [markerShape, setMarkerShape] = useState(FloorMarker);

  useEffect(() => {
    // const coordinates = floorCords ? JSON.parse(floorCords) : [];
    // const arrayLenght = coordinates.length;
    // setMarkers(coordinates);
    // setLabCords('');
  }, []);

  const ImageMarkerWrapper = styled.div`
    border : 2px solid black;
  `;

  function CustomMarker(props) {
    return (
      <img 
        // src={markerShape} 
        alt="Pointer" 
        width="20" 
        height="20" 
        src={require('../../../images/deviceIcons/dataloger.png')}
        srcSet={require('../../../images/deviceIcons/dataloger.png')} />
    );
  }
  return (
    <div>
      {/* <ImageMarkerWrapper> */}
        <ImageMarker
          extraClass="imageMapperMaxSize"
          src={labImage || building}
          markers={deviceCoordsList}
          onAddMarker={(marker) => { setFloorCoordinations(marker); setMarkers([...markers, marker]); }}
          markerComponent={CustomMarker}
          extraClass="h-96"
        />
      {/* </ImageMarkerWrapper> */}
    </div>

  );
}

export default ImageMarkerList;
