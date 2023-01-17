import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import apiFacade from "./apiFacade.js";
import Header from "./components/start_components/Header.jsx";
import SideBar from "./components/start_components/SideBar.jsx";
import WelcomePage from "./components/start_components/WelcomePage.jsx";
import LogIn from "./components/start_components/LogIn.jsx";
import SignUp from "./components/start_components/SignUp.jsx";
import AccessDenied from "./components/start_components/AccessDenied.jsx";
import AllOwners from "./components/AllOwners.jsx";

function App() {
    //useStates her
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('It just works! ~Todd Howard');
    const [searchInput, setSearchInput] = useState("")
    const [allOwners, setAllOwners] = useState({"results": []})

    const fetchAllOwners = () => {
        apiFacade.fetchData("user/all", (data) => {
            // console.log(data);
            setAllOwners(data)
        }, setErrorMessage)
    }

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
        setErrorMessage('Logged out.')
    }


    return (
        <BrowserRouter>

            <div className="row">
                <Header loggedIn={loggedIn} logout={logout}/>
                <SideBar loggedIn={loggedIn} fetchAllOwners={fetchAllOwners} fetchAllHarbours={fetchAllHarbours} fetchAllBoats={fetchAllBoats} setOwnersByBoat={setOwnersByBoat}/>

                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="AllOwners" element={facade.hasUserAccess('owner', loggedIn) ? <AllOwners dataFromServer={allOwners}/> : <AccessDenied/>}/>


                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="login" element={<LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                                                        setErrorMessage={setErrorMessage} logout={logout}/>}/>
                    <Route
                        path="*"
                        element={
                            <main style={{padding: "1rem"}}>
                                <p>There's nothing here!</p>
                            </main>}/>
                </Routes>
                <Alert className="footer" >Status: {errorMessage}</Alert>
            </div>
            {/*<Footer/>*/}

        </BrowserRouter>
    );
}

export default App;