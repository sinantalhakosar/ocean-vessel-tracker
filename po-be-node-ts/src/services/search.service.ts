import { Search, ISearchModel } from '../models/search';
import { ISearch, IFilter } from '../types/search';

const hasNumber = (anystring: string) => {
    return /\d/.test(anystring);
}

const replaceChars = (anyString: string, search: string, newChar: string) => {
    const replacer = new RegExp(search, 'g')
    return anyString.replace(replacer, newChar);
}

export const findAISDataByFilters = async ({selectedPort, startDate, endDate, distance, showIdleVessels}: IFilter) => {
    selectedPort = replaceChars(selectedPort, '-', '');
}