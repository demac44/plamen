import React, { useEffect, useState, memo } from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'

import TagsBox from '../../Groups/components/TagsBox'
import { Link } from 'react-router-dom'

const InterestsBox = ({myprofile, userID}) => {
    const [tags, setTags] = useState([])
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: myprofile ? ls.userID : userID
        }
    })

    useEffect(()=>{
        setTags([])
        data?.get_user_info?.interests && setTags(data?.get_user_info?.interests.split(','))
    }, [data, userID, myprofile])

    return (
        <div className='profile-interests-box'>
            <div style={styles.title} className='flex-sb'>
                <h3>{myprofile ? 'My interests' : 'User interests'}</h3>
                {myprofile && <Link to='/settings/info' style={styles.editBtn}>Edit</Link>}
            </div>
            {!loading && <TagsBox tags={tags}/> }                       
        </div>
    )
}

export default memo(InterestsBox)


const styles = {
    title:{
        padding:'5px'
    },
    editBtn:{
        padding:'5px 15px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        cursor:'pointer',
        color:'white'
    }
}

const USER_INFO = gql`
    query ($userID: Int){
        get_user_info (userID: $userID){
            interests
        }
    }
`