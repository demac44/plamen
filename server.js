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
import { PubSub } from 'graphql-subscriptions';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
// import auth from './middleware/auth.js';

const app = express()

app.use(cookieParser())


const httpServer = createServer(app)

const server = new ApolloServer({
    schema,
    plugins: [{
        async serverWillStart(){
            return {
                async drainServer(){
                    subscriptionServer.close()
                }
            }
        }
    }]
})

const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
}, {
    server: httpServer,
    path: server.graphqlPath
})

const __dirname = resolve()
app.use(express.static(join(__dirname, "client", "build")))


app.use(cors({    
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/graphql', graphqlHTTP({
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

await server.start()
server.applyMiddleware({app})

const PORT = process.env.PORT || 8000

httpServer.listen(PORT, ()=> console.log('Server is running')) 