import { IFilter } from '../types/search.type';
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
    return {
        port:destCoordinates,
        vessels: filteredVessels
    }
}