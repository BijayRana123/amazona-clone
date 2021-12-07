import express from 'express'
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js'


const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://bijay:J%40nejack1@amazona-clone.ksamx.mongodb.net/amazona?retryWrites=true&w=majority")

app.use('/api/products', productRouter)
app.use('/api/user', userRouter)


app.use((err,req,res,next) => {
    res.status(500).send({message: err.message})
})

app.get('/', (req,res) => {
    res.send('Server is ready');
})

const port =process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server at http://localhost:${port}`)
})