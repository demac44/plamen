import React, { useCallback, useState, memo } from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import OpenMedia from './OpenMedia'


const GET_CHAT_MEDIA = gql`
    query($chatID: Int!){
        get_chat_media(chatID: $chatID){
            url
            userID
            msgID
            type
        }
    }
`

const AllChatMedia = ({chatID, closeAllMediaCallback}) => {
    const [url, setUrl] = useState(null)

    const closeMediaCallback = useCallback(()=>{
        setUrl(null)
    }, [setUrl])

    const {data, loading} = useQuery(GET_CHAT_MEDIA, {
        variables:{
            chatID: parseInt(chatID)
        }
    })

    if(loading) return <p>loading</p>

    return (
        <>
        <div className='chat-all-media-container'>
            <div style={styles.title}>
                <h3>All chat media</h3>
                <i 
                    style={{fontSize:'25px', cursor:'pointer'}} 
                    className='fas fa-times'
                    onClick={()=>closeAllMediaCallback()}
                ></i>
            </div>

            {data.get_chat_media.length===0 && <p style={{color:'whitesmoke', textAlign:'center', marginTop:'30px'}}>No chat media</p>}

            <div className='chat-all-media-box'>
                {data.get_chat_media.map(media => <div
                        key={media.msgID}
                        className='chat-media-card flex-ctr'
                        onClick={()=>{setUrl(media.url)}}
                    ><img src={media.url} alt=''/></div>)}
            </div>

        </div>
        {url && <OpenMedia url={url} callback={closeMediaCallback}/>}
        </>
    )
}

export default memo(AllChatMedia)


const styles = {
    title:{
        width:'100%',
        color:'white',
        padding:'10px 30px',
        display:'flex',
        justifyContent:'space-between',
    }
}