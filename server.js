import { config } from 'dotenv';
if (process.env.SESSION_SECRET !== 'production') {
    config()
}
import express from 'express';
import cors from 'cors'
import {join, resolve} from 'path'
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
import test from './controllers/test.js'
import cities from './controllers/Lists/cities.cjs'
import universities from './controllers/Lists/universities.cjs'
import interests from './controllers/Lists/interests.cjs'
import emojis from './controllers/Lists/emojis.cjs'
import verify_token from './controllers/verify_token.js'
import { graphqlHTTP } from 'express-graphql';


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
        origin: ["http://localhost:8081", "http://localhost:3000", "https://plamen-main.herokuapp.com"],
        credentials: true
    }));


        
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    app.use('/graphiql', graphqlHTTP({
        schema,
        graphiql:true
    }))

    app.use('/api/login', login)
    app.use('/api/register', register)
    app.use('/api/logout', auth, logout)
    app.use('/api/reset_password', reset_password)
    app.use('/api/test', test)
    app.use('/api/cities', auth, cities)
    app.use('/api/universities', auth, universities)
    app.use('/api/interests', auth, interests)
    app.use('/api/emojis', auth, emojis)
    app.use('/api/verify_token', verify_token)


    
    app.get('*', (req,res)=>{
        res.sendFile(join(__dirname, "client", "build", "index.html"))
    })

    await server.start()
    server.applyMiddleware({app})
    
    const PORT = process.env.PORT || 8000
    httpServer.listen(PORT, () => console.log('Server is running')) 
    
})()

