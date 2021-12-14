import React from 'react'

import UserBox from './Users list/UserBox'

const UserSuggestionsBox = () => {
    const user_suggestions = JSON.parse(localStorage.getItem('user-suggestions'))


    return (
        <>
            <h4 style={styles.title}>Suggestions</h4>  
            <div style={styles.box}>
                {user_suggestions.map(user => <UserBox user={user}/>)}
            </div>
        </>
    )
}

export default UserSuggestionsBox


const styles = {
    box:{
        width:'100%',
        border:'1px solid #2f2f2f',
        borderRadius:'0 0 10px 10px',
        borderTop:'none',
        overflow:'auto',
        maxHeight:'60vh',
    },
    title:{
        width:'100%',
        padding:'5px',
        color:'white',
        textAlign:'center',
        backgroundColor:'#1b1b1b',
        zIndex:'11',
        border:'1px solid #2f2f2f',
        borderRadius:'10px 10px 0 0',
        borderBottom:'none',
        marginTop:'10px'
    }
}