import React, { useCallback, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Navbar from '../../components/Navbar/Navbar'
import GroupsGrid from '../../components/Groups/components/GroupsGrid'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'
import '../../components/Groups/groups.css'

const GET_GROUPS = gql`
query ($uid: Int!){
    get_groups(userID: $uid){
        group_name
            groupID
        }
    }
    `
    
const Groups = () => {
    const [leftnav, setLeftnav] = useState(false)
    const uid = useSelector(state => state.isAuth.user?.userID)

    const {data, loading} = useQuery(GET_GROUPS, {
        variables:{
            uid
        }
    })

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    return (
        <>
            <Navbar callback={leftNavCallback}/>
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar show={leftnav}/>
                <div className='container-main'>
                    {!loading && <GroupsGrid groups={data?.get_groups}/>}
                </div>
            </div>
        </>
    )
}

export default memo(Groups)
