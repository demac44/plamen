import React, { useState, useEffect } from 'react'
import './style.css'
import Linkify from 'react-linkify'
import parse from 'html-react-parser'
import axios from 'axios'
import { useMutation } from 'react-apollo'
import {gql} from 'graphql-tag'
import {useSelector} from 'react-redux'

const PostTextBar = ({post_text}) => {
    const [readMore, setReadMore] = useState(true)
    const [text, setText] = useState(null)

    useEffect(()=>{
        const func = async () => {
            return await findTag(post_text)
        }
        func().then(res => {
            if(res){
                setText(res)
            }        
        })
    }, [])

    return (
        <>
            {post_text.length > 0 &&
                <div className='post-text-bar'>
                    {post_text.length > 200 
                    ? 
                    (
                    <>
                        {readMore ? 
                        <Linkify><p>{post_text.slice(0,300)}
                            <span onClick={()=>setReadMore(false)} className='read-full-post'>. . . Read more</span>
                        </p></Linkify> : <Linkify><p>{post_text}</p></Linkify>}

                        <br/>

                        {!readMore && <p onClick={()=>setReadMore(true)} className='read-full-post'>Read less</p>}
                    </>
                    )
                    : <Linkify>{<p>{text ? parse(text) : post_text}</p>}</Linkify>
                    }
                </div>}
        </>
    )
}
export default PostTextBar

const findTag = async (post_text) => {
    if(post_text.includes('@')){
        let spaceIndex = null;
        let arr = post_text.split('')
        let pos = arr.indexOf('@')
        for(let i = pos;i<arr.length;i++){
            let c = arr[i]
            if(c===' ') {
                spaceIndex=i
                break
            } else if(i===arr.length-1){
                spaceIndex=i+1
                break
            } else if(i===arr.length){
                spaceIndex=-1
                break
            }
        }
        if(spaceIndex){
            let username = post_text.slice(pos+1, spaceIndex)
            const result = await axios.post('http://localhost:8000/graphql',{
                headers: {
                  'Content-Type': 'application/json'
                },
                    query: `query($username: String!){
                        get_tagged_user(username: $username){
                            username
                        }
                    }`,
                    variables:{
                        username: username,
                        userID: 9
                    }
            }).then(res=>{return res?.data?.data?.get_tagged_user})
            if(result){
                arr.splice(pos, 0, `<a href='/profile/${username}'>`)
                arr.splice(spaceIndex+1, 0, `</a>`)
                return arr.join('')
            } else return false
        } else return false
    } else return false
}