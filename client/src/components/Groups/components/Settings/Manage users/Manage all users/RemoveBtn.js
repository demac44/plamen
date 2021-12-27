import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RemoveBtn = () => {
    return (
        <p style={styles.removeBtn}><FontAwesomeIcon icon='times'/></p>
    )
}

export default RemoveBtn

const styles = {
    removeBtn:{
        fontSize:'12px',
        border:'1px solid #2f2f2f',
        padding:'2px 5px',
        borderRadius:'10px'
    }
}