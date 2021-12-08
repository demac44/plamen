import React from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Link, NavLink } from 'react-router-dom'
 
import './General.css'

const MyGroupsList = () => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const {data, loading} = useQuery(GET_MY_GROUPS, {
        variables:{
            uid: ls.userID
        }
    })


    if(loading) return <p>loading</p>

    return (
        <div className='my-groups-box'>
            <div className='flex-sb' style={styles.descTitle}>
                <h2>My communities</h2>
                <Link to='/communities' style={styles.seeAllBtn}>See all</Link>
            </div>
            {data.get_groups.slice(0, 5).map(group=>
                <div style={{...styles.groupBox, backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}} key={group.groupID}>
                    <Link  to={'/community/'+group.groupID}  className='gcard_overlay flex-ctr'>
                        <h4>{group.group_name}</h4>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default MyGroupsList


const styles = {
    descTitle:{
        width:'100%',
        padding:'5px',
        color:'white',
        fontSize:'10px'
    },
    textBoxDesc:{
        width:'100%',
        height:'fit-content',
        backgroundColor:'white',
        padding:'5px',
        wordWrap:'break-word'
    },
    addInfoBtn:{
        width:'100%',
        padding:'10px',
        borderRadius:'10px',
        backgroundColor:'#2f2f2f',
        textAlign:'center',
        color:'white',
        cursor:'pointer'
    },
    seeAllBtn:{
        padding:'5px 10px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        color:'white'
    },
    groupBox:{
        width:'100%',
        height:'40px',
        borderRadius:'10px',
        textAlign:'center',
        color:'white',
        cursor:'pointer',
        marginTop:'10px',
        position:'relative'
    }
}


const GET_MY_GROUPS = gql`
    query ($uid: Int!){
        get_groups(userID: $uid){
            group_name
            groupID
        }
    }
`