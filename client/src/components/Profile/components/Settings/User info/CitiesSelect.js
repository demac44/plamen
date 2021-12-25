import React, { useEffect, useState } from 'react'

import { cities } from '../../../../../Assets/cities'

const CitiesSelect = ({country, setCityCB}) => {
    let i = 0;

    return (
        <select onChange={(e)=>setCityCB(e.target.value)}>
            {cities[`${country}`]?.map(city => <option value={city} key={i++}>{city}</option>)}
        </select>
    )
}

export default CitiesSelect
