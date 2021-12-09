import React from 'react'
import { NavLink } from 'react-router-dom'

const AlternativeNavbar = ({chat}) => {
    return (
        <div className='alternative-navbar' style={chat && styles.nav}>
            <ul className='flex-sa' style={{width:'100%', height:'100%'}}>
                <NavLink exact to="/feed">
                    <li>
                        <i style={{color:'darkgreen'}} className="fas fa-newspaper"></i>
                    </li>
                </NavLink>
                <NavLink exact to='/explore'>
                <li>
                    <i style={{color:'#9933ff'}} className="fas fa-compass"></i>
                </li>
                </NavLink>
                <NavLink exact to='/saved'>
                    <li>
                        <i style={{color:'#ffbb00'}} className="fas fa-bookmark"></i>
                    </li>
                </NavLink>
                <NavLink exact to='/communities'>
                <li>
                    <i style={{color:'teal'}} className="fas fa-users"></i>
                </li>
                </NavLink>
                <NavLink exact to='/someapptube'>
                    <li>
                        <i style={{color:'darkred'}} className="fas fa-play"></i>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default AlternativeNavbar

const styles = {
    nav:{
        position:'fixed',
        top:'-60px',
    }
}