import React from 'react'
import {Route, Switch} from 'react-router-dom'

import { LoginForm, RegisterForm } from '../../components/export'

import '../../components/Entry/entry.css'

const Entry = () => {
    return (
        <>
            <Switch>
                <Route exact path={['/login', '/register']}>              
                    <div className='entry-wrapper flex-ctr'>
                        <Route exact path='/register'>
                            <RegisterForm/>
                        </Route>
                        <Route exact path='/login'>
                            <LoginForm/>
                        </Route>
                    </div>
                </Route>
            </Switch>
        </>
    )
}

export default Entry
