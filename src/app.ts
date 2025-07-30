import express from 'express'
import {Request, Response} from 'express'
const app = express();

app.get('/', (req: Request, res: Response)=> {
    res.status(201).json({message: "Hello World"})
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})