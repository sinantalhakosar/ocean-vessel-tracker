import { NextFunction, Request, Response } from "express";
import { Port } from '../models/ports';
import { createNewPort } from '../repo/ports';
import { IPort } from "../types/ports";

interface Search {
    port: string;
    startDate: string;
    endDate: string;
    distance: number;
    showIdles: boolean;
}

export const upload = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.body;
    console.log(file)
    //const base64data = file.content.replace(/^data:.*,/, '');
}

export const makeSearch = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    // let port: string = req.body.port;
    // let startDate: string = req.body.startDate;
    // let endDate: string = req.body.endDate;
    // let distance: number = req.body.distance;
    // let showIdles: boolean = req.body.showIdles;
    // add the post
    console.log(req)

    // const ports: IPort[] = [
    //     {country: "AL", location: "ROM", name: "Romano Port", coordinates: [19.416667, 41.366667]},
    //     {
    //         country: "AT",
    //         location: "BRD",
    //         name: "Brand",
    //         coordinates: [9.733333, 47.1] as [number, number]
    //     },
    //     {
    //         country: "FR",
    //         location: "GRX",
    //         name: "Greux",
    //         coordinates: [48.45, -5.683333] as [number, number]
    //     },
    //     {
    //         country: "NL",
    //         location: "AMS",
    //         name: "Amsterdam",
    //         coordinates: [52.4, -4.816667] as [number, number]
    //     },
    //     {
    //         country: "IT",
    //         location: "LL8",
    //         name: "Gallignano",
    //         coordinates: [45.433333, -9.833333] as [number, number]
    //     },
    //   ];

    //   for (const port of ports) {
    //     createNewPort(port)
    //     console.log(`Created user ${port.country} ${port.location}`);
    //   }

    // return response
    return res.status(200).json({
        message: 'response.data'
    });
};