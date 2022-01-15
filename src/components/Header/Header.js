import React from 'react'
import AppBar from 'material-ui/AppBar';

function Header({title}) {
    return (
        <div>
             <AppBar
                title={title}  
                className="appbar"
                zDepth={2}
            />
        </div>
    )
}

export default Header
