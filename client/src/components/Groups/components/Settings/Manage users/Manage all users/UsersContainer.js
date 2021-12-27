import React from 'react'
import MemberBoxMNG from './MemberBoxMNG'

const UsersContainer = ({members, refetch, currentUserRole}) => {
    return (
        <div className='box'>
            {members.map(member => <MemberBoxMNG 
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
    if(query.length <= 0) return []
    return data.get_users.filter((user)=> {
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
