

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { fileURLToPath } from 'url';
import express, { json, urlencoded as _urlencoded } from 'express'
import { set, connect } from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import path from 'path'


config()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesFolderPath = path.join(__dirname, '..', 'images');


const app = express()

app.use('/images', express.static(path.join(new URL('.', import.meta.url).pathname, '/images')));
// app.use(
//     "/images",
//     express.static(path.join(__dirname, "/images"))
// );

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
)


app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.get('/', (req, res) => {
    res.send('Api is running!')
})






set('strictQuery', true);

const databaseURL =
  process.env.NODE_ENV == "test" ? process.env.Test_DB_URL : process.env.DB_URL;
console.log(databaseURL);

// const dbURI = 'mongodb+srv://grumpy:test123456@cluster0.0ms9mco.mongodb.net/?retryWrites=true&w=majority';
// connect(dbURI)
//     .then((result) => app.listen(5000))
//     .catch((err) => console.log(err))

const dbURI = 'mongodb+srv://grumpy:test123456@cluster0.0ms9mco.mongodb.net/?retryWrites=true&w=majority';
connect(dbURI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))

// app.use(express.json());

// app.use(express.urlencoded());

app.use('/', authRoutes)
app.use('/', productRoutes)
app.use('/', orderRoutes)
app.use('/',uploadRoutes)
app.get('/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/images',express.static(path.join(__dirname, '..', '..','..','Symphony Frontend','frontend','src','public','images')))


app.use((req, res, next) => {
    const error = new Error(`Not Found -${req.originalUrl}`)
    res.status(404)
    next(error)
})


app.use((err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message
    })
    next()
})

export default app;