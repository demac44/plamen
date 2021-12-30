import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Avatar from '../../General components/Avatar'

const ProfilePfp = ({length, blockedUser, pfp, openStory}) => {
    return (
        <>
            <div style={{border: (length>0 && !blockedUser) && '3px solid #ffbb00', 
                        borderRadius:'50%', 
                        position:'relative'}} 
                        onClick={()=>{(length>0 && !blockedUser) && openStory(true)
            }}>

            <Avatar size='170px' image={pfp} profile={true}/>


            </div>
            {/* <FontAwesomeIcon icon='camera' style={styles.camera} onClick={()=>console.log('afas')}/> */}
        </>
    )
}

export default ProfilePfp


const styles = {
    camera:{
        position:'absolute',
        right:'0',
        bottom:'20px',
        fontSize:'20px',
        color:'white',

    }
}