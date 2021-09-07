import express from 'express';
import { makeSearch, upload } from '../controllers/search.controller';

const searchRouter = express.Router();

/**
 * Route for POST search
 */
searchRouter.post('/search', makeSearch);
/**
 * Route for POST uploading AIS file
 */
searchRouter.post('/upload', upload);

export default searchRouter;