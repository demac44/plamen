import React, { useState } from 'react'

import '../../App.css'
import '../../General.css'

import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'

const REPORT_POST = gql`
    mutation ($postID:Int!, $userPostedID:Int!, $userReportedID:Int!, $reasons: String!){
        post_report(postID: $postID, userPostedID: $userPostedID, userReportedID: $userReportedID, reasons: $reasons){
            postID
        }
    }
` 

const ReportBox = ({userID, postID, callback}) => {
    const ls = JSON.parse(localStorage.getItem('user'))
    const [report_post] = useMutation(REPORT_POST)
    const [reportSent, setReportSent] = useState(false)


    const getFields = (e) => {
        let reasons = ''
        const t = e.target
        let opt1 = t.opt1.checked ? t.opt1.value : ''
        let opt2 = t.opt2.checked ? t.opt2.value : ''
        let opt3 = t.opt3.checked ? t.opt3.value : ''
        let opt4 = t.opt4.checked ? t.opt4.value : ''
        let opt5 = t.opt5.checked ? t.opt5.value : ''
        let opt6 = t.opt6.checked ? t.opt6.value : ''
        let opt7 = t.opt7.checked ? t.opt7.value : ''
        let opt8 = t.opt8.checked ? t.opt8.value : ''
        let opt9 = t.opt9.checked ? t.opt9.value : ''
        let opt10 = t.opt10.checked ? t.opt10.value : ''
        let opt11 = t.opt11.checked ? t.opt11.value : ''

        const arr = [opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10,opt11]

        arr.map(r => {
            r.length > 1 && (reasons+=r+'\n')
        })

        return reasons
    }

    const handleReport = (e) => {
        e.preventDefault()

        const reasons = getFields(e)

        report_post({
            variables:{
                postID,
                userPostedID: userID,
                userReportedID: ls.userID,
                reasons: reasons
            }
        }).then(()=>{
            setReportSent(true)
            setTimeout(()=>{
                callback(false)
            }, 1000)
        })
    }



    return (
        <div className='report-overlay flex-col-ctr'>
            <h3>Report post
                <i className='fas fa-times' style={styles.exitBtn} onClick={()=>callback(false)}></i>     
            </h3>
            {reportSent && <h3>Your report has been sent!</h3>}
            <p>Please specify reasons for reporting this post:</p>
            <form className='report-form' onSubmit={handleReport}>
                <input type='checkbox' id='opt1' value='Spam'/>
                <label htmlFor='opt2'>Spam</label>
                <br/>
                <input type='checkbox' id='opt2' value='Nudity or sexual activity'/>
                <label htmlFor='opt2'>Nudity or sexual activity</label>
                <br/>
                <input type='checkbox' id='opt3' value='False information'/>
                <label htmlFor='opt2'>Spreading false information</label>
                <br/>
                <input type='checkbox' id='opt4' value='Racism or discrimination'/>
                <label htmlFor='opt1'>Racism or discrimination</label>
                <br/>
                <input type='checkbox' id='opt5' value='Bullying or harassment'/>
                <label htmlFor='opt1'>Bullying or harassment</label>
                <br/>
                <input type='checkbox' id='opt6' value='Hate speech, violence, or threats'/>
                <label htmlFor='opt2'>Hate speech, violence, or threats</label>
                <br/>
                <input type='checkbox' id='opt7' value='Contains illegal content or activity'/>
                <label htmlFor='opt2'>Contains illegal content or activity</label>
                <br/>
                <input type='checkbox' id='opt8' value='Violation of privacy'/>
                <label htmlFor='opt2'>Violation of privacy</label>
                <br/>
                <input type='checkbox' id='opt9' value='Supporting or promoting dangerous organizations or groups'/>
                <label htmlFor='opt2'>Supporting or promoting dangerous organizations or groups</label>
                <br/>
                <input type='checkbox' id='opt10' value='Scam or fraud'/>
                <label htmlFor='opt2'>Scam or fraud</label>
                <br/>
                <input type='checkbox' id='opt11' value='Suicide or self-injury'/>
                <label htmlFor='opt2'>Suicide or self-injury</label>
                <br/>
                <button className='submit-report btn'>SUBMIT REPORT</button>
            </form>
        </div>
    )
}

export default ReportBox

const styles = {
    exitBtn:{
        position:'absolute',
        top:'10px',
        right:'10px',
        color:'white',
        fontSize:'25px',
        cursor:'pointer'
    }
}