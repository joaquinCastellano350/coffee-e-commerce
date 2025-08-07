import express from 'express'
import {Request, Response, ErrorRequestHandler} from 'express'
import {productRouter} from './product/product.routes.js'
import { categoryRouter } from './category/category.routes.js';
import { catalogRouter } from './catalog/catalog.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

import { connectDB } from './config/mongoose.js';

const app = express();
connectDB();
app.use(express.json());
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/catalogs', catalogRouter);
app.use(errorHandler as ErrorRequestHandler);

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})