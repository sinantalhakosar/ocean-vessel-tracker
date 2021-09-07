import { useEffect, useState, ReactElement } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Marker, Popup } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import DockIcon from '@material-ui/icons/Dock';

export interface MapContainerProps {
    vesselsData:{
        port: {
            Latitude: number;
            Longitude: number;
        }
        vessels: VesselValue[];
    }
}

interface VesselValue {
    _id: string;
    ETA: string | null;
    IMO: number;
    LATITUDE: number;
    LONGITUDE: number;
    DEST: string;
    NAME: string;
    SOG: number;
    TIME: string;
    TYPE: number;
    showRoute: boolean;
    showPopup: boolean;
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
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY ?? '',
    renderWorldCopies: false,
  });

  const linePaint: MapboxGL.LinePaint = {
    'line-color': 'red',
    'line-width': 5
  };

export const MapContainer = ({ vesselsData }: MapContainerProps): ReactElement => {  
    const classes = useStyles();
    const [showRoutes, setShowRoutes] = useState<boolean[]>(new Array(vesselsData.vessels.length).fill(false));
    const [showPopups, setShowPopups] = useState<boolean[]>(new Array(vesselsData.vessels.length).fill(false));
    const [vesselColors, setvesselColors] = useState<string[]>([]);
    
      const onVesselClick = (index: number, dest?: string) => {
          let newShowRoutes = new Array(vesselsData.vessels.length).fill(false);
          let newShowPopups = new Array(vesselsData.vessels.length).fill(false);
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
            colorArray.push(`hsl(${i},${90 + Math.random() * 10}%,${50 + Math.random() * 10}%)`);
        }
        return colorArray;
    }

    useEffect(() => {
        setvesselColors(generateDistinctColors(vesselsData.vessels.length));
    },[vesselsData.vessels.length]);

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
                    vesselsData.vessels.map((vesselData, index) => (
                        <>
                        
                        <Marker
                            key={index}
                            coordinates={[vesselData.LONGITUDE,vesselData.LATITUDE]}
                            anchor="bottom"
                            onClick={() => onVesselClick(index, vesselData.DEST)}
                        >
                            <DirectionsBoatIcon style={{color: vesselData.DEST === undefined ? 'grey' : vesselData.DEST === "" ? 'grey' : `${vesselColors[index]}`}}/>
                        </Marker>
                        
                        {showPopups[index] &&
                            <Popup
                                coordinates={[vesselData.LONGITUDE,vesselData.LATITUDE]}
                                anchor="top"
                                className={classes.popup}
                                >
                                <h5 className={classes.zeroMargin}>NAME:{vesselData.NAME}</h5>
                                <h5 className={classes.zeroMargin}>IMO:{vesselData.IMO}</h5>
                                <h5 className={classes.zeroMargin}>DEST:{vesselData.DEST === undefined ? 'IDLE' : vesselData.DEST === "" ? 'IDLE' :  `${vesselData.DEST}`}</h5>
                                <h5 className={classes.zeroMargin}>ETA:{vesselData.ETA}</h5> 
                            </Popup>
                        }
                        {showRoutes[index] && vesselData.DEST && 
                        <>
                            <GeoJSONLayer
                            data={constructGeoJsonFileForRoute([vesselData.LONGITUDE,vesselData.LATITUDE], [vesselsData.port.Longitude, vesselsData.port.Latitude])}
                            linePaint={linePaint}
                            />
                            <Marker
                            coordinates={[vesselsData.port.Longitude, vesselsData.port.Latitude]}
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