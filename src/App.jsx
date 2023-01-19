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
import AllConferences from "./components/AllConferences.jsx";
import CreateConference from "./components/CreateConference.jsx";
import DeleteTalk from "./components/DeleteTalk";
import DeleteChoice from "./components/DeleteChoice.jsx";

function App() {
    //useStates her
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('It just works! ~Todd Howard');
    const [searchInput, setSearchInput] = useState("")
    const [allConferences, setAllConferences] = useState([{}])
    const [allTalks, setAllTalks] = useState([{}])
    const [newConference, setNewConference] = useState({})

    const fetchAllConferences = () => {
        apiFacade.fetchData("user/all/conferences", (data) => {
            console.log(data);
            setAllConferences(data)
        }, setErrorMessage)
    }

    const fetchAllTalks = () => {
        apiFacade.fetchData("admin/all/talks", (data) => {
            console.log(data);
            setAllTalks(data)
        }, setErrorMessage)
    }

    const postConference = () => {
        apiFacade.postData("admin/post/conference", (data) => {
            console.log(data)
            setNewConference(data)
        }, setErrorMessage, newConference)
        console.log(newConference);
    }

    const deleteTalk = async (talkId) => { //Wait for deletion before updating all Boats
        await apiFacade.deleteData("admin/delete/talk/" + talkId, (data) => {
            console.log(data)
        }, setErrorMessage)
        fetchAllTalks() //refresh all boats
    }

    const logout = () => {
        apiFacade.logout()
        setLoggedIn(false)
        setErrorMessage('Logged out.')
    }


    return (
        <BrowserRouter>

            <div className="row">
                <Header loggedIn={loggedIn} logout={logout}/>
                <SideBar loggedIn={loggedIn} fetchAllConferences={fetchAllConferences} fetchAllTalks={fetchAllTalks}/>

                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="AllConferences" element={apiFacade.hasUserAccess('speaker', loggedIn) ? <AllConferences dataFromServer={allConferences}/> : <AccessDenied/>}/>
                    <Route path="CreateConference" element={apiFacade.hasUserAccess('admin', loggedIn) ? <CreateConference postConference={postConference} newConference={newConference} setNewConference={setNewConference}/> : <AccessDenied/>}/>
                    {/*<Route path="DeleteChoice" element={apiFacade.hasUserAccess('admin', loggedIn) ? <DeleteChoice fetchAllTalks={fetchAllTalks}/> : <AccessDenied/>}>*/}
                        <Route path="DeleteTalk" element={apiFacade.hasUserAccess('admin', loggedIn) ? <DeleteTalk dataFromServer={allTalks} onDelete={deleteTalk}/> : <AccessDenied/>}/>
                        {/*More deletion stuff goes here...*/}
                    {/*</Route>*/}



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