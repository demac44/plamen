import React from 'react'
import { Route, Switch } from 'react-router-dom'
import GenerateToken from './GenerateToken'
import SetNewPassword from './SetNewPassword'
import './style.css'

const PasswordRetrieve = () => {
    return (
        <Switch>
            <Route exact path='/reset_password'>
                <GenerateToken/>
            </Route>
            <Route exact path='/reset_password/:token'>
                <SetNewPassword/>
            </Route>
        </Switch>
    )
}

export default PasswordRetrieve
