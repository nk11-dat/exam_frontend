import React from 'react';
import {NavLink, Link} from "react-router-dom";
import apiFacade from "../../apiFacade.js";


function SideBar(props) {

    return (
        <div className="column side">
            {/*User navigation sidebar*/}
            {apiFacade.hasUserAccess('speaker', props.loggedIn) ?
                <nav>
                    <br/>
                    <div onClick={() => props.fetchAllConferences()}>
                        <NavLink to="/AllConferences">All Conferences</NavLink>
                    </div>
                    <br/>
                    <div> {/*onClick={() => props.fetchAllHarbours()}*/}
                        <NavLink to="/">US2</NavLink>
                    </div>
                    <br/>
                    <div>
                        <NavLink to="/">US3</NavLink>
                    </div>

                </nav> : ""}

            {/*Admin navigation sidebar*/}
            {apiFacade.hasUserAccess('admin', props.loggedIn) ?
                <nav>
                    <br/>
                    <div onClick={() => {
                        props.fetchAllConferences()}
                    }>
                        <NavLink to="/CreateConference">CreateConference(US4)</NavLink>
                    </div>
                    {/*<br/>*/}
                    {/*<div>*/}
                    {/*    <NavLink to="/AllHarbours">US5</NavLink>*/}
                    {/*</div>*/}
                    <br/>
                    <div onClick={() => {
                        props.fetchAllTalks()
                        props.fetchAllConferences()
                        props.fetchAllSpeakers()
                    }}>
                        <NavLink to="/EditConference">US6</NavLink>
                    </div>
                    <br/>
                    <div onClick={() => props.fetchAllTalks()}>
                        <NavLink to="/DeleteTalk">US7</NavLink>
                    </div>

                </nav> : ""}
        </div>
    );
}

export default SideBar;