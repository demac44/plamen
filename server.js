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
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import auth from './middleware/auth.js';
import {EventEmitter} from 'events'

import { PubSub } from 'graphql-subscriptions';

const biggerEventEmitter = new EventEmitter();
biggerEventEmitter.setMaxListeners(30);
export const pubsub = new PubSub({eventEmitter: biggerEventEmitter});


import login from './controllers/login.js'
import register from './controllers/register.js'
import logout from './controllers/logout.js'
import reset_password from './controllers/Retrieve password/reset_password.js'


(async function () {
    const app = express()

    app.use(cookieParser())
    
    const httpServer = createServer(app)
    
    
    const subscriptionServer =  SubscriptionServer.create({
        schema,
        execute,
        subscribe,
    }, {
        server: httpServer,
        path: '/graphql',
    })

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

    
    const __dirname = resolve()
    app.use(express.static(join(__dirname, "client", "build")))
    
    app.use(cors({    
        origin: "http://localhost:3000",
        credentials: true
    }));

        
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    

    app.use('/graphiql', auth, graphqlHTTP({
        schema,
        graphiql:true
    }))
    
    
    app.use('/api/login', login)
    app.use('/api/register', register)
    app.use('/api/logout', auth, logout)
    app.use('/api/reset_password', reset_password)
    
    app.get('*', (req,res)=>{
        res.sendFile(join(__dirname, "client", "build", "index.html"))
    })

    await server.start()
    server.applyMiddleware({app})
    
    const PORT = process.env.PORT || 8000
    httpServer.listen(PORT, () => console.log('Server is running')) 
    
})()

