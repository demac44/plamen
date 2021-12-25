import React, {memo} from 'react'

import UserBox from './Users list/UserBox'

const UserSuggestionsBox = () => {
    const user_suggestions = JSON.parse(localStorage.getItem('user-suggestions'))
    return (
        <>
            <h4 style={styles.title}>Suggestions</h4>  
            <div style={styles.box}>
                {user_suggestions?.map(user => <UserBox user={user} key={user.userID}/>)}
            </div>
        </>
    )
}

export default memo(UserSuggestionsBox)


const styles = {
    box:{
        width:'100%',
        borderRadius:'0 0 10px 10px',
        border:'1px solid #2f2f2f',
        borderTop:'none',
        overflow:'auto',
        maxHeight:'60vh',
        padding:'10px 5px'
    },
    title:{
        width:'100%',
        padding:'5px',
        color:'white',
        textAlign:'center',
        backgroundColor:'#1b1b1b',
        zIndex:'11',
        borderRadius:'10px 10px 0 0',
        border:'1px solid #2f2f2f',
        borderBottom:'none',
        marginTop:'30px',
    }
}