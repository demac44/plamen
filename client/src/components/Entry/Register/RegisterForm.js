import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ErrorMsg from '../ErrorMsg'
import axios from 'axios'
import logo from '../../../images/logo-min.jpg'
    
const RegisterForm = () => {    
    const [selectYear, setSelectYear] = useState([])
    const [selectDay, setSelectDay] = useState([])
    const [loading, setLoading] = useState(false)
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
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        let birth_date = `${e.target.year.value+'-'+e.target.month.value+'-'+e.target.day.value}`
        let fname = e.target.first_name.value.charAt(0).toUpperCase() + e.target.first_name.value.slice(1);
        let lname = e.target.last_name.value.charAt(0).toUpperCase() + e.target.last_name.value.slice(1);
        let username = e.target.username.value
        let email = e.target.email.value
        let password = e.target.password.value
        let passconfirm = e.target.confirmpass.value
        let gender = e.target.gender.value

        let empty = false
        let arr = [username, fname, lname, email, password, passconfirm]
        
        arr.forEach(field => {
            let trimmed = field.trim()
            if (trimmed === '') {
                empty = true
                setLoading(true)
                return
            }
        })
        
        if (empty){
            setLoading(false)
            setErrorMsg('Please fill in all fields')
        } else if (validateNames(fname, lname)){
            setLoading(false)
            setErrorMsg('First name and last name can contain only letters, not numbers, whitespace or any other special characters and cannot be longer than 50 characters!')
        } else if (validateAge(birth_date) < 13) {
            setLoading(false)
            setErrorMsg('You must be at least 13 years old to register')
        } else if (!validateEmail(email)) {
            setLoading(false)
            setErrorMsg('Email not valid')
        } else if (!validateUsername(username)){
            setLoading(false)
            setErrorMsg('Username must contains only lowercase letters, numbers, underscores and dots and cannot be longer than 30 characters')
        } else if (!validatePassword(password)){
            setLoading(false)
            setErrorMsg('Password must be between 8 and 30 characters long and should not contain whitespace')
        } else if (!confirmPass(password, passconfirm)) {
            setLoading(false)
            setErrorMsg('Passwords must match')
        } else {
            try {
                axios({
                    method:'POST',
                    // url: 'http://localhost:8000/api/register',
                    url: '/api/register',
                    data: {
                        username,
                        fname, 
                        lname,
                        email,
                        password,
                        birth_date,
                        gender
                    }
                }).then(res => {
                    if(res?.data.error){
                        setLoading(false)
                        setErrorMsg(res.data.error)
                        return
                    } else {
                        window.location.href='/login'
                        return
                    }
                })
            } catch (error) {
                setLoading(false)
            }
        }
    }
    
        return (
            <div className='entry-form-box flex-col-ctr'>
                <span style={{alignSelf:'flex-start'}}> 
                    <div className='flex-ac' style={{margin:'0 0 5px 10px'}}>
                        <img className='entry-logo-img' src={logo} alt=''/>
                        <h1>Register</h1>
                    </div>
                    <p>Enter your details below to register</p>
                </span>
                {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}
                {loading && 
                    <div className='overlay flex-col-ctr' style={{backgroundColor:'rgba(0,0,0,0.9)'}}>
                        <div className='small-spinner'></div>
                        <p>Hold on...</p>
                    </div>}
                <form className="entry-form flex-col-ctr" onSubmit={handleSubmit}>
                    <div className="reg-names-box flex">
                        <input type="text" id='first_name' name='first_name' placeholder="First name"/>
                        <input type="text" id='last_name' name='last_name' placeholder="Last name"/>
                    </div>
                    <div className="birthdt-reg-box flex">
                        <select id='gender' name='gender'>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <select id="year" name="year">
                            {selectYear.map(year => <option value={year} key={year}>{year}</option>)}
                        </select>
                        <select id='month' name="month">
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
                        <select d='day' name='day'>
                            {selectDay.map(day => <option value={`${day}`} key={day}>{day}</option>)}
                        </select>
                    </div>
                    <input type="text"  id='email' name='email' placeholder="Email"/>
                    <input type="text" id='username' name='username' placeholder="Create your username"/>
                    <input type="password" id='password' name='password' placeholder="Password"/>
                    <input type="password" id='confirmpass' name='confirmpass' placeholder="Confirm your password"/>

                    <span className='terms-conditions-box'>
                        <p>By clicking on register you agree to our terms and conditions and privacy policy.</p>
                    </span>

                    <button className="register-btn btn" type="submit" disabled={loading}>REGISTER</button>
                </form>
                <div className="entry-link flex-ctr">
                    <h6>Already have an account?</h6>                
                    <NavLink exact to="/login">Login</NavLink>
                </div>
            </div>
    )
}

export const validateEmail = (email) => {
    let valid_email = true
    let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(email.toLowerCase()) || email > 255){
        valid_email = false
        return valid_email
    }
    return valid_email
}
export const validateUsername = (username) => {
    let username_valid = true
    let chars = "._abcdefghijklmnopqrstuvwxyz0123456789"
    for(let i=0;i<username.length;i++){
        if (!chars.includes(username[i]) || username.length > 30){
            username_valid = false
            break
        }
    }
    return username_valid
}

export const validateNames = (fname, lname) => {
    let error = false
    let chars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=0123456789"
    if (fname.length > 20 || lname.length > 20){
        error = true
        return error
    }
    for(let i = 0;i<fname.length;i++){
        if (chars.includes(fname[i]) || fname[i] === ' '){
            error=true
            return error
        }
    }
    for(let i = 0;i<lname.length;i++){
        if (chars.includes(lname[i])){
            error=true
            return error
        }
    }
    return error
}

export const validateAge = (birth_date) => {
    return Math.floor((new Date() - new Date(birth_date).getTime()) / 3.15576e+10)
}

export const validatePassword = (password) => {
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
    
export const confirmPass = (password, passconfirm) => {
    let confirm = true
    if (password !== passconfirm){
        confirm = false
        return confirm
    }
    return confirm
}
export default RegisterForm