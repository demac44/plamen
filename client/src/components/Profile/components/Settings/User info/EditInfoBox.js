import React, { useCallback, useState } from 'react'
import {gql} from 'graphql-tag'
import { useMutation } from 'react-apollo'
import CountriesSelect from './CountriesSelect'
import './style.css'
import CitiesSelect from './CitiesSelect'
import SearchUniversity from './SearchUniversity'

const EditInfoBox = ({data}) => {
    const [updated, setUpdated] = useState(false)
    const [update_info] = useMutation(UPDATE_INFO)
    const [country, setCountry] = useState(data.country)
    const [city, setCity] = useState(data.city)

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
                userID: data.userID,
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
        setCountry(val)
    }, [setCountry]) 

    const setCityCB = useCallback(val => {
        setCity(val)
    }, [setCity]) 

    return (
        <form className='flex-col-ctr edit-user-info-box' onSubmit={handleEditInfo}>
            <p>Edit info</p>

            {updated && <p className='updated- msg'>Your info is updated!</p>}

            <div className='flex-ctr'>
                <h5>Country</h5>
                <input type='text' className='input' id='country' placeholder='Add country' value={country} readOnly={true}/>
                <CountriesSelect setCountryCB={setCountryCB}/>     
            </div>  

            <div className='flex-ctr'>
                <h5>City</h5>
                <input type='text' id='city' className='input' placeholder='Add city' value={city} readOnly={true}/>
                <CitiesSelect country={country} setCityCB={setCityCB}/>
            </div>

            <div className='flex-ctr'>
                <h5>Job</h5>
                <input type='text' className='input' id='job' placeholder='Add job' defaultValue={data.job}/>
            </div>

            <div className='flex-ctr'>
                <h5>University</h5>
                <input type='text' className='input' id='uni' placeholder='Add university' defaultValue={data.university} readOnly/>
                <SearchUniversity/>
            </div>            

            <div className='flex-ctr'>
                <h5>High school</h5>
                <input type='text' className='input' id='hs' placeholder='Add high school' defaultValue={data.high_school}/>
            </div>    

            <div className='flex-ctr'>
                <h5>Phone</h5>
                <input type='text' className='input' id='num' placeholder='Add phone number' defaultValue={data.phone_number}/>
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