import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { LoginForm, RegisterForm } from '../../components/export'

const client = new ApolloClient({
    uri: 'http://localhost:5000/api/graphql',
    onError: (e) => { console.log(e) },
  })
  

const Entry = () => {
    return (
        <ApolloProvider client={client}>
            <Switch>
                <Route exact path={['/login', '/register', '/register/emailerror']}>              
                    <div className='entry-wrapper'>
                        <div className='entry-left'></div>
                        <div className='entry-right flex-ctr'>
                            <div className='entry-form-box'>
                                <Route exact path='/register'>
                                    <RegisterForm/>
                                </Route>
                                <Route exact path='/login'>
                                    <LoginForm/>
                                </Route>
                                <Route exact path='/register/emailerror'>
                                    <RegisterForm errormsg='Email already exists!'/>   
                                </Route>
                            </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </ApolloProvider>
    )
}

export default Entry
