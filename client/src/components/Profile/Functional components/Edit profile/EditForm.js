import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {  validateAge, validateNames, validateUsername} from '../../../Entry/Register/RegisterForm'
import ErrorMsg from '../../../Entry/ErrorMsg'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'


const EDIT_INFO = gql`
    mutation ($userID: Int!, $fname: String!, $lname: String!, $username: String!, $bday: String!, $gender: String!){
        edit_info(userID: $userID, first_name: $fname, last_name: $lname, username: $username, birth_date: $bday, gender: $gender){
            userID
        }
    }
`


const EditForm = () => {
    const [selectYear, setSelectYear] = useState([])
    const [selectDay, setSelectDay] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [edit_info] = useMutation(EDIT_INFO)
    const user = JSON.parse(localStorage.getItem('user'))

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

    const handleEdit = (e) => {
        e.preventDefault()

        let bday = `${e.target.year.value+'-'+e.target.month.value+'-'+e.target.day.value}`

        let fname = e.target.first_name.value.charAt(0).toUpperCase() + e.target.first_name.value.slice(1);
        let lname = e.target.last_name.value.charAt(0).toUpperCase() + e.target.last_name.value.slice(1);
        let username = e.target.username.value
        let gender = e.target.gender.value
        
        let empty = false
        let arr = [username, fname, lname]

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
        } else if (validateAge(bday) < 13) {
            setErrorMsg('You must be at least 13 years old to register')
        } else if (!validateUsername(username)){
            setErrorMsg('Username must contains only lowercase letters, numbers, underscores and dots and cannot be longer than 30 characters')
        } else {
            try {
                edit_info({
                    variables: {
                        userID: user.userID,
                        fname,
                        lname,
                        username,
                        gender,
                        bday
                    }
                }).then(res => {
                    res?.data.error ? setErrorMsg(res.data.error) : window.location.reload()
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <br/>
            {errorMsg !== '' && <ErrorMsg message={errorMsg}/>}
            <form className='entry-form flex-col-ctr' onSubmit={handleEdit}>
                <div className="reg-names-box">
                    <input type="text" id='first_name' name='first_name' placeholder="Change first name"/>
                    <input type="text" id='last_name' name='last_name' placeholder="Change last name"/>
                </div>
                <div className="birthdt-reg-box">
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
                    <input type="text" id='username' name='username' placeholder="Change username"/>
                    <button className="entry-btn btn" type="submit">EDIT</button>

            </form>
        </>
    )
}

export default EditForm
