import express,{Request,Response,NextFunction} from 'express'
import mongoose from 'mongoose'
import BodyParser from 'body-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import bearerToken from 'express-bearer-token';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import * as  db from './MongooseConnection/database'
import  AppError from './Error/AppError'
import AuthRoutes from './routes/Auth'
import xss from 'xss-clean'

import ProductsRoutes from './routes/Products';
import csrf from 'csurf';
import compression from 'compression';


const csrfConnection = csrf({cookie:true});

const app = express();
app.use(cors({credentials:true,origin:'localhost:8080'}))
app.use(
    bearerToken({
        cookie: {
            signed: true,
            secret: 'secret' || '',
            key: 'access_token',
        },
    })
);
app.use(cookieParser('secret'))


app.use(compression());
app.use(xss());
db.mongooseconnect()
app.use(csrfConnection)
//BodyParser
app.use(BodyParser.json())

app.use('/api/v1/user',AuthRoutes);
app.use('/api/v2/products',ProductsRoutes);
//Error Handling
app.use((err:AppError,req:Request,res:Response,_:NextFunction)=>{
    res.status(err.statusCode || 500).json({
        status:'failed',
        message:err.message
        
        
    })

})

export default app;
