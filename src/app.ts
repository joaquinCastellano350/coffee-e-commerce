import express from 'express'
<<<<<<< Updated upstream
import {Request, Response} from 'express'
const app = express();

app.get('/', (req: Request, res: Response)=> {
    res.status(201).json({message: "Hello World"})
})
=======
import {Request, Response, ErrorRequestHandler} from 'express'
import {productRouter} from './product/product.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';

import { connectDB } from './config/mongoose.js';

const app = express();
connectDB();
app.use(express.json());
app.use('/products', productRouter);
app.use(errorHandler as ErrorRequestHandler);
>>>>>>> Stashed changes

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})