import React from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginForm from '../../components/Entry/Login/LoginForm'
import RegisterForm from '../../components/Entry/Register/RegisterForm'
import '../../components/Entry/entry.css'

const Entry = () => {
    return (
        <>
            <Switch>
                <Route exact path={['/login', '/register']}>              
                    <div className='entry-wrapper flex-ctr overlay' style={{backgroundColor:'#1f1f1f'}}>
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
