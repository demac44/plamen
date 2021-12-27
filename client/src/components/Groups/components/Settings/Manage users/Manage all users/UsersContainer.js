import React, { useEffect, useState } from 'react'
import MemberBoxMNG from './MemberBoxMNG'

const UsersContainer = ({members, refetch, currentUserRole}) => {
    const [list, setList] = useState([...members])
    const [query, setQuery] = useState('')


    useEffect(()=>{
        setList(filterUsers(members, query))
    }, [query, members])

    return (
        <div className='box'>
            <input 
                type='text' 
                className='input' 
                placeholder='Search community members'
                style={styles.input}
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />

            {list.map(member => <MemberBoxMNG 
                                        member={member} 
                                        key={member.userID}
                                        refetch={refetch}
                                        currentUserRole={currentUserRole}
                                    />)}
        </div>
    )
}

export default UsersContainer

const filterUsers = (data, query) => {
    return data.filter((user)=> {
        const str1 = user.first_name+user.last_name+user.username
        const str2 = user.first_name+user.username+user.last_name

        const str3 = user.last_name+user.username+user.first_name
        const str4 = user.last_name+user.first_name+user.username

        const str5 = user.username+user.first_name+user.last_name
        const str6 = user.username+user.last_name+user.first_name

        const str = (str1+str2+str3+str4+str5+str6).toLowerCase()

        return str.includes(query) 
                || query.includes(user.last_name.toLowerCase()) 
                || query.includes(user.first_name.toLowerCase())
                || query.includes(user.username.toLowerCase())
            
    })
}

const styles = {
    input:{
        height:'35px',
        marginBottom:'10px',
        backgroundColor:'#1f1f1f',
        border:'1px solid #2f2f2f',
        color:'#aaa'
    }
}