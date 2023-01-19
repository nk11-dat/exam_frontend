import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import facade from "../apiFacade.js";
import Select from "react-select/base";

function CreateConference({postConference, setNewConference, newConference}) {

    const makeSelector = useRef();

    // const handleImage = (e) => {
    //     setBoat(prevBoat => ({
    //         ...prevBoat, image: e.target.value
    //     }));
    //     console.log(boat);
    //     //e.target.id: e.target.value
    // };

    const [mDate, setMDate] = useState({"year": new Date().getFullYear(), "month": new Date().getMonth(), "day":new Date().getDay()});
    const onDateChange = (e) => {
        // console.log(e.target.value)
        setNewConference(prev => ({
            ...prev, strDate: e.target.value
        }))
        console.log(newConference);

        //TODO: uncomment this if you get Date working on the backend...
        // const dateArr = e.target.value.split("-");
        // setMDate({"year": dateArr[0], "month": dateArr[1], "day":dateArr[2]})
        // console.log(mDate);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postConference()
        console.log(newConference);
        console.log("Conference created!...")
    };
    
    //{
    //   "conferenceName": "http",
    //   "location": "http 11",
    //   "capacity": 55,
    //   "strDate": "2025-01-19",
    //   "talks": []
    // }

    return (
        <div className="column middle">
            <h1>Create Boat</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Conference Name
                    <input className={"form-control"} id={"conferenceName"} name={"conferenceName"} type={"text"} placeholder={"Conference name..."}
                           onChange={(e) => {
                               setNewConference(prev => ({...prev, conferenceName: e.target.value}))
                               console.log(newConference);
                           }} required={true}/>
                </label>
                <label>
                    Location
                    <input className={"form-control"} id={"Location"} name={"Location"} type={"text"} placeholder={"Location..."}
                           onChange={(e) => {
                               setNewConference(prev => ({...prev, location: e.target.value}))
                               console.log(newConference);
                           }} required={true}/>
                </label>
                <label>
                    Capacity
                    <input className={"form-control"} id={"capacity"} name={"capacity"} type={"number"} placeholder={"capacity..."} min={0}
                           onChange={(e) => {
                               setNewConference(prev => ({...prev, capacity: e.target.value}))
                               console.log(newConference);
                           }} required={true}/>
                </label>
                <label>
                    Date
                    <input className={"form-control"} style={{borderRadius: "5px"}} type="date" id="start" name="trip-start"
                           min={new Date().toISOString().split("T")[0]} max="2030-12-31" onChange={onDateChange} required={true}/>
                </label>
                {/*<select id="make" name="make" ref={makeSelector} onChange={handleMake}></select>*/}
                {/*<input id={"image"} name={"image"} type={"text"} placeholder={"Image Link"} onChange={handleImage}/>*/}

                <button onClick={handleSubmit} type="submit">Create</button>
            </form>

            {/*{boat.boatId ? <><h3>new boat info</h3>*/}
            {/*<p>boatId: {boat.boatId}, brand: {boat.brand}, make: {boat.make}, image: {boat.image}</p></> : ""}*/}
        </div>
    );
}

export default CreateConference;

// CardList.prototype = {
//     onClickHandler: PropTypes.func.isRequired,
//     onChangeHandler: PropTypes.func.isRequired
// }