import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import SendMsg from '../Functional components/SendMsg'
import Message from './Message'


import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import ChatBar from './ChatBar'
import MsgsLoader from '../../UI/Loaders/MsgsLoader'
import Loader from '../../UI/Loaders/Loader'

const GET_MESSAGES = gql`
    query ($chatID: Int!, $limit: Int, $offset: Int){
        get_messages (chatID: $chatID, limit: $limit, offset: $offset){
            chatID
            msgID
            msg_text
            userID
            type
            url
            time_sent
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            chatID
            msgID
            msg_text
            userID
            url
            type
            time_sent
        }
    }
`
const SEEN = gql`
    mutation($cid: Int!, $rid: Int!){
        seen(chatID: $cid, receiver_id: $rid){
            chatID
        }
    }
`


const ChatMsgBox = ({chatid, info}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(true)
    const [seen] = useMutation(SEEN)
    const {data, loading, subscribeToMore, error, fetchMore} = useQuery(GET_MESSAGES, {
        variables: {
            chatID: parseInt(chatid),
            limit:50,
            offset:0
        },
    })

    const loaderCallback = useCallback(val => {
        setLoader(val)
    }, [setLoader])

    useLayoutEffect(()=>{ 
        const subscribeNewMessage = () => {
            return subscribeToMore && subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData.data.newMessage;
                    
                    if (newMsg?.chatID === parseInt(chatid)){
                    return Object.assign({}, prev, {
                        get_messages: [newMsg, ...prev.get_messages],
                        scroll: ()=>{
                            let box = document.querySelector('.chat-messages')
                            box.scrollHeight = 0
                            console.log(newMsg);
                        }
                    });
                }
            }});
        }
        subscribeNewMessage()
    }, [chatid, subscribeToMore])        
    
    
    useEffect(()=>{
        seen({
            variables:{
                cid: parseInt(chatid),
                rid: ls.userID
            }
        })
    }, [data, chatid, ls.userID, seen])


    const handleFetchMore = () => {
        fetchMore({
            variables:{
                offset:data?.get_messages?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if(fetchMoreResult?.get_messages?.length < 1) {
                    setFetchBtn(false)
                    return
                }
                return Object.assign({}, prev, {
                  get_messages: [...data?.get_messages, ...fetchMoreResult?.get_messages]
                });
            }
        })
    }
      
    if(error) console.log(error); 

    return (
        <div className='chat-msg-box'> 
        {loading ? <MsgsLoader/> :
        <>
            <ChatBar chatid={chatid} info={info}/>
            <div className='chat-messages'>
                {loader && <div className='flex-ctr' style={styles.loader}><Loader size='small'/></div>}
                {data?.get_messages.map(msg => <Message msg={msg} key={msg.msgID} loader={loader}/>)}
                {fetchBtn && <div style={styles.loadMore} onClick={handleFetchMore}>Load more</div>}
            </div>
            <SendMsg chatid={chatid} info={info} loaderCallback={loaderCallback}/> 
        </>}
        </div>
    )
}

export default ChatMsgBox  


const styles = {
    loader: {
        width:'20%',
        height:'100px',
        backgroundColor:'black',
        alignSelf:'flex-end',
        marginTop:'20px',
        zIndex:'1'
    },
    loadMore:{
        width:'100%',
        padding:'5px',
        backgroundColor:'#1f1f1f',
        textAlign:'center',
        cursor:'pointer',
        color:'white'
    }
}