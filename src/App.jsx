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
import EditConference from "./components/EditConference.jsx";
import EditTalk from "./components/EditTalk.jsx";
import TalksBySpeaker from "./components/TalksBySpeaker.jsx";

function App() {
    //useStates her
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('It just works! ~Todd Howard');
    const [specificConference, setSpecificConference] = useState("")
    const [allConferences, setAllConferences] = useState([{}])
    const [allTalks, setAllTalks] = useState([{}])
    const [allSpeakers, setAllSpeakers] = useState([{}])
    const [newConference, setNewConference] = useState({})
    const [newTalk, setNewTalk] = useState({})
    const [newSpeaker, setNewSpeaker] = useState({})
    const [editConference, setEditConference] = useState({})

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

    const fetchAllSpeakers = () => {
        apiFacade.fetchData("admin/all/speakers", (data) => {
            console.log(data);
            setAllSpeakers(data)
        }, setErrorMessage)
    }

    const fetchSpecificConference = (name) => {
        apiFacade.fetchData("admin/specific/conference/" + name, (data) => {
            console.log(data);
            setSpecificConference(data)
        }, setErrorMessage)
    }

    const fetchTalksBySpeaker = (name) => {
        apiFacade.fetchData("user/talksBySpeaker/" + name, (data) => {
            console.log(data);
            setAllTalks(data)
        }, setErrorMessage)
    }

    const postConference = async () => {
        await apiFacade.postData("admin/post/conference", (data) => {
            console.log(data)
            setNewConference(data)
        }, setErrorMessage, newConference)
        console.log(newConference);
    }

    const putTalk = () => {
        apiFacade.putData("admin/put/talk", (data) => {
            console.log(data)
            setNewTalk(data)
        }, setErrorMessage, newTalk)
        console.log(newTalk);
    }

    const postTalk = async () => {
        await apiFacade.postData("admin/post/talk", (data) => {
            console.log(data)
            setNewTalk(data)
        }, setErrorMessage, newTalk)
        console.log(newTalk);
    }

    const postSpeaker = async () => {
        await apiFacade.postData("admin/post/speaker", (data) => {
            console.log(data)
            setNewSpeaker(data)
        }, setErrorMessage, newSpeaker)
        console.log(newSpeaker);
    }


    const putConference = () => {
        apiFacade.putData("admin/put/conference", (data) => {
            console.log(data)
            setEditConference(data)
        }, setErrorMessage, editConference)
        console.log(editConference);
    }

    const deleteTalk = async (talkId) => { //Wait for deletion before updating allTalks
        await apiFacade.deleteData("admin/delete/talk/" + talkId, (data) => {
            console.log(data)
        }, setErrorMessage)
        fetchAllTalks() //refresh all talks
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
                <SideBar loggedIn={loggedIn} fetchAllConferences={fetchAllConferences} fetchAllTalks={fetchAllTalks} fetchAllSpeakers={fetchAllSpeakers}/>

                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="AllConferences" element={apiFacade.hasUserAccess('speaker', loggedIn) ? <AllConferences dataFromServer={allConferences}/> : <AccessDenied/>}/>
                    <Route path="TalksBySpeaker" element={apiFacade.hasUserAccess('speaker', loggedIn) ? <TalksBySpeaker dataFromServer={allTalks} fetchTalksBySpeaker={fetchTalksBySpeaker}/> : <AccessDenied/>}/>
                    <Route path="CreateConference" element={apiFacade.hasUserAccess('admin', loggedIn) ?
                        <CreateConference postConference={postConference} postTalk={postTalk} postSpeaker={postSpeaker} newSpeaker={newSpeaker} setNewSpeaker={setNewSpeaker} setNewTalk={setNewTalk} newTalk={newTalk} newConference={newConference} setNewConference={setNewConference} allConferences={allConferences}/> : <AccessDenied/>}/>
                    {/*<Route path="DeleteChoice" element={apiFacade.hasUserAccess('admin', loggedIn) ? <DeleteChoice fetchAllTalks={fetchAllTalks}/> : <AccessDenied/>}>*/}
                    <Route path="DeleteTalk" element={apiFacade.hasUserAccess('admin', loggedIn) ? <DeleteTalk dataFromServer={allTalks} onDelete={deleteTalk}/> : <AccessDenied/>}/>
                        {/*More deletion stuff goes here...*/}
                    {/*</Route>*/}
                    <Route path="EditTalk" element={apiFacade.hasUserAccess('admin', loggedIn) ? <EditTalk allConferences={allConferences} allTalks={allTalks} allSpeakers={allSpeakers} newTalk={newTalk} setNewTalk={setNewTalk} putTalk={putTalk}/> : <AccessDenied/>}/>
                    <Route path="EditConference" element={apiFacade.hasUserAccess('admin', loggedIn) ? <EditConference conferenceToEdit={editConference} setConferenceToEdit={setEditConference} putConference={putConference} allConferences={allConferences} allTalks={allTalks} allSpeakers={allSpeakers} fetchSpecificConference={fetchSpecificConference} specificConference={specificConference}/> : <AccessDenied/>}/>




                    {/*<Route path="/signUp" element={<SignUp/>}/>*/}
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