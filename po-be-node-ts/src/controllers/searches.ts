import { NextFunction, Request, Response } from "express";
import { Port } from '../models/ports';
import { createAISData, deleteAllAISData } from '../repo/search.repo';
import { findAISDataByFilters } from '../services/search.service';
import { IPort } from "../types/ports";
import { IFilter, ISearch } from "../types/search";

interface Search {
    port: string;
    startDate: string;
    endDate: string;
    distance: number;
    showIdles: boolean;
}

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

export const makeSearch = async (req: Request, res: Response, next: NextFunction) => {
    let filters = req.body;
    console.log(filters)
    const result = await findAISDataByFilters(filters)

    return res.status(200).json({data:result});
};