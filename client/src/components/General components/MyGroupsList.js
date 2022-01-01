import React, {memo} from 'react'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './General.css'

const MyGroupsList = () => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
    const {data, loading} = useQuery(GET_MY_GROUPS, {
        variables:{
            uid
        }
    })

    return (
        <div className='my-groups-box box' style={{margin:'0'}}>
            <div className='flex-sb my-groups-box-title'>
                <h2>My communities</h2>
                <Link to='/communities' className='side-box-link-btn'>See all</Link>
            </div>
            {!loading && data?.get_groups?.slice(0, 5)?.map(group=>
                <div className='my-groups-box-group flex-ctr' style={{backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}} key={group.groupID}>
                    <Link  to={'/community/'+group.groupID}  className='gcard_overlay flex-ctr'>
                        <h4>{group.group_name}</h4>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default memo(MyGroupsList)

const GET_MY_GROUPS = gql`
    query ($uid: Int!){
        get_groups(userID: $uid){
            group_name
            groupID
        }
    }
`