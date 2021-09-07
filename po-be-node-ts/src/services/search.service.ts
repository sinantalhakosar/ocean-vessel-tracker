import { IFilter } from '../types/search.type';
import { getCoordinatesByDest } from '../repository/port.repository';
import { findAISDataByFilters as findAISDataByFiltersRepo } from '../repository/search.repository';


export const findAISDataByFilters = async ({selectedPort, startDate, endDate, distance, showIdleVessels}: Omit<IFilter, 'country' | 'location'> & {selectedPort: string}) => {
    const country = selectedPort.split('-')[0];
    const location = selectedPort.split('-')[1].split(' ')[0];
    const destCoordinates = await getCoordinatesByDest(country, location);
    const filteredVessels = await findAISDataByFiltersRepo({country, location, startDate, endDate, distance, showIdleVessels});
    return {
        port:destCoordinates,
        vessels: filteredVessels
    }
}