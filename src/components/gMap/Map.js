import React, { useEffect, useState, useCallback } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  Polyline
} from 'react-google-maps';

const Map = ({paths, stops})=> {
    // console.log({paths, stops})
   
    const [progress, setProgress] = useState(null);

    const velocity = 27; // 100km per hour
    let initialDate;
    let interval = null;
    const icon1 = {
        url: 
          "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(15, 15),
        scale: 0.7,
      };
    
    const center = parseInt(paths.length / 2 );
    const centerPathLat = paths[center + 5].lat;
    const centerpathLng = paths[center + 5].lng;

    useEffect(() => {
        calculatePath();

        return () => {
            console.log("CLEAR........");
            interval && window.clearInterval(interval);
        }
    }, [paths])
    const getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - initialDate) / 1000; // pass to seconds
        return differentInTime * velocity; // d = v*t -- thanks Newton!
    };

    const moveObject = () => {
        const distance = getDistance();
        if (!distance) {
          return;
        }
    
        let progress = paths.filter(
          (coordinates) => coordinates.distance < distance
        );
    
        const nextLine = paths.find(
          (coordinates) => coordinates.distance > distance
        );
    
        console.log(paths, progress, nextLine, distance);
        if (!nextLine) {
          setProgress(progress)
          window.clearInterval(interval);
          return; // it's the end!
        }
        const lastLine = progress[progress.length - 1];
    
        const lastLineLatLng = new window.google.maps.LatLng(
          lastLine.lat,
          lastLine.lng
        );
    
        const nextLineLatLng = new window.google.maps.LatLng(
          nextLine.lat,
          nextLine.lng
        );
    
        // distance of this line
        const totalDistance = nextLine.distance - lastLine.distance;
        const percentage = (distance - lastLine.distance) / totalDistance;
    
        const position = window.google.maps.geometry.spherical.interpolate(
          lastLineLatLng,
          nextLineLatLng,
          percentage
        );

        mapUpdate();
        setProgress(progress.concat(position))
    };
    const calculatePath = () => {
        paths = paths.map((coordinates, i, array) => {
          if (i === 0) {
            return { ...coordinates, distance: 0 }; // it begins here!
          }
          const { lat: lat1, lng: lng1 } = coordinates;
          const latLong1 = new window.google.maps.LatLng(lat1, lng1);
    
          const { lat: lat2, lng: lng2 } = array[0];
          const latLong2 = new window.google.maps.LatLng(lat2, lng2);
    
          // in meters:
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            latLong1,
            latLong2
          );
    
          return { ...coordinates, distance };
        });
    };
    const startSimulation = useCallback(
        () => {
            if(interval) {
                window.clearInterval(interval);
            }
            setProgress(null);
            initialDate = new Date();
            interval = window.setInterval(moveObject, 1000);
        },
        [interval, initialDate],
    );

    const stopSimulation = useCallback(
        () => {
            console.log("STOP Simulation....");
        },
        [],
    )
    const mapUpdate = () => {
        const distance = getDistance();
        if (!distance) {
            return;
        }

        let progress = paths.filter(
            (coordinates) => coordinates.distance < distance
        );

        const nextLine = paths.find(
            (coordinates) => coordinates.distance > distance
        );

        let point1, point2;

        if (nextLine) {
            point1 = progress[progress.length - 1];
            point2 = nextLine;
        } else {
            // it's the end, so use the latest 2
            point1 = progress[progress.length - 2];
            point2 = progress[progress.length - 1];
        }

        const point1LatLng = new window.google.maps.LatLng(point1.lat, point1.lng);
        const point2LatLng = new window.google.maps.LatLng(point2.lat, point2.lng);

        const angle = window.google.maps.geometry.spherical.computeHeading(
            point1LatLng,
            point2LatLng
        );
        const actualAngle = angle - 90;

        // const markerUrl =
        // "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";
        const marker = document.querySelector(`[src="${icon1.url}"]`);

        if (marker) {
            // when it hasn't loaded, it's null
            marker.style.transform = `rotate(${actualAngle}deg)`;
        }
    }
    
    return(
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: centerPathLat, lng: centerpathLng }}
        >
            <button onClick={startSimulation}>Start Simulation</button>
            <button onClick={stopSimulation}>Stop Simulation</button>
            
            
            <Polyline
                path={paths}
                options={{
                strokeColor: "#0088FF",
                strokeWeight: 6,
                strokeOpacity: 0.6,
                defaultVisible: true,
                }}
            />

            {stops.data.map((stop, index) => (

                <Marker
                    key={index}
                    position={{
                        lat: stop.lat,
                        lng: stop.lng
                    }}
                    title={stop.id}
                    label={`${index + 1}`}
                />
            ))}

            {progress && (
                <>
                <Polyline
                    path={progress}
                    options={{ strokeColor: "orange" }}
                />

                <Marker
                    icon={icon1}
                    position={progress[progress.length - 1]}
                />
                </>
            )}
      </GoogleMap>
    )
};

export default withScriptjs(
  withGoogleMap(
    Map
  )
)