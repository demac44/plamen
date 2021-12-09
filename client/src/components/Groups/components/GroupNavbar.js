import React from 'react'
import { NavLink } from 'react-router-dom'

const GroupNavbar = ({chat, groupid}) => {



    return (
        <div className='group-navbar' style={chat && styles.nav}>
            <ul className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to={'/community/'+groupid}>
                    <li>
                        <i style={{color:'darkgreen'}} className="fas fa-newspaper"></i>
                    </li>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/saved'}>
                    <li>
                        <i style={{color:'#ffbb00'}} className="fas fa-bookmark"></i>
                    </li>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/info'}>
                    <li>
                        <i style={{color:'teal'}} className="fas fa-info"></i>
                    </li>
                </NavLink>
                <NavLink exact to={'/community/'+groupid+'/settings'}>
                    <li>
                        <i style={{color:'silver'}} className="fas fa-user-cog"></i>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default GroupNavbar

const styles = {
    nav:{
        position:'fixed',
        top:'-60px',
    }
}