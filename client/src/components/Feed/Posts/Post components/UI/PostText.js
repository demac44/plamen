import React, {useEffect,useState} from 'react'

const PostText = ({post_text}) => {
    const [str, setStr] = useState([])


    useEffect(()=>{
        let arr = []
        for(let i=0;i<post_text.length;i++){
            arr.push(post_text[i])
        }
        setStr(arr)
    }, [post_text])


    return (
        <div className="post-text">
            {str.map(s => s==="\n" ? <br/> : <span>{s}</span> )}
        </div>
    )
}

export default PostText
