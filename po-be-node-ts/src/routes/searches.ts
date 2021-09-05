import express from 'express';
import { makeSearch } from '../controllers/searches';
const router = express.Router();

router.post('/search', makeSearch);

export = router;