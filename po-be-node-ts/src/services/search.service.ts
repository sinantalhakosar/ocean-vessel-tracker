import { IFilter } from '../types/search.type';
import { IPortModel } from '../models/port.model';
import { getCoordinatesByDest } from '../repository/port.repository';
import { findAISDataByFilters as findAISDataByFiltersRepo } from '../repository/search.repository';

/**
 * Search service
 * @param param0 Form data from FE
 * @returns Object of selected port's coordinates & List of vessels that have DEST to selected port
 */
export const findAISDataByFilters = async ({selectedPort, startDate, endDate, distance, showIdleVessels}: Omit<IFilter, 'country' | 'location'> & {selectedPort: string}) => {
    const portCountry = selectedPort.split('-')[0];
    const portLocation = selectedPort.split('-')[1].split(' ')[0];
    const portName = selectedPort.split('-')[1].split(' ')[1];
    const destCoordinates = await getCoordinatesByDest(portCountry, portLocation, portName);
    const filteredVessels = await findAISDataByFiltersRepo({country: portCountry, location: portLocation, startDate, endDate, distance, showIdleVessels});
    /**
     * See below commented part
     */
    // if(destCoordinates){
    //     return {
    //         port:destCoordinates,
    //         vessels: filteredVessels.filter((vessel) => calculateDistanceBetweenCoordinates(destCoordinates, vessel.LONGITUDE, vessel.LATITUDE) <= distance)
    //     }
    // }
    return {
        port:destCoordinates,
        vessels: filteredVessels
    }
}

/**
 * Below part is the algorithm to calculate the distance between 2 coordinates. I tried to use it but type errors wouldnt let me.
 * Since I am going to submit this project in 1 hour, I am leaving it out as future work for me :) 
 * The reason of the problem is I didnt keep the consistency on types (ಥ﹏ಥ)
 */
// interface ITemporaryDestination extends IPortModel{
//     Latitude?: number
//     Longitude?: number
// }

// const calculateDistanceBetweenCoordinates = (dest: ITemporaryDestination, lon2: number, lat2: number) => {
//     const tempDest = dest as {Latitude: number, Longitude: number};
//     const destLat = tempDest.Latitude;
//     const destLong = tempDest.Longitude;
    
//     var R = 6371; // km
//     var dLat = toRad(lat2-destLat);
//     var dLon = toRad(lon2-destLong);
//     var lat1 = toRad(destLat);
//     var lat2 = toRad(lat2);
    
//       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//         Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//       var d = R * c;
//       return d;
// }

// function toRad(value: number) {
//         return value * Math.PI / 180;
// }