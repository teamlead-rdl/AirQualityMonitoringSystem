import React, { useEffect, useState } from 'react';
import {
  GoogleMap, Marker, LoadScript, InfoWindow,
} from '@react-google-maps/api';

function MapsComponent(props) {
  const mapContainerStyle = {
    height: props.height || '50vh',
    width: props.width,
  };
  const [position, setPosition] = useState({
    lat: props.longitude || 37.772,
    lng: props.latitude || -122.214,
  });
  const [zoom, setZoom] = useState(15);

  const onMarkerDragEnd = (event) => {
    props.onMarkerDrop(event);
    // setPosition({
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng()
    // });
  };
  const customBuildingIcon = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  };

  useEffect(() => {
    setPosition({
      lat: props.center?.lat,
      lng: props.center?.lng,
    });
    setZoom(props?.zoom);
  }, []);
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBLUOrdeTct_dq-4ANyGGyiGoAHxeRR1yU"
    >

      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={position}
      >
        <Marker
          icon={customBuildingIcon}
          draggable
          onDragEnd={onMarkerDragEnd}
          position={position}
        />
        <InfoWindow
          position={{ lat: (position.lat + props.flagDistance || 0.0018), lng: position.lng }}
          onPositionChanged={() => {}}
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>{props.stateName || 'New Location Here'}</span>
          </div>
        </InfoWindow>
      </GoogleMap>

    </LoadScript>
  );
}

export default React.memo(MapsComponent);
