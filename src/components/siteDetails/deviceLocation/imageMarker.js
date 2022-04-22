import React, { useEffect, useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import styled from 'styled-components';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Button } from '@mui/material';
import buildingPointerRight from '../../../images/icons/right.png';
import buildingPointerLeft from '../../../images/icons/left.png';
import building from '../../../images/departmentBlueprint.png';
import floorPointer from '../../../images/icons/placeholder.png';
import floorPlan from '../../../images/floorPlan.png';

function ImageMarkerComponent(props) {
  const { setFloorCoordinations, floorCords, deviceIcon } = props;
  const coordinates = floorCords.replaceAll('"', '').split(',');
  const top = parseFloat(coordinates[0]);
  const left = parseFloat(coordinates[1]);

  const ImageMarkerWrapper = styled.div`
    width: 100%;
    height :100%
  `;
  // style={{width:100+'%', height:100+'%'}}
  const MarkerResetWrapper = styled.div`
    width: 100%;
    height :100%
  `;
  const [markers, setMarkers] = useState([]);

  const [markerShape, setMarkerShape] = useState(floorPointer);
  useEffect(() => {
    setMarkers([{
      top: top || 10,
      left: left || 20,
    }]);
  }, [floorCords]);

  function CustomMarker(props) {
    setFloorCoordinations(props);

    return (
      <img
        src={deviceIcon ? require(`../../../images/deviceIcons/${deviceIcon}.gif`) : require('../../../images/deviceIcons/computer.png')}
        srcSet={deviceIcon ? require(`../../../images/deviceIcons/${deviceIcon}.gif`) : require('../../../images/deviceIcons/computer.png')}
        alt="Pointer"
        width="40"
        height="40"
      />
    );
  }

  return (
    <div className="container mx-auto outline-black">
      <ImageMarkerWrapper style={{ height: `${60}vh` }}>
        <ImageMarker
          extraClass="imageMapperMaxSize"
          src={props.src || building}
          markers={markers}
          onAddMarker={(marker) => setMarkers([marker])}
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
          }}
        >
          Reset the Pointer
        </Button>
      </MarkerResetWrapper>
    </div>

  );
}

export default ImageMarkerComponent;
// import React, { useEffect, useState } from 'react';
// import ImageMarker, { Marker } from 'react-image-marker';
// import buildingPointerRight from '../../../images/icons/right.png';
// import buildingPointerLeft from '../../../images/icons/left.png';
// import building from '../../../images/building-real-estate-service-250x250.jpeg';
// import floorPointer from '../../../images/icons/placeholder.png';
// import floorPlan from '../../../images/floorPlan.png';
// import styled from 'styled-components';
// import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
// import { Button } from '@mui/material';

// const ImageMarkerComponent = (props) => {
//   let { setFloorCoordinations, floorCords } = props;
//   let coordinates = floorCords.replaceAll('"', "").split(',');
//   let top = parseFloat(coordinates[0]);
//   let left = parseFloat(coordinates[1]);

//   const ImageMarkerWrapper = styled.div`

//   `;

//   const MarkerResetWrapper = styled.div`
//     width: 100%;
//   `;
//   const [markers, setMarkers] = useState([{
//       top: top || 10,
//       left: left || 20,
//   }]);

//   const [markerShape, setMarkerShape] = useState(floorPointer);

//   const CustomMarker = (props) => {
//     setFloorCoordinations(props);
//         return (
//       <img src={markerShape} alt="Pointer" width="20" height="20"></img>
//     );
//   };

//   return (
//     // ------------------------------------------------------------------------------------------------------------------------
//     // Building Plan
//     <div className="container mx-auto outline-black">
//       <ImageMarkerWrapper>
//         <ImageMarker
//           extraClass="imageMapperMaxSize"
//           src={props.src || building}
//           // src='https://1.bp.blogspot.com/-6uL4YhQICoU/XRNup_w25-I/AAAAAAAAAKE/pMGI0DVUecsO9f6boeMsfVs0U17dLCAWACLcBGAs/s1600/5%2Bstorey%2Bbuilding%2Bdesign.jpg'
//           markers={markers}
//           onAddMarker={(marker) => setMarkers([marker])}
//           markerComponent={CustomMarker}
//         />
//       </ImageMarkerWrapper>

//       <MarkerResetWrapper>
//         <Button variant="contained" className="float-right w-full w-1/2" endIcon={<HistoryOutlinedIcon />}
//           onClick={() => {
//             setMarkers([]);
//           }}>
//           Reset the Pointer
//         </Button>
//       </MarkerResetWrapper>
//     </div>

//   )
// }

// export default ImageMarkerComponent
