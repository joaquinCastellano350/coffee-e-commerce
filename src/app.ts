import express from 'express'
import {Request, Response, ErrorRequestHandler} from 'express'
import {productRouter} from './product/product.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use('/products', productRouter);
app.use(errorHandler as ErrorRequestHandler);

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})