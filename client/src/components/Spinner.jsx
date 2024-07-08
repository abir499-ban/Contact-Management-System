import React from 'react'

const Spinner = ({splash = '...Loading'}) => {
    return (
        <div class="spinner-border" role="status" style={{width:"80px", height:"80px"}}>
            <span class="sr-only">{splash}</span>
        </div>
    )
}

export default Spinner