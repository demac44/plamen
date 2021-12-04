import React from 'react'
import {Route, Switch} from 'react-router-dom'

import { LoginForm, RegisterForm } from '../../components/export'

const Entry = () => {
    return (
        <>
            <Switch>
                <Route exact path={['/login', '/register', '/messages']}>              
                    <div className='entry-wrapper flex-ctr'>
                        <div className='entry-form-box'>
                            <Route exact path='/register'>
                                <RegisterForm/>
                            </Route>
                            <Route exact path='/login'>
                                <LoginForm/>
                            </Route>
                        </div>
                    </div>
                </Route>
            </Switch>
        </>
    )
}

export default Entry
