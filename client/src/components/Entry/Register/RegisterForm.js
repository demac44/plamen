import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import gql from 'graphql-tag';
import {useQuery, useMutation } from 'react-apollo';

const USER_QUERY = gql`
    query {
      users {
        tag_name
        email
    }
}`;

const CREATE_USER = gql`
    mutation new_user (
        $tag_name: String!,
        $first_name: String!
        $last_name: String!,
        $email: String!,
        $pass: String!,
        $birth_date: String!,
        $pfp_url: String!
        ){
        new_user(
            tag_name: $tag_name,
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            pass: $pass,
            birth_date: $birth_date,
            pfp_url: $pfp_url
            )
            { 
            tag_name
            first_name
            last_name
            email
            pass
            birth_date
            pfp_url
            }
    }`

    
const RegisterForm = () => {
    let tag_name, first_name, last_name, year, day,email, month, password;
    const [new_user] = useMutation(CREATE_USER)
    const [emailErr, setEmailErr] = useState(false)
    const [usernameErr, setUsernameErr] = useState(false)

        
    const {data, loading, error} = useQuery(USER_QUERY)

    if (loading) return loading
    if (error) return error


    const checkEmail = (email) => {
        let email_found = false
        data.users.map(user => {
            if(user.email === email){
                email_found = true
                return user
            }
        })
        return email_found
    }
    const checkUsername = (username) => {
        let username_found = false
        data.users.map(user => {
            if(user.tag_name === username){
                username_found = true
                return user
            }
        })
        return username_found
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let birth_date = `${year.value+'-'+month.value+'-'+day.value}`

        if (checkEmail(email.value)){
            setEmailErr(true)
            setUsernameErr(false)
        } else if (checkUsername(tag_name.value)){
            setUsernameErr(true)
            setEmailErr(false)
        } else {
            new_user(
            {variables: {
                tag_name: tag_name.value,
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                pass: password.value,
                birth_date: birth_date,
                pfp_url: 'url'
            }})
            window.location.href = '/login'
        }
    }
        
        return (
        <div>
            <h1>Register</h1>
            <p>Enter your details below to continue</p>
            {emailErr && <div className='error-msg'><p>Email is already in use</p></div>}
            {usernameErr && <div className='error-msg'><p>Username is already taken</p></div>}
            <form className="entry-form flex-col-ctr" onSubmit={handleSubmit}>
                <div className="reg-names-box">
                    <input type="text" ref={value => first_name = value} id='first_name' placeholder="First name"></input>
                    <input type="text" ref={value => last_name = value} id='last_name' placeholder="Last name"/>
                </div>
                <div className="birthdt-reg-box">
                    <select id="year" ref={value => year = value} name="year">
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                    <select ref={value => month = value} id='month' name="month">
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">Jun</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <input type="number" ref={value => day = value} id='day' name='day'/>
                </div>
                <input type="email" ref={value => email = value} id='email' placeholder="Email"/>
                <input type="text" ref={value => tag_name = value} id='tag_name' placeholder="Create your username"/>
                <input type="password" ref={value => password = value} id='password' placeholder="Password"/>
                <input type="password" placeholder="Confirm your password"/>
                <button className="entry-btn btn" type="submit">REGISTER</button>
            </form>
            <div className="entry-link flex-ctr">
                <h6>Already have an account?</h6>                
                <NavLink exact to="/login">Login</NavLink>
            </div>
        </div>
    )
}

export default RegisterForm
