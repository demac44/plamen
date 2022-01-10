import React, { memo } from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import TagsBox from '../../General components/TagsBox'

const InterestsBox = ({myprofile, userID}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading} = useQuery(USER_INTERESTS, {
        variables:{
            userID: myprofile ? uid : userID
        }
    })

    const splitInterests = () => {
        let arr = [];
        data?.get_user_interests?.map(i=>{
            arr.push(i.interest)
        })
        return arr
    }

    return (
        <>
        {data?.get_user_interests?.length>0 && 
            <div className='box'>
                <div className='flex-sb'>
                    <h3>{myprofile ? 'My interests' : 'User interests'}</h3>
                    {myprofile && <Link to='/settings/info' className='side-box-link-btn'>Edit</Link>}
                </div>
                {loading ? <div className='flex-ctr'><div className='small-spinner'></div></div> :
                <TagsBox tags={splitInterests()}/>}             
            </div>}
        </>
    )
}

export default memo(InterestsBox)

const USER_INTERESTS = gql`
    query ($userID: Int){
        get_user_interests(userID: $userID){
            interest
        }
    }
`