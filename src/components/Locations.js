import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Locations = () => {
    const { name } = useParams();
    // console.log(name)
    
    const res = name.split(",");
    const lt = Number(res[0].trim());
    const lg = Number(res[1].trim());

   
    const center = { lat: lt , lng: lg} 

    console.log(center)
   
    const zoom = 11;

    const handleApiLoaded = (map, maps) => {
        console.log(center)
        console.log("hrseresrersee")
        const marker = new maps.Marker({
            position: center,
            map,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
        });

    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAolMqc9bflA2GpOQ8GtT0cNrwZG3EjhO4' }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            />
        </div>
    );
};

export default Locations;