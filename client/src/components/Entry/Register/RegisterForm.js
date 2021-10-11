import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import gql from 'graphql-tag';
import {useQuery, useMutation } from 'react-apollo';
import ErrorMsg from '../ErrorMsg'

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
    let tag_name, first_name, last_name, year, day,email, month, password, confirmpass;
    const [new_user] = useMutation(CREATE_USER)
    const {data, loading, error} = useQuery(USER_QUERY)
    
    const [selectYear, setSelectYear] = useState([])
    const [selectDay, setSelectDay] = useState([])
    
    const [usernameNotFound, setUsernameNotFound] = useState(false)
    const [emailNotFound, setEmailNotFound] = useState(false)
    const [emailNotValid, setEmailNotValid] = useState(false)
    const [namesNotValid, setNamesNotValid] = useState(false)
    const [usernameNotValid, setUsernameNotValid] = useState(false)
    const [ageError, setAgeError] = useState(false)
    const [passNotValid, setPassNotValid] = useState(false)
    const [confirmErr, setConfirmErr] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(()=>{
        let years = []
        let days = []
        for(let i=2021;i>1920;i--){
            years.push(`${i}`)
        }
        for(let i=1;i<32;i++){
            if (i < 10) days.push('0'+i)
            else days.push(`${i}`)
        }
        setSelectYear(years)
        setSelectDay(days)
    }, [])

    const setErrorsFalse = () => {
        setEmailNotFound(false)
        setUsernameNotFound(false)
        setEmailNotValid(false)
        setUsernameNotValid(false)
        setNamesNotValid(false)
        setAgeError(false)
        setPassNotValid(false)
        setConfirmErr(false)
        setErrorMsg('')
    }

    if (loading) return loading
    if (error) console.log(error)

    const checkEmail = (email) => {
        let email_found = false
        data.users.forEach(user => {
            if(user.email === email.toLowerCase()){
                email_found = true
                return user
            }
        })
        return email_found
    }
    const validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email.toLowerCase())
    }

    const checkUsername = (username) => {
        let username_found = false
        data.users.forEach(user => {
            if(user.tag_name === username){
                username_found = true
                return user
            }
        })
        return username_found
    }

    const validateUsername = (username) => {
        let username_valid = true
        let chars = "._abcdefghijklmnopqrstuvwxyz0123456789"
        for(let i=0;i<username.length;i++){
            if (!chars.includes(username[i]) || username.length > 30){
                username_valid = false
                return
            }
        }
        return username_valid
    }

    const validateNames = (fname, lname) => {
        let error = false
        let chars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=0123456789"
        for(let i = 0;i<fname.length;i++){
            if (chars.includes(fname[i]) || fname[i] === ' '){
                error=true
            }
        }
        for(let i = 0;i<lname.length;i++){
            if (chars.includes(lname[i])){
                error=true
            }
        }
        return error
    }

    const validateAge = (birth_date) => {
        return Math.floor((new Date() - new Date(birth_date).getTime()) / 3.15576e+10)
    }

    const validatePassword = (password) => {
         let validPass = true
         if (password.length < 8 || password.length > 30){
             validPass = false
             return validPass
         }
         for(let i = 0;i<password.length;i++){
             if(password[i] === ' '){
                 validPass = false
                 break
             }
         }
         return validPass
    }

    const confirmPass = (password, confirmpass) => {
        let confirm = true
        if (password !== confirmpass){
            confirm = false
        }
        return confirm
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let birth_date = `${year.value+'-'+month.value+'-'+day.value}`
        setErrorsFalse()

        if (validateNames(first_name.value, last_name.value)){
            setNamesNotValid(true)
            setErrorMsg('First name and last name can contain only letters, not numbers, whitespace or any other special characters!')
        } else if (validateAge(birth_date) < 13) {
            setAgeError(true)
            setErrorMsg('You must be at least 13 years old to register')
        } else if (!validateEmail(email.value)) {
            setEmailNotValid(true)
            setErrorMsg('Email not valid')
        } else if (!validateUsername(tag_name.value)){
            setUsernameNotValid(true)
            setErrorMsg('Username must contains only lowercase letters, numbers, underscores and dots and cannot be longer than 30 characters')
        } else if (!validatePassword(password.value)){
            setPassNotValid(true)
            setErrorMsg('Password must be between 8 and 30 characters long and should not contain whitespace')
        } else if (!confirmPass(password.value, confirmpass.value)) {
            setConfirmErr(true)
            setErrorMsg('Passwords must match')
        } else if (checkEmail(email.value)){
            setEmailNotFound(true)
            setErrorMsg('Email already exists') 
        } else if (checkUsername(tag_name.value)){
            setUsernameNotFound(true)
            setErrorMsg('Username is already taken')
        } else {
            new_user(
            {variables: {
                tag_name: tag_name.value,
                first_name: first_name.value.toLowerCase(),
                last_name: last_name.value.toLowerCase(),
                email: email.value.toLowerCase(),
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
            {(emailNotFound || emailNotValid || usernameNotFound || usernameNotValid || namesNotValid || ageError || passNotValid || confirmErr) && <ErrorMsg message={errorMsg}/>}
            <form className="entry-form flex-col-ctr" onSubmit={handleSubmit}>
                <div className="reg-names-box">
                    <input type="text" ref={value => first_name = value} id='first_name' placeholder="First name" required/>
                    <input type="text" ref={value => last_name = value} id='last_name' placeholder="Last name" required/>
                </div>
                <div className="birthdt-reg-box">
                    <select id="year" ref={value => year = value} name="year">
                        {selectYear.map(year => <option value={year} key={year}>{year}</option>)}
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
                    <select ref={value => day = value} id='day' name='day'>
                        {selectDay.map(day => <option value={`${day}`} key={day}>{day}</option>)}
                    </select>
                </div>
                <input type="text" ref={value => email = value} id='email' placeholder="Email" required/>
                <input type="text" ref={value => tag_name = value} id='tag_name' placeholder="Create your username" required/>
                <input type="password" ref={value => password = value} id='password' placeholder="Password" required/>
                <input type="password" ref={value => confirmpass = value}  id='confirmpass' placeholder="Confirm your password" required/>
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
