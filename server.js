import { config } from 'dotenv';
if (process.env.SESSION_SECRET !== 'production') {
    config()
}
import express from 'express';
import cors from 'cors'
import session from 'express-session'
import {join, resolve} from 'path'
import { graphqlHTTP } from 'express-graphql';
import {schema} from './src/DB/Schema/schema.js';

const app = express()

const __dirname = resolve()
app.use(express.static(join(__dirname, "client", "build")))


app.use(cors({    
    origin: "http://localhost:3000",
    credentials: false 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 360000,
     }
}))

app.use('/api/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
// app.use(passport.initialize());
// app.use(passport.session())


app.get('*', (req,res)=>{
    res.sendFile(join(__dirname, "client", "build", "index.html"))
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 