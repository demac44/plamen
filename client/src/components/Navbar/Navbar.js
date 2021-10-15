import React from 'react'

import '../../App.css'
import Avatar from '../UI/Avatar'

const Navbar = () => {
    return (
        <>
            <div className="top-navbar flex-ctr">
                <div className="tn-left flex-ctr wh-100">
                    <h1>SoMeApp<span>.com</span></h1>
                </div>


                <div className="tn-center flex-ctr wh-100">
                    <div className="search-icon"><i className="fas fa-search"></i></div>
                    <input type="text" className="tn-search-input" placeholder='Search'/>
                </div>

                
                <div className="tn-right flex-ctr wh-100">
                    <div className="tn-dropdown-menu">
                        <ul>
                            <a href="profile.html"><li>My profile</li></a>
                            <a href="#"><li>Change accounts</li></a>
                            <a href="#"><li>Settings</li></a>
                            <a href="#"><li>Log out</li></a>
                        </ul>
                    </div>
                    <div className="tn-np-btn flex-ctr">
                        <a href="/index.html"><i className="fas fa-home"></i></a>
                        <a href="#"><i className="fas fa-plus"></i></a>
                    </div>
                    <Avatar/>
                </div>
            </div>
        </>
    )
}

export default Navbar
