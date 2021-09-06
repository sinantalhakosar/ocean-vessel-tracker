import { Search, ISearchModel } from '../models/search';
import { ISearch, IFilter } from '../types/search';
import { getCoordinatesByDest } from '../repo/ports';
import { findAISDataByFilters as findAISDataByFiltersRepo } from '../repo/search.repo';

const hasNumber = (anystring: string) => {
    return /\d/.test(anystring);
}

const replaceChars = (anyString: string, search: string, newChar: string) => {
    const replacer = new RegExp(search, 'g')
    return anyString.replace(replacer, newChar);
}

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