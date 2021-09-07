import { NextFunction, Request, Response } from "express";
import { createAISData, deleteAllAISData } from '../repository/search.repository';
import { findAISDataByFilters } from '../services/search.service';
import { ISearch } from "../types/search.type";

/**
 * [POST]
 * Endpoint to upload AIS file
 * @param req Array of having Objects with type ISearch
 * @param res 
 * @param next 
 * @returns Response HTTP status code & message
 */
export const upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUploadData: Array<ISearch> = req.body;
        if(newUploadData.length > 0){
            await deleteAllAISData();
            for (const search of newUploadData) {
                await createAISData(search);
            }
            return res.status(200).json({
                message: 'New data loaded'
            });
        }
        return res.status(400).json({
            message: 'Bad request'
        });    
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });    
    }
    
    
}

/**
 * [POST]
 * Endpoint to make search with given parameters
 * @param req Object of filters from FE
 * @param res 
 * @param next 
 * @returns Response result of search operation
 */
export const makeSearch = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let filters = req.body;
        const result = await findAISDataByFilters(filters)
    
        return res.status(200).json({data:result});
    } catch(error){
        return res.status(500).json({message:'Internal server error'});
    }
    
};