import React, { useCallback, useState, memo } from 'react'

import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import OpenMedia from './OpenMedia'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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

    return (
        <>
        <div className='container-all-chat-media overlay'>
            <div style={styles.title} className='flex-sb '>
                <h3>All chat media</h3>
                <FontAwesomeIcon
                    icon='times' 
                    style={{fontSize:'25px', cursor:'pointer'}} 
                    className='fas fa-times'
                    onClick={()=>closeAllMediaCallback()}
                />
            </div>

            {loading ? <div style={{width:'100%', height:'200px'}} className='flex-ctr'><div className='small-spinner'></div></div>
            : data.get_chat_media.length===0 && <p style={{color:'whitesmoke', textAlign:'center', marginTop:'30px'}}>No chat media</p>}

            <div className='chat-all-media-box'>
                {!loading && data.get_chat_media.map(media => <div
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
        padding:'10px 20px',
    }
}