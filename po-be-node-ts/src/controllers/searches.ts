import { NextFunction, Request, Response } from "express";

interface Search {
    port: string;
    startDate: string;
    endDate: string;
    distance: number;
    showIdles: boolean;
}

export const makeSearch = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let port: string = req.body.port;
    let startDate: string = req.body.startDate;
    let endDate: string = req.body.endDate;
    let distance: number = req.body.distance;
    let showIdles: boolean = req.body.showIdles;
    // add the post
    console.log(req.body)
    // return response
    return res.status(200).json({
        message: 'response.data'
    });
};