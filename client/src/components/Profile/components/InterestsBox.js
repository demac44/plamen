import React, { memo } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';
import TagsBox from '../../General components/TagsBox'
import { Link } from 'react-router-dom'

const InterestsBox = ({myprofile, userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading} = useQuery(USER_INFO, {
        variables:{
            userID: myprofile ? uid : userID
        }
    })

    return (
        <div className='box'>
            <div className='flex-sb'>
                <h3>{myprofile ? 'My interests' : 'User interests'}</h3>
                {myprofile && <Link to='/settings/info' className='side-box-link-btn'>Edit</Link>}
            </div>
            {!loading && <TagsBox tags={data?.get_user_info?.interests.split(',')}/>}                       
        </div>
    )
}

export default memo(InterestsBox)

const USER_INFO = gql`
    query ($userID: Int){
        get_user_info (userID: $userID){
            interests
        }
    }
`