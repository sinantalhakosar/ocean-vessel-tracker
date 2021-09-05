import { Search, ISearchModel } from '../models/search';
import { ISearch, IFilter } from '../types/search';


export const createAISData = async ({TIME, LONGITUDE, LATITUDE, IMO, NAME, TYPE, DEST, ETA}: ISearch): Promise<ISearch> => {
  return Search.create({TIME, LONGITUDE, LATITUDE, IMO, NAME, TYPE, DEST, ETA});
}

export const deleteAllAISData = async () => {
    return Search.deleteMany({});
}

export const findAISDataByFilters = async ({selectedPort, startDate, endDate, distance, showIdleVessels}: IFilter) => {
    const exludeParameter = showIdleVessels ? { DEST:  "" } : {};
    return Search.find(
        {
        "TYPE": {$gt : 79, $lt : 90},
        ETA: {$gt : startDate, $lt : endDate},
        },
        exludeParameter
    );
}