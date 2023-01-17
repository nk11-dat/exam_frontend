import React from 'react';
import {NavLink, Link} from "react-router-dom";
import facade from "../../apiFacade.js";


function SideBar(props) {

    return (
        <div className="column side">
            {/*User navigation sidebar*/}
            {facade.hasUserAccess('owner', props.loggedIn) ?
                <nav>
                    <br/>
                    <div onClick={() => props.fetchAllOwners()}>
                        <NavLink to="/AllOwners">All Owners</NavLink>
                    </div>
                    <br/>
                    <div onClick={() => props.fetchAllHarbours()}>
                        <NavLink to="/AllHarbours">US2</NavLink>
                    </div>
                    <br/>
                    <div onClick={() => props.setOwnersByBoat({})}>
                        <NavLink to="/OwnersByBoat">US3</NavLink>
                    </div>

                </nav> : ""}

            {/*Admin navigation sidebar*/}
            {facade.hasUserAccess('admin', props.loggedIn) ?
                <nav>
                    <br/>
                    <div>
                        <NavLink to="/CreateBoat">Create Boat</NavLink>
                    </div>
                    {/*<br/>*/}
                    {/*<div>*/}
                    {/*    <NavLink to="/AllHarbours">US5</NavLink>*/}
                    {/*</div>*/}
                    <br/>
                    <div onClick={() => {
                        props.fetchAllBoats()
                        props.fetchAllOwners()
                        props.fetchAllHarbours()
                    }}>
                        <NavLink to="/EditBoat">US6</NavLink>
                    </div>
                    <br/>
                    <div onClick={() => props.fetchAllBoats()}>
                        <NavLink to="/DeleteBoat">US7</NavLink>
                    </div>

                </nav> : ""}
        </div>
    );
}

export default SideBar;