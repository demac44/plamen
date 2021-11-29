import React, { useCallback, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LeftNavbar from '../../components/UI/LeftNavbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import GroupsGrid from '../../components/Groups/components/GroupsGrid'



const Groups = ({isLogged}) => {
    const [leftnav, setLeftnav] = useState(false)
    const [updated, setUpdated] = useState(false)

    const leftNavCallback = useCallback(val =>{
        setLeftnav(val)
    }, [setLeftnav])

    const updatedCallback = useCallback(val => {
        setUpdated(val)
    }, [setUpdated])

    return (
        <>
            <Navbar callback={leftNavCallback} isLogged={isLogged}/>
            <div className='wrapper'>
                <div className='main'>
                    <LeftNavbar show={leftnav}/>
                    <GroupsGrid/>
                </div>
            </div>
        </>
    )
}

export default Groups
