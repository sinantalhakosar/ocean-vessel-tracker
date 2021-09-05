import { NextFunction, Request, Response } from "express";
import { Port } from '../models/ports';
import { createNewPort } from '../repo/ports';
import { IPort } from "../types/ports";

export const addPort = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let port: IPort = req.body;
    // add the port
    console.log(req.body)

    return res.status(200).json({
        message: 'response.data'
    });
};