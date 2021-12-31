import React, { useState } from 'react'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';

const ReportBox = ({data, handleReportClose}) => {
    const uid = useSelector(state => state?.isAuth?.user?.userID)
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

        arr.map(r => (
            r.length > 1 && (reasons+=r+'\n')
        ))

        return reasons
    }

    const handleReport = (e) => {
        e.preventDefault()

        const reasons = getFields(e)

        report_post({
            variables:{
                postID: data.postID,
                groupID: data.groupID,
                reporterId: uid,
                reasons: reasons
            }
        }).then(()=>{
            setReportSent(true)
            setTimeout(()=>{
                handleReportClose(false)
            }, 1000)
        })
    }

    return (
        <div className='container-report flex-col-ctr'>
            <form className='report-form' onSubmit={handleReport}>
                <h3 className='report-box-title'>Report
                    <FontAwesomeIcon icon='times' className='exit-report-btn' onClick={()=>handleReportClose(false)}/>    
                </h3>
                {reportSent && <h4 className='report-box-title' style={{marginTop:'10px'}}>Your report has been sent!</h4>}
                <p className='report-box-title' style={{marginTop:'10px'}}>Please specify reasons for reporting this post:</p>
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
                <div className='wh-100 flex-ctr'><button className='btn report-submit-btn'>SUBMIT REPORT</button></div>
            </form>
        </div>
    )
}

export default ReportBox

const REPORT_POST = gql`
    mutation ($postID:Int!, $groupID:Int!, $reporterId:Int!, $reasons: String!){
        report_group_post (postID: $postID, reporterId: $reporterId, groupID: $groupID, reasons: $reasons){
            postID
        }
    }
` 