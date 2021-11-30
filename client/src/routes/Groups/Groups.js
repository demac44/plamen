import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupsGrid from '../../components/Groups/components/GroupsGrid'

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
    const [updated, setUpdated] = useState(false)
    const ls = JSON.parse(localStorage.getItem('user'))

    const {data, loading} = useQuery(GET_GROUPS, {
        variables:{
            uid: ls.userID
        }
    })

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])

    if(loading) return <p>loading</p>

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <GroupsGrid groups={data?.get_groups}/>
                </div>
            </div>
        </>
    )
}

export default Groups
