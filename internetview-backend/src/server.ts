//server.ts
import { postgresDB } from 'databases/postgres-db';
//import * as bodyParser from 'koa-bodyparser';
import * as morgan from 'koa-morgan';
import * as koaBody from 'koa-body';
import {userRouter} from 'routes/user-router';
import {corporateRouter} from 'routes/corporate-router';
import {authRouter} from "routes/auth-routes";


const app = require('./app');
const cors = require('@koa/cors');


const bootstrap = async () => {
    await postgresDB();

    //viewing incoming users agents
    app.use(morgan('combined'));
    app.use(cors())
    //for parsing incoming requests
    //app.use(bodyParser());
    //for multipart
    app.use(koaBody({ multipart: true }));

    app.use(userRouter.routes(), userRouter.allowedMethods());
    app.use(corporateRouter.routes(), corporateRouter.allowedMethods());
    app.use(authRouter.routes(),authRouter.allowedMethods());

    //listen on port 3000
    app.listen(3001);
};
bootstrap();
