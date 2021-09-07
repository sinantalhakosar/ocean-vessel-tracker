import express from 'express';
import { getAllUnlocodeOfPorts } from '../controllers/port.controller';

const portRouter = express.Router();
/**
 * Route for GET all ports
 */
portRouter.get('/get-ports', getAllUnlocodeOfPorts);

export default portRouter;