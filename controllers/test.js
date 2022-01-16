import express from "express";
import axios from 'axios'




const router = express.Router()



router.get('/', async (req, res)=>{
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMyLCJ1c2VybmFtZSI6ImRlbWFjMjIiLCJlbWFpbCI6ImRlbWlydW1lanIyQGdtYWlsLmNvbSIsImlhdCI6MTY0MjI1MjE1NX0.pqRM_1SmFb8BhYe2kxPcAiSsRdT8Up8Y-hfE-sLzB18"
    await axios({
        url: "http://localhost:8000/graphql",
        method:"post",
        data: {
        query: `query{random_posts(userID:32, limit:10, offset:0){ 
            postID
            userID
            post_text
            date_posted
            url
            username
            first_name
            last_name
            profile_picture
            limit
            offset
            type
          }}`
      },
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }).then(resp=>res.json(resp.data))
    .catch(err => console.log(err))

})

export default router


// "start": "env-cmd -f .env react-scripts --openssl-legacy-provider start",
