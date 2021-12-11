import React from 'react'

const SideInfoBox = ({myprofile}) => {
    return (
        <div className='profile-side-info-box'>
           <span className='flex-sb' style={styles.title}>
               <h3>User information</h3>
               {myprofile && <p style={styles.editBtn}>Edit</p>}
            </span>

           <div className='flex-sb'>
                <span className='flex-h'>
                    <i class="fas fa-briefcase"></i> 
                    <h4>Works at</h4>
                    <p>Job</p>
                </span>
           </div>

           <div className='flex-sb'>
                <span className='flex-h'>
                    <i class="fas fa-university"></i> 
                    <h4>University</h4>
                    <p>Amman Arab Univeristy</p>
                </span>
           </div>

           <div className='flex-sb'>
                <span className='flex-h'>
                    <i style={{fontSize:'14px'}} class="fas fa-school"></i>
                    <h4>High school</h4>
                    <p>Druga Gimnazija Sarajevo</p>
                </span>
           </div>

           <div className='flex-sb'>
                <span className='flex-h'>
                    <i class="fas fa-birthday-cake"></i>
                    <h4>Birthday</h4>
                    <p style={{marginLeft:'10px'}}>August 10th</p>
                    <p style={{fontSize:'12px'}}>21yrs</p>
                </span>
           </div>

           <div className='flex-sb'>
                <span className='flex-h'>
                    <i class="fas fa-mobile-alt"></i>
                    <h4>Phone</h4>
                    <p style={{marginLeft:'10px'}}>+387 61 955 906</p>
                </span>
           </div>

           <br/>

           <span style={styles.joined}><p>Joined in Dec 2021</p></span>
        </div>
    )
}

export default SideInfoBox


const styles = {
    title:{
        padding:'5px'
    },
    joined:{
        width:'100%',
        textAlign:'center'
    },
    editBtn:{
        padding:'5px 15px',
        backgroundColor:'#2f2f2f',
        borderRadius:'10px',
        fontSize:'14px',
        cursor:'pointer'
    }
}