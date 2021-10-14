import React from 'react'

const Navbar = () => {
    return (
        <div>
        <div class="top-navbar flex-ctr">
            <div class="tn-left flex-ctr wh-100">
                <h1 style="color: #4d2aad;">SoMeApp<span style="color: white;">.com</span></h1>
            </div>


            <div class="tn-center flex-ctr wh-100">
                <div class="search-icon"><i class="fas fa-search"></i></div>
                <input type="text" class="tn-search-input" placeholder='Search'/>
            </div>

            
            <div class="tn-right flex-ctr wh-100">
                <div class="tn-dropdown-menu">
                    <ul>
                        <a href="profile.html"><li>My profile</li></a>
                        <a href="#"><li>Change accounts</li></a>
                        <a href="#"><li>Settings</li></a>
                        <a href="#"><li>Log out</li></a>
                    </ul>
                </div>
                <div class="tn-np-btn flex-ctr">
                    <a href="/index.html"><i class="fas fa-home"></i></a>
                    <a href="#"><i class="fas fa-plus"></i></a>
                </div>
                <div class="tn-avatar">
                    <img src="../images/pfp.png" alt="avatar" class="avatar-img"/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar
