import React, { useEffect, useState } from 'react'

const ProfileInfo = ({info}) => {  
    return (
        <>
            <div className="pf-info">
                <h4 className="pf-name">{info.user.first_name+' '+info.user.last_name}</h4>    
                <h5 className="pf-tagname">@{info.user.username}</h5>
                <div className="pf-stats">
                    <div>
                        <h6>Following</h6>
                        <p>{info.following.length}</p>
                    </div>
                    <div>
                        <h6>Followers</h6>
                        <p>{info.followers.length}</p>
                    </div>
                    <div>
                        <h6>Posts</h6>
                        <p>{info.count}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo
