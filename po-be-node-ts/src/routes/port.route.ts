import express from 'express';
import { getAllUnlocodeOfPorts } from '../controllers/port.controller';

const portRouter = express.Router();

portRouter.get('/get-ports', getAllUnlocodeOfPorts);

export default portRouter;