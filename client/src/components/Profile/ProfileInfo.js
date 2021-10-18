import React, { useEffect, useState } from 'react'
import {gql} from 'graphql-tag'
import {useQuery} from 'react-apollo'



const ProfileInfo = ({user, count}) => {  
    return (
        <>
            <div className="pf-info">
                <h4 className="pf-name">{user.first_name+' '+user.last_name}</h4>    
                <h5 className="pf-tagname">@{user.username}</h5>
                <div className="pf-stats">
                    <div>
                        <h6>Following</h6>
                        <p>124</p>
                    </div>
                    <div>
                        <h6>Followers</h6>
                        <p>32871</p>
                    </div>
                    <div>
                        <h6>Posts</h6>
                        <p>{count}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo
