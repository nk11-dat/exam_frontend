import React, {useState} from 'react';
import facade from "../../apiFacade.js";
import {useNavigate} from "react-router-dom";

function SignUp(props) {

    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');
    const [signedUp, setSignedUp] = useState(false)

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handleUserPass = (e) => {
        setUserPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        facade.createUser(userName, userPass)
        setSignedUp(!signedUp)
        console.log("You are signed up now")
    };



    return (
        <div className="column middle" style={{paddingLeft: 40}}>
            <div>
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input className="inputLogin" required type="text" placeholder="Username" name="userName" onChange={handleUserName}/>
                <br/>
                <input className="inputLogin" required type="text" placeholder="Password" name="userPass" onChange={handleUserPass}/>
                <br/><br/>
                <button onClick={handleSubmit} type="submit">Sign Up</button>
            </form>
            <div>
                {signedUp ? (
                        <h5>You are signed up now</h5>
                    ) : ""}

            </div>
        </div>
    );
}

export default SignUp;