import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';


const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.use(router);
    
    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};