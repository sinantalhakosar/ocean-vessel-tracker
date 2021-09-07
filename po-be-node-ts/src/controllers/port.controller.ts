import { NextFunction, Request, Response } from "express";
import { getAllPortsUNLOCODE } from '../repository/port.repository';
import { IPort } from "../types/port.type";

export const addPort = async (req: Request, res: Response, next: NextFunction) => {
    let port: IPort = req.body;

    return res.status(200).json({
        message: 'response.data'
    });
};

export const getAllUnlocodeOfPorts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ports = await getAllPortsUNLOCODE();
        return res.status(200).json({
            portsUnlocode: ports
        });
    }catch(error){
        return res.status(200).json({
            message: 'Internal server error'
        });
    }
    
};