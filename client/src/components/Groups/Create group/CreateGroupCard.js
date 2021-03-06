import React, { useCallback, useState } from 'react'
import CreateGroupForm from './CreateGroupForm'

const CreateGroupCard = () => {
    const [createGroup, setCreateGroup] = useState(false)

    const closeFormCallback = useCallback(()=>{
        setCreateGroup(false)
    }, [setCreateGroup])

    return (
        <>
        <div className='group-card flex-ctr' 
            style={{backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}}
            onClick={()=>setCreateGroup(true)}
        >
            <div className='gcard_overlay flex-ctr'>
                <i className='fas fa-plus' style={{fontSize:'25px', color:'white'}}/>
            </div>
        </div>
        {createGroup && <CreateGroupForm closeFormCallback={closeFormCallback}/>}
        </>
    )
}

export default CreateGroupCard
