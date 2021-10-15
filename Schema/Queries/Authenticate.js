import { GraphQLString,  } from 'graphql';
import { AuthType } from '../TypeDefs/Authenticate.js';
import jwt from 'jsonwebtoken'

let info = {};

export const AUTH_USER = {
    type: AuthType,
    args: {
        token: {type: GraphQLString}
    },    
    resolve(parent, args) {
        jwt.verify(args.token, process.env.JWT_SECRET, (err, res)=>{
            if (err) throw err;
            if (res) info = res
            return
        })
        return info
    }    
} 