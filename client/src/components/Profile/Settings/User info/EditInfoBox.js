import React, { useCallback, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import './style.css'
import CountriesSelect from './CountriesSelect'
import CitiesSelect from './CitiesSelect'
import SearchUniversity from './SearchUniversity'
import { useSelector } from 'react-redux'

const EditInfoBox = ({data}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const [updated, setUpdated] = useState(false)
    const [update_info] = useMutation(UPDATE_INFO)
    const [country, setCountry] = useState(data.country)
    const [city, setCity] = useState(data.city)
    const [uni, setUni] = useState(data.university)
    const [job, setJob] = useState(data.job)
    const [hs, setHS] = useState(data.high_school)
    const [pnum, setPNum] = useState(data.phone_number)


    const handleEditInfo = (e) => {
        e.preventDefault()

        const job = e.target.job.value
        const uni = e.target.uni.value
        const hs = e.target.hs.value
        const num = e.target.num.value
        const country = e.target.country.value
        const city = e.target.city.value

        update_info({
            variables:{
                userID: uid,
                job,
                uni,
                hs,
                num,
                country,
                city
            }
        }).then(()=>setUpdated(true))
    }

    const setCountryCB = useCallback(val => {
        val === "--blank--" ? setCountry('') : setCountry(val)
    }, [setCountry]) 

    const setCityCB = useCallback(val => {
        setCity(val)
    }, [setCity]) 

    const setUniCB = useCallback(val => {
        setUni(val)
    }, [setUni]) 

    return (
        <form className='flex-col-ctr edit-user-info-box' onSubmit={handleEditInfo}>
            <p>Edit info</p>

            {updated && <p className='updated-msg'>Your info is updated!</p>}

            <div className='flex-ctr'>
                <h5>Country</h5>
                <span className='flex-ac wh-100'>
                    <i className='fas fa-times clear-info' onClick={()=>setCountry('')}/>
                    <input type='text' className='input' id='country' placeholder='Add country' value={country} readOnly={true}/>
                </span>
                <CountriesSelect setCountryCB={setCountryCB}/>     
            </div>  

            <div className='flex-ctr'>
                <h5>City</h5>
                <span className='flex-ac wh-100'>
                    <i className='fas fa-times clear-info' onClick={()=>setCity('')}/>
                    <input type='text' id='city' className='input' placeholder='Add city' value={city} readOnly={true}/>
                </span>
                <CitiesSelect country={country} setCityCB={setCityCB}/>
            </div>

            <div className='flex-ctr'>
                <h5>Job</h5>
                <span className='flex-ac wh-100'>
                    <i className='fas fa-times clear-info' onClick={()=>setJob('')}/>
                    <input type='text' className='input' id='job' placeholder='Add job' value={job} onChange={(e)=>setJob(e.target.value)}/>
                </span>
            </div>

            <div className='flex-ctr'>
                <h5>University</h5>
                <span className='flex-ac wh-100'>
                    <i className='fas fa-times clear-info' onClick={()=>setUni('')}/>
                    <input type='text' className='input' id='uni' placeholder='Add university' value={uni} readOnly/>
                </span>
                <SearchUniversity setUniCB={setUniCB}/>
            </div>            

            <div className='flex-ctr'>
                <h5>High school</h5>
                <span className='flex-ac wh-100'>
                    <i className='fas fa-times clear-info' onClick={(e)=>setHS('')}/>
                    <input type='text' className='input' id='hs' placeholder='Add high school' value={hs} onChange={(e)=>setHS(e.target.value)}/>
                </span>
            </div>    

            <div className='flex-ctr'>
                <h5>Phone</h5>
                <span className='flex-ac wh-100'>
                    <i className='fas fa-times clear-info' onClick={()=>setPNum('')}/>
                    <input type='text' className='input' id='num' placeholder='Add phone number' value={pnum} onChange={(e)=>setPNum(e.target.value)}/>
                </span>
            </div>  

            <button type='submit' className='btn save-btn'>SAVE</button>
        </form>
    )
}

export default EditInfoBox

const UPDATE_INFO = gql`
    mutation ($userID: Int!, $job: String!, $uni: String!, $hs: String!, $num: String!, $country: String!, $city: String!){
        edit_user_info (userID: $userID, job: $job, university: $uni, high_school: $hs, phone_number: $num, country: $country, city: $city ){
            userID
        }
    }
`