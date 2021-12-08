import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupsGrid from '../../components/Groups/components/GroupsGrid'
import Sidebar from '../../components/General components/Sidebar'
import AlternativeNavbar from '../../components/General components/AlternativeNavbar'

const GET_GROUPS = gql`
    query ($uid: Int!){
        get_groups(userID: $uid){
            group_name
            groupID
        }
    }
`

const Groups = ({isLogged}) => {
    const [leftnav, setLeftnav] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user'))

    const {data, loading} = useQuery(GET_GROUPS, {
        variables:{
            uid: ls.userID
        }
    })

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    if(loading) return <p>loading</p>

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <AlternativeNavbar/>
            <div className='wrapper'>
                <div className='container-main'>
                    <Sidebar show={leftnav}/>
                    <GroupsGrid groups={data?.get_groups}/>
                </div>
            </div>
        </>
    )
}

export default Groups
