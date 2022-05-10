import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";

function MapsMultiplePoints(props) {
    // props -> markers Array, zoom integer, isDragable
    const [activeMarker, setActiveMarker] = useState(null);
    const mapContainerStyle = {
        height: props.height || "50vh",
        width: props.width
    }

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const onMarkerDragEnd = (event) => {
        props.onMarkerDrop(event);
        // setPosition({
        //     // lat: event.latLng.lat(),
        //     lat: 37.773,
        //     // lng: event.latLng.lng()
        //     lng: -122.214
        // });
    };
    const customBuildingIcon = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    };

    // useEffect(()=>{
    //     if (props.mapDataObject.length > 0) {
    //         // setMarker(props.mapDataObject);
    //         // setPosition({
    //         //     // lat: parseFloat(props.mapDataObject[0].position.lng) || 37.772,
    //         //     lat: 37.773,
    //         //     // lng: parseFloat(props.mapDataObject[0].position.lat) || -122.214
    //         //     lng: -122.214
    //         // })
    //     }
    // },[]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBLUOrdeTct_dq-4ANyGGyiGoAHxeRR1yU"
        >
            <GoogleMap
                id="location-marker"
                mapContainerStyle={mapContainerStyle}
                zoom={props.zoom}
                center={props.center}
            >
                {props.markers.map(({ id, name, position }, index) => (
                    <Marker
                        icon={customBuildingIcon}
                        draggable={props.isDragable ? props.isDragable : true}
                        onDragEnd={onMarkerDragEnd}
                        key={index}
                        position={position}
                        onClick={() => handleActiveMarker(index)}
                    >
                        {activeMarker === index ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>{name}</div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))}
            </GoogleMap>

        </LoadScript>
    )
}

export default React.memo(MapsMultiplePoints)