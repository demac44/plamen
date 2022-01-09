import React, {memo} from 'react'

import UserBox from './Users list/UserBox'

const UserSuggestionsBox = () => {
    const user_suggestions = JSON.parse(localStorage.getItem('user-suggestions'))
    return (
        <>
            {user_suggestions?.length > 0 &&
            <>
                <h4 className='user-sugg-box-title flex-ctr'>Suggestions</h4>  
                <div className='user-sugg-box box'>
                    {user_suggestions?.map(user => <UserBox user={user} key={user.userID}/>)}
                </div>
            </>}
        </>
    )
}

export default memo(UserSuggestionsBox)
