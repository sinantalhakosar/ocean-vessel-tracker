import express from 'express';
import { makeSearch, upload } from '../controllers/searches';

const searchRouter = express.Router();

searchRouter.post('/search', makeSearch);
searchRouter.post('/upload', upload);

export default searchRouter;