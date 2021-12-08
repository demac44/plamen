import React from 'react'

const StoriesLoader = () => {
    const num = [1,1,1,1,1,1,1,1,1,1]

    return (
        <div className='container-stories'>
            <div className='inner-container-stories'>
                {num.map(()=>
                <div className='flex-col-ctr' key={Math.random()}>
                    <div style={styles.loadHead}></div>  
                    <div style={styles.nameBar}></div>        
                </div>)}
            </div>
        </div>
    )
}

export default StoriesLoader

const styles = {
    loadHead:{
        width:'70px',
        height:'70px',
        background:'linear-gradient(to bottom right, #6f6f6f, #2f2f2f)',
        marginLeft:'10px',
        borderRadius:'50%'
    },
    nameBar:{
        width:'70px',
        height:'8px',
        background:'linear-gradient(to bottom right, #6f6f6f, #2f2f2f)',
        marginTop:'8px',
        marginLeft:'10px',
        borderRadius:'5px'
    }
}