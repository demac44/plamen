import React, { useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import { useMutation} from 'react-apollo'

const EditBDate = ({data, uid}) => {
    const [selectYear, setSelectYear] = useState([])
    const [selectDay, setSelectDay] = useState([])
    const [bDate, setBDate] = useState(null)
    const [change_bdate] = useMutation(CHANGE_BDATE)
    const [updated, setUpdated] = useState(false)

    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(()=>{
        setSelectYear(setYears())
        setSelectDay(setDays())
        setBDate(getBDate(data))
        return
    }, [data])

    const handleBDateChange = (e) => {
        e.preventDefault()

        let bDate = `${e.target.year.value+'-'+e.target.month.value+'-'+e.target.day.value}`

        change_bdate({
            variables:{
                userID: uid,
                bDate
            }
        }).then(res => {
            if(res?.data?.edit_bdate?.error){
                setUpdated(false)
                setErrorMsg(res?.data?.edit_bdate?.error)
            } else {
                setErrorMsg(false)
                setUpdated(true)
            }
        })
    }

    return (
        <div className='edit-user-info-box'>
            <p className='flex-ctr'>Edit birth day</p>

            {updated && <p className='updated-msg'>Your birth date is updated!</p>}

            {errorMsg && <p className='err-msg'>{errorMsg}</p>}


            <form className='bDate-form flex-col-ctr' onSubmit={handleBDateChange}>
                <h5>Birth date</h5>
                <select id="year" name="year" className='input'>
                    {selectYear.map(year => <option value={year} key={year}>{year}</option>)}
                </select>
                <select id='month' name="month" className='input'>
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
                <select d='day' name='day' className='input'>
                    {selectDay.map(day => <option value={`${day}`} key={day}>{day}</option>)}
                </select>
                <span className='flex-sb current-data-box'>
                    <p style={{fontSize:'14px'}}>Current: {bDate}</p>
                    <button type='submit' className='btn'>SAVE</button>
                </span>
            </form>
            <p className='edit-warning'>
                <strong>Warning: </strong>
                You can change you birth date only once!
            </p>
        </div>
    )
}

export default EditBDate

const CHANGE_BDATE = gql`
    mutation ($userID: Int!, $bDate: String!){
        edit_bdate(userID: $userID, bDate: $bDate){
            error
        }
    }
`

const getBDate = (data) => {
    const date = new Date(parseInt(data)).toDateString()
    return date
}

const setYears = () => {
    let years = []
    for(let i=2021;i>1920;i--){
        years.push(`${i}`)
    }
    return years
}

const setDays = () => {
    let days = []
    for(let i=1;i<32;i++){
        if (i < 10) days.push('0'+i)
        else days.push(`${i}`)
    }
    return days
}