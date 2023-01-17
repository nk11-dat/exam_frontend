import React from 'react';
import {Link} from "react-router-dom";

function AccessDenied(props) {
    return (
        <>
            <h4 className='column middle'>Please login before trying to use our service. <Link
                to={"/login"}>Login</Link></h4>
        </>
    );
}

export default AccessDenied;