import React, { useEffect, useState } from 'react'
import Avatar from '../../../../UI/Avatar'
import SavePost from '../Functional components/SavePost'

import '../../../../../App.css'
import PostOptBtn from '../Functional components/PostOptBtn'
import { NavLink } from 'react-router-dom'

const InfoSave = ({date, postID, user}) => {


    const [time, setTime] = useState(null)

    useEffect(()=>{
        const getTime = () => {
            let utcSeconds = parseInt(date);
            let d = Date.now() - utcSeconds
            d = Math.floor((d/1000)/60)
            if(d===0) setTime('Now')
            else if(d<60) setTime(d+'m ago')
            else if(d>60 && d<60*24) setTime(Math.floor(d/60)+'h ago')
            else if(d>60*24 && d<60*24*30) setTime(Math.floor(d/(60*24))+'d ago')
            else if(d>60*24*30) {
                let d = new Date(utcSeconds)
                setTime(d.toDateString())
            }
        }
        getTime()
    }, [time, date])


    return (
        <div className="fp-info-save">
            <div className="fp-info">
                <NavLink exact to={'/profile/'+user.userID} style={{height:'100%'}}>
                    <Avatar height='100%' pfp={user.profile_picture}/>
                </NavLink>
                <div>
                    <p>{user.first_name+' '+user.last_name}</p>
                    <p style={{fontSize:'10px'}}>{time}</p>
                </div>
            </div>
            <div className="fp-like-save">
                <SavePost postID={postID}/>
                {user.currentUser && <PostOptBtn postID={postID}/>}
            </div>
        </div>
    )
}

export default InfoSave
