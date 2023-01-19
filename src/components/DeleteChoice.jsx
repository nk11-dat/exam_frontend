import React, {useEffect, useState} from "react";
import apiFacade from "../apiFacade.js";
import {NavLink} from "react-router-dom";

function DeleteChoice({fetchAllTalks}) {

    return (
        <div className="column middle" onClick={() => fetchAllTalks()}>
            <h2>Where do you wanna go?</h2>
                <NavLink to={"DeleteChoice/DeleteTalk"}>Delete Talk</NavLink>
        </div>
    )

}

export default DeleteChoice;