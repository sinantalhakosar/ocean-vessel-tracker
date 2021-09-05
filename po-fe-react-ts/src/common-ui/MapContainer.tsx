import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Marker } from 'react-mapbox-gl';
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
}

interface Destination {
    country: string;
    location: string;
    name: string;
    coordinates: [number, number]
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: '50px',
        maxHeight: '50px',
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
    const [showRoutes, setShowRoutes] = useState<boolean[]>(new Array(data.length).fill(false));
    const [vesselColors, setvesselColors] = useState<string[]>([]);
    const originX = [-0.2416815, 51.5285582] as [number, number];
    const destX = [-77.01239,38.91275] as [number, number];

      const onVesselClick = (index: number, dest?: Destination) => {
          let newShowRoutes = new Array(data.length).fill(false);
            if(dest){
                newShowRoutes[index] = !showRoutes[index];
                setShowRoutes(newShowRoutes)
            }
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
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Map
                style="mapbox://styles/mapbox/streets-v8"
                containerStyle={{
                height: '80vh',
                width: '100vw',
                margin: 0
                }}
                zoom={[1]}
                //onClick={onClickMap}
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
                            <DirectionsBoatIcon style={{color: `${vesselColors[index]}`}}/>
                        </Marker>
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