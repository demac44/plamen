import React, { useEffect, useState } from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import TagsBox from '../../Groups/components/TagsBox'

const InterestsBox = ({myprofile}) => {
    const [tags, setTags] = useState([])
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: ls.userID
        }
    })

    useEffect(()=>{
        data?.get_user_info?.interests && setTags(data?.get_user_info?.interests.split(','))
    }, [data])

    if(loading) return <p>loading</p>

    return (
        <div className='profile-interests-box'>
            <div style={styles.title} className='flex-sb'>
                <h3>My interests</h3>
                {myprofile && <p style={styles.editBtn}>Edit</p>}
            </div>
            <TagsBox tags={tags}/>                        
        </div>
    )
}

export default InterestsBox


const styles = {
    title:{
        padding:'5px'
    },
    editBtn:{
        padding:'5px 15px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        cursor:'pointer'
    }
}

const USER_INFO = gql`
    query ($userID: Int!){
        get_user_info (userID: $userID){
            interests
        }
    }
`