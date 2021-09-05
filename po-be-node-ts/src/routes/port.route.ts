import express from 'express';
import { addPort } from '../controllers/port.controller';

const portRouter = express.Router();

portRouter.post('/add-port', addPort);

export default portRouter;