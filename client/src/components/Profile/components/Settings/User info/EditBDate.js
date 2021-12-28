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
            <p style={{padding:'10px', textAlign:'center'}}>Edit birth day</p>

            {updated && <p style={styles.updated}>Your birth date is updated!</p>}

            {errorMsg && <p style={styles.error}>{errorMsg}</p>}


            <form className='bDate-form flex-col-ctr' onSubmit={handleBDateChange}>
                <h5>Birth date</h5>
                <select id="year" name="year" style={styles.select}>
                    {selectYear.map(year => <option value={year} key={year}>{year}</option>)}
                </select>
                <select id='month' name="month" style={styles.select}>
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
                <select d='day' name='day' style={styles.select}>
                    {selectDay.map(day => <option value={`${day}`} key={day}>{day}</option>)}
                </select>
                <span className='flex-sb' style={{width:'100%', marginTop:'20px'}}>
                    <p style={{fontSize:'14px'}}>Current: {bDate}</p>
                    <button type='submit' style={styles.editBtn}>EDIT</button>
                </span>
            </form>
            <p style={{fontSize:'14px', marginTop:'20px'}}>
                <strong style={{color:'darkred'}}>Warning: </strong>
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

const styles = {
    editBtn:{
        padding:'5px 20px',
        border:'1px solid #2f2f2f',
        borderRadius:'10px',
        backgroundColor:'#1b1b1b',
        color:'white',
        alignSelf:'flex-end',
        cursor:'pointer'
    },
    updated:{
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#0e7947',
        borderRadius:'10px',
        textAlign:'center',
        marginBottom:'15px'
    },
    error: {
        padding:'5px 10px',
        marginTop:'10px',
        backgroundColor:'#ff5050',
        borderRadius:'10px',
        textAlign:'center',
        marginBottom:'15px'
    },
    select:{
        marginTop:'10px'
    }
}


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