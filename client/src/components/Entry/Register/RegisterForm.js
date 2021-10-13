import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ErrorMsg from '../ErrorMsg'
import axios from 'axios'


    
const RegisterForm = () => {
    let username, first_name, last_name, year, day,email, month, password, passconfirm, gender;
    
    const [selectYear, setSelectYear] = useState([])
    const [selectDay, setSelectDay] = useState([])

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

    const validateEmail = (email) => {
        let valid_email = true
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(email.toLowerCase()) || email > 255){
            valid_email = false
        }
        return valid_email
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
        if (fname.length > 50 || lname.length > 50){
            error = true
            return
        }
        for(let i = 0;i<fname.length;i++){
            if (chars.includes(fname[i]) || fname[i] === ' '){
                error=true
                return
            }
        }
        for(let i = 0;i<lname.length;i++){
            if (chars.includes(lname[i])){
                error=true
                return
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

    const confirmPass = (password, passconfirm) => {
        let confirm = true
        if (password !== passconfirm){
            confirm = false
        }
        return confirm
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let birth_date = `${year.value+'-'+month.value+'-'+day.value}`

        let fname = first_name.value.charAt(0).toUpperCase() + first_name.value.slice(1);
        let lname = last_name.value.charAt(0).toUpperCase() + last_name.value.slice(1);
        username = username.value
        email = email.value
        password = password.value
        passconfirm = passconfirm.value
        gender = gender.value

        let empty = false
        let arr = [username, fname, lname, email, password, passconfirm]
        
        arr.forEach(field => {
            let trimmed = field.trim()
            if (trimmed === '') {
                empty = true
                return
            }
        })

        if (empty){
            setErrorMsg('Please fill in all fields')
        } else if (validateNames(fname, lname)){
            setErrorMsg('First name and last name can contain only letters, not numbers, whitespace or any other special characters and cannot be longer than 50 characters!')
        } else if (validateAge(birth_date) < 13) {
            setErrorMsg('You must be at least 13 years old to register')
        } else if (!validateEmail(email)) {
            setErrorMsg('Email not valid')
        } else if (!validateUsername(username)){
            setErrorMsg('Username must contains only lowercase letters, numbers, underscores and dots and cannot be longer than 30 characters')
        } else if (!validatePassword(password)){
            setErrorMsg('Password must be between 8 and 30 characters long and should not contain whitespace')
        } else if (!confirmPass(password, passconfirm)) {
            setErrorMsg('Passwords must match')
        } else {
            try {
                axios({
                    method:'POST',
                    url: 'http://localhost:5000/api/register',
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
                    res?.data.error ? setErrorMsg(res.data.error) : window.location.href = '/login'
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
        
        return (
        <div>
            <h1>Register</h1>
            <p>Enter your details below to continue</p>
            {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}
            <form className="entry-form flex-col-ctr" onSubmit={handleSubmit}>
                <div className="reg-names-box">
                    <input type="text" ref={value => first_name = value} id='first_name' placeholder="First name"/>
                    <input type="text" ref={value => last_name = value} id='last_name' placeholder="Last name"/>
                </div>
                <div className="birthdt-reg-box">
                    <select id='gender' ref={value => gender = value} name='gender'>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
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
                <input type="text" ref={value => email = value} id='email' placeholder="Email"/>
                <input type="text" ref={value => username = value} id='username' placeholder="Create your username"/>
                <input type="password" ref={value => password = value} id='password' placeholder="Password"/>
                <input type="password" ref={value => passconfirm = value}  id='confirmpass' placeholder="Confirm your password"/>
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
