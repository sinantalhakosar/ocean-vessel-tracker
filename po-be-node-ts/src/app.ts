import http from 'http';
import express, { Express } from 'express';
import searchRouter from './routes/search.route';
import portRouter from './routes/port.route';
import {connect} from './configs/database.config'
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env') })
var cors = require('cors');

const router: Express = express();
connect();

router.use(cors({origin: 'http://localhost:5000'}));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


/** Routes */
router.use('/search', searchRouter);
router.use('/port', portRouter);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));