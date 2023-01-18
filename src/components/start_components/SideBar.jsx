import React from 'react';
import {NavLink, Link} from "react-router-dom";
import apiFacade from "../../apiFacade.js";


function SideBar(props) {

    return (
        <div className="column side">
            {/*User navigation sidebar*/}
            {apiFacade.hasUserAccess('user', props.loggedIn) ?
                <nav>
                    <br/>
                    <div>
                        <NavLink to="/US1">US1</NavLink>
                    </div>
                    <br/>
                    <div> {/*onClick={() => props.fetchAllHarbours()}*/}
                        <NavLink to="/AllHarbours">US2</NavLink>
                    </div>
                    <br/>
                    <div>
                        <NavLink to="/OwnersByBoat">US3</NavLink>
                    </div>

                </nav> : ""}

            {/*Admin navigation sidebar*/}
            {apiFacade.hasUserAccess('admin', props.loggedIn) ?
                <nav>
                    <br/>
                    <div>
                        <NavLink to="/CreateBoat">Hey Admin</NavLink>
                    </div>
                    {/*<br/>*/}
                    {/*<div>*/}
                    {/*    <NavLink to="/AllHarbours">US5</NavLink>*/}
                    {/*</div>*/}
                    <br/>
                    <div onClick={() => {
                        // props.fetchAllBoats()
                        // props.fetchAllOwners()
                        // props.fetchAllHarbours()
                    }}>
                        <NavLink to="/EditBoat">US6</NavLink>
                    </div>
                    <br/>
                    <div>
                        <NavLink to="/DeleteBoat">US7</NavLink>
                    </div>

                </nav> : ""}
        </div>
    );
}

export default SideBar;