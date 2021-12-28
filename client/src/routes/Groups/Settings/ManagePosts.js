import React from 'react'
import AlternativeNavbar from '../../../components/General components/AlternativeNavbar'
import BannerLoader from '../../../components/General components/Loaders/BannerLoader'
import GroupBanner from '../../../components/Groups/components/GroupBanner'
import GroupNavbar from '../../../components/Groups/components/GroupNavbar'
import Navbar from '../../../components/Navbar/Navbar'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Link, Redirect, useParams } from 'react-router-dom'
import Sidebar from '../../../components/General components/Sidebar'
import SettingsMenu from '../../../components/Groups/components/Settings/SettingsMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReportedPost from '../../../components/Reported posts/ReportedPost'
import { useSelector } from 'react-redux'


const roles = ['ADMIN', 'CREATOR', 'MODERATOR']

const ManagePosts = ({isLogged}) => {
    const uid = useSelector(state => state.isAuth.user?.userID)
    const {groupid} = useParams()
    const {data, loading, refetch} = useQuery(GET_GROUP, {
        variables:{
            gid: parseInt(groupid),
            uid
        }
    })


    if(!loading){
        if(!(roles.includes(data?.get_group_user?.role))) return <Redirect to='/404'/>
    }

    return (
        <>
            <Navbar isLogged={isLogged}/> 
            <AlternativeNavbar/>
            <div className='wrapper'>
                <Sidebar/>
                <div className='container-profile'>
                    {loading ? <BannerLoader/> : <GroupBanner info={data?.get_group} user={data?.get_group_user}/>}
                    <GroupNavbar groupid={groupid} role={data?.get_group_user?.role}/>
                </div>
                {roles.includes(data?.get_group_user?.role) && <div className='container-main' style={{paddingTop:'20px'}}>
                        <div className='container-left'>

                            <div className='box flex-ctr'>
                                <Link to={'/community/'+groupid+'/settings'}>
                                    <FontAwesomeIcon icon='arrow-left' style={styles.arrowBack}/>
                                </Link>
                                <h3>Reported posts</h3>
                            </div>

                            <div className='container-posts'>
                                {data?.get_group_reported_posts.length > 0 
                                    ? data?.get_group_reported_posts?.map(post => <ReportedPost refetchPosts={refetch} post={post} key={post.postID}/>)
                                    : <p style={styles.noPosts}>No reported posts</p>}
                            </div>

                        </div>
                        <div className='container-right' style={{width:'35%'}}>
                            <SettingsMenu groupid={groupid}/>
                        </div>
                </div>}
            </div>
        </>
    )
}

export default ManagePosts

const GET_GROUP = gql`
    query($gid: Int!, $uid: Int!){
        get_group(groupID: $gid){
            groupID 
            group_name
            banner_image
            closed
        }
        get_group_user (groupID: $gid, userID: $uid){
            role
        }
        get_group_reported_posts (groupID: $gid){
            first_name
            last_name
            username
            userID
            profile_picture
            postID
            reasons
            post_text
            url
            reportID
            groupID
            date_posted
            date_reported
            type
        }
    }
`
const styles = {
    arrowBack:{
        position:'absolute',
        top:'13px',
        left:'15px',
        fontSize:'20px',
        cursor:'pointer',
        color:'white'
    },
    noPosts:{
        color:'white',
        textAlign:'center',
        marginTop:'100px'
    }
}