import { config } from 'dotenv';
if (process.env.SESSION_SECRET !== 'production') {
    config()
}
import express from 'express';
import cors from 'cors'
import {join, resolve} from 'path'
import { graphqlHTTP } from 'express-graphql';
import {schema} from './Schema/schema.js';
import cookieParser from 'cookie-parser'

import auth from './middleware/auth.js';

const app = express()

app.use(cookieParser())

const __dirname = resolve()
app.use(express.static(join(__dirname, "client", "build")))


app.use(cors({    
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(auth)

app.use('/api/graphql', auth,  graphqlHTTP({
    schema,
    graphiql: true
}))


import login from './controllers/login.js'
app.use('/api/login', login)
import register from './controllers/register.js'
app.use('/api/register', register)
import logout from './controllers/logout.js'
app.use('/api/logout', logout)


app.get('*', (req,res)=>{
    res.sendFile(join(__dirname, "client", "build", "index.html"))
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 