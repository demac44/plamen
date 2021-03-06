import React, { useCallback, useState, memo } from 'react'
import './style.css'
import {gql} from 'graphql-tag'
import { useQuery } from 'react-apollo'
import OpenMedia from './OpenMedia'

const AllChatMedia = ({closeAllMediaCallback, sender, receiver}) => {
    const [url, setUrl] = useState(null)

    const closeMediaCallback = useCallback(()=>{
        setUrl(null)
    }, [setUrl])

    const {data, loading} = useQuery(GET_CHAT_MEDIA, {
        variables:{
            sender,
            receiver
        }
    })

    return (
        <>
        <div className='container-all-chat-media overlay'>
            <div className='flex-sb title'>
                <h3>All chat media</h3>
                <i
                    className='fas fa-times' 
                    onClick={()=>closeAllMediaCallback()}
                />
            </div>

            {loading ? <div className='flex-ctr spinner-box'><div className='small-spinner'></div></div>
            : data.get_chat_media.length===0 && <p className='no-media'>No chat media</p>}

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


const GET_CHAT_MEDIA = gql`
    query($sender: String!, $receiver: String!){
        get_chat_media(sender: $sender, receiver: $receiver){
            url
            msgID
            type
        }
    }
`