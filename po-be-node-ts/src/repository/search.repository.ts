import { Search, ISearchModel } from '../models/search.model';
import { ISearch, IFilter } from '../types/search.type';

/**
 * Query for inserting new record to collection
 * @param param0 
 * @returns 
 */
export const createAISData = async ({TIME, LONGITUDE, LATITUDE, IMO, NAME, TYPE, DEST, ETA}: ISearch): Promise<ISearch> => {
  return Search.create({TIME, LONGITUDE, LATITUDE, IMO, NAME, TYPE, DEST, ETA});
}

/**
 * Querty for removing all records inside the collection before uploading new AIS data
 * @returns 
 */
export const deleteAllAISData = async () => {
    return Search.deleteMany({});
}

/**
 * Query for search, and have some rules for requirements.
 * excludeParameter: 
 * Return of query is assigned to variable, because there are 2 search; 1 for exactSearch which is searching for exact port,
 * other one for wrong inputs. In 2nd one, regex search is for having port name inside port input (from requirements)
 * 79 > TYPE > 90 is for Tanker vessels (from requirements)
 * StartDate < ETA < EndDate is for searching vessels that have ETA in between given inputs
 * @param param0 
 * @returns List of vessels
 */
export const findAISDataByFilters = async ({country, location, startDate, endDate, distance, showIdleVessels}: IFilter) => {
    const exludeParameter = showIdleVessels ? { DEST:  "" } : {};

    /**
     * Below commented query is 1st attemp, which ideally should make search with multiple conditions, 
     * but I faced a problem with Date types between NodeJS and MongoDB so I decided to handle it in NodeJS side.
     */
    // return Search.find(
    //     {
    //     "TYPE": {$gt : 79, $lt : 90},
    //     "ETA": {$gt : new Date(startDate), $lt : new Date(endDate)},
    //     "DEST" : { $regex: '.*' + location + '.*' },
    //     },
    //     exludeParameter
    // ).select({ "_id": 0, "TIME": 0, "TYPE": 0});

    let searchResult =  await Search.find({
        "TYPE": {$gt : 79, $lt : 90},
        "DEST" : location,
        },
        exludeParameter
    );

    if(searchResult.length == 0){
        searchResult = await Search.find({
            "TYPE": {$gt : 79, $lt : 90},
            "DEST" : { $regex: '.*' + location + '.*' },
            },
            exludeParameter
        );
    }
    return searchResult.filter((result) => result.ETA > new Date(startDate) && result.ETA < new Date(endDate));
}