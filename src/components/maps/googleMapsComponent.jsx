import React, { useState } from 'react'
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import { Grid } from '@mui/material';


function MapsComponent(props) {
    
    const mapContainerStyle = {
        height: props.height || "50vh",   // "350px"
        width: props.width // "420px"
    }
    const [position, setPosition] = useState({
        lat: props.longitude || 37.772,                          // 37.772
        lng: props.latitude || -122.214                         // -122.214
    });
    const onMarkerDragEnd = (event) => {
        props.onMarkerDrop(event);
        // setPosition({
        //     lat: event.latLng.lat(),
        //     lng: event.latLng.lng()
        // });
        // console.log("new position " + JSON.stringify(position))
    };
    const customBuildingIcon = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBLUOrdeTct_dq-4ANyGGyiGoAHxeRR1yU"
        >   
        
            <GoogleMap
                id="marker-example"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={position}
            >
                <Marker
                    icon={customBuildingIcon}
                    draggable={true}
                    onDragEnd={onMarkerDragEnd}
                    position={position}
                />
                <InfoWindow
                    position={{ lat: (position.lat + 0.0018), lng: position.lng }}
                    onPositionChanged={() => { console.log("Position has changed!") }}
                >
                    <div>
                        <span style={{ padding: 0, margin: 0 }}>{props.stateName || 'New Location Here'}</span>
                    </div>
                </InfoWindow>
            </GoogleMap>
            
        </LoadScript>
    )
}

export default React.memo(MapsComponent)