import { Search, ISearchModel } from '../models/search.model';
import { ISearch, IFilter } from '../types/search.type';


export const createAISData = async ({TIME, LONGITUDE, LATITUDE, IMO, NAME, TYPE, DEST, ETA}: ISearch): Promise<ISearch> => {
  return Search.create({TIME, LONGITUDE, LATITUDE, IMO, NAME, TYPE, DEST, ETA});
}

export const deleteAllAISData = async () => {
    return Search.deleteMany({});
}

export const findAISDataByFilters = async ({country, location, startDate, endDate, distance, showIdleVessels}: IFilter) => {
    const exludeParameter = showIdleVessels ? { DEST:  "" } : {};

    // return Search.find(
    //     {
    //     // "TYPE": {$gt : 79, $lt : 90},
    //     // ETA: {$gt : startDate, $lt : endDate},
    //     "DEST" : { $regex: '.*' + location + '.*' },
    //     },
    //     exludeParameter
    // ).select({ "_id": 0, "TIME": 0, "TYPE": 0});
    // console.log(typeof new Date(startDate))
    const start = new Date(startDate)
    let exactSearch =  await Search.find({
        "TYPE": {$gt : 79, $lt : 90},
        "DEST" : location,
        }
    );

    if(exactSearch.length == 0){
        exactSearch = await Search.find({
            "TYPE": {$gt : 79, $lt : 90},
            "DEST" : { $regex: '.*' + location + '.*' },
        })
    }
    return exactSearch.filter((result) => result.ETA > new Date(startDate) && result.ETA < new Date(endDate));
}