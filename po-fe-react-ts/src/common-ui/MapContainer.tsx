import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Marker, Popup } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import DockIcon from '@material-ui/icons/Dock';

export interface MapContainerProps {
    data: VesselValue[]
}

interface VesselValue {
    name: string;
    IMO: number;
    type: number;
    longitude: number;
    latitude: number;
    dest: Destination | undefined;
    eta: string | null;
    showRoute: boolean;
    showPopup: boolean;
}

interface Destination {
    country: string;
    location: string;
    name: string;
    coordinates: [number, number]
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    zeroMargin: {
        margin: 0
    },
    popup: {
        zIndex: 999
    },
  }));

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoic3RhbGhha29zYXIiLCJhIjoiY2t0NjhpMW1vMGcxajJwcXM4ZWFmYWU4dCJ9.hwtRQtUit-oFBkcdcuk5bQ',
    renderWorldCopies: false,
    scrollZoom: false,
  });

  const linePaint: MapboxGL.LinePaint = {
    'line-color': 'red',
    'line-width': 5
  };

export const MapContainer = ({ data }: MapContainerProps): ReactElement => {  
    const classes = useStyles();
    const [showRoutes, setShowRoutes] = useState<boolean[]>(new Array(data.length).fill(false));
    const [showPopups, setShowPopups] = useState<boolean[]>(new Array(data.length).fill(false));
    const [vesselColors, setvesselColors] = useState<string[]>([]);

      const onVesselClick = (index: number, dest?: Destination) => {
          let newShowRoutes = new Array(data.length).fill(false);
          let newShowPopups = new Array(data.length).fill(false);
            if(dest){
                newShowRoutes[index] = !showRoutes[index];
                setShowRoutes(newShowRoutes);
            }
            newShowPopups[index] = !showPopups[index];
            setShowPopups(newShowPopups)
      }

    const generateDistinctColors = (numOfColors: number) => {
        let colorArray = []
        for(let i = 0; i < 360; i += 360 / numOfColors) {
            colorArray.push(`hsl(${0},${100}%,${0}%)`);
        }
        return colorArray;
    }

    useEffect(() => {
        setvesselColors(generateDistinctColors(data.length));
    },[data.length]);

      const constructGeoJsonFileForRoute = (vesselCoord: [number, number], destCoord: [number, number]) => {
        return {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                    'color': '#F7455D' // red
                    },
                'geometry': {
                  'type': 'LineString',
                  'coordinates': [
                    vesselCoord,
                    destCoord
                  ],
                },
              },
            ]
          };
      }
      
      return (
          <div className={classes.container}>
            <Map
                // eslint-disable-next-line react/style-prop-object
                style="mapbox://styles/mapbox/streets-v8"
                containerStyle={{
                    height: '80vh',
                    width: '100vw',
                    margin: 0
                }}
                zoom={[1]}
            >
                <>
                { 
                    data.map((vesselData, index) => (
                        <>
                        <Marker
                            key={index}
                            coordinates={[vesselData.longitude,vesselData.latitude]}
                            anchor="bottom"
                            onClick={() => onVesselClick(index, vesselData.dest)}
                        >
                            <DirectionsBoatIcon style={{color: vesselData.dest === undefined ? 'grey' : vesselData.dest.location === "" ? 'grey' : `${vesselColors[index]}`}}/>
                        </Marker>
                        {showPopups[index] &&
                            <Popup
                                coordinates={[vesselData.longitude,vesselData.latitude]}
                                anchor="top"
                                className={classes.popup}
                                >
                                <h5 className={classes.zeroMargin}>NAME:{vesselData.name}</h5>
                                <h5 className={classes.zeroMargin}>IMO:{vesselData.IMO}</h5>
                                <h5 className={classes.zeroMargin}>TYPE:{vesselData.type}</h5>
                                <h5 className={classes.zeroMargin}>DEST:{ vesselData.dest === undefined ? 'IDLE' : vesselData.dest.location === "" ? 'IDLE' : `${vesselData.dest.country}-${vesselData.dest.location}`}</h5>
                                <h5 className={classes.zeroMargin}>ETA:{vesselData.eta}</h5> 
                            </Popup>
                        }
                        {showRoutes[index] && vesselData.dest && 
                        <>
                            <GeoJSONLayer
                            data={constructGeoJsonFileForRoute([vesselData.longitude,vesselData.latitude], vesselData.dest.coordinates)}
                            linePaint={linePaint}
                            />
                            <Marker
                            coordinates={vesselData.dest?.coordinates}
                            anchor="bottom"
                            >
                                <DockIcon/>
                            </Marker>
                        </>
                        }
                        </>
                    ))
                }

                </>
        </Map>
      </div>
      );
}