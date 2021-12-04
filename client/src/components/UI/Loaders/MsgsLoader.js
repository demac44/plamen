import React from 'react'

const MsgsLoader = () => {

    const arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

    return (
        <div style={{backgroundColor:'#3f3f3f', width:'100%', height:'100vh'}}>
            {arr.map(()=>
            <>
                <div className='msg-wrapper-cu'>
                    <div style={styles.msg} className='msg'></div>
                </div>
                <div className='msg-wrapper-ou'>
                    <div style={styles.msg} className='msg'></div>
                </div>
            </>
            )}
            <div style={styles.input}></div>
        </div>
    )
}

export default MsgsLoader


const styles ={
    input:{
        width:'100%',
        height:'50px',
        backgroundColor:'#1f1f1f',
        position:'absolute',
        bottom:'0'
    },
    msg:{
        backgroundColor:'#5f5f5f',
        width:'120px'
    }
}