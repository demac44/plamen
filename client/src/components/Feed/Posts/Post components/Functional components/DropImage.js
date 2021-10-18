import React, { useState } from 'react'
import Dropzone from 'react-simple-dropzone/dist';

const DropImage = () => {
    const [image, setImage] = useState(null);

    const handleSubmit = () => {
        console.log('submit');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Dropzone onSuccessBlob={ (img) => setImage(img) } />
        </form>
    )
}

export default DropImage

