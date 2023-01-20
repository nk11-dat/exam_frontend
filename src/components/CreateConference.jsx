import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import facade from "../apiFacade.js";

function CreateConference({postConference, setNewConference, newConference, postTalk, setNewTalk, newTalk, postSpeaker, newSpeaker, setNewSpeaker, allConferences}) {

    const makeSelector = useRef();

    const conferenceList = allConferences.length > 0 ? allConferences.map((conf) => {
        return {value: conf.conferenceName, label: conf.conferenceName}
    }) : [
        {value: 1, label: "Loading...1"},
        {value: 2, label: "Loading...2"},
        {value: 3, label: "Loading...3"},
    ];

    useEffect(() => {
        setNewSpeaker({})
        setNewTalk({})
        setNewConference({})
    },[])


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
        setNewConference({})
    };

    return (
        <div className="column middle">
            <h1>Create...</h1>
            <form onSubmit={handleSubmit}>
                <h2>Conference</h2>
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

            <form>
                <h2>Talk</h2>
                <label>
                    Conference Name
                    <Select
                        options={conferenceList}
                        placeholder="Select Conference"
                        // value={boatSelectValue}
                        onChange={(data) => {
                            setNewTalk(previous => ({
                                ...previous, conferenceConferenceName: data.value
                            }));
                            console.log(newTalk);
                        }}
                        isSearchable={false}
                        isMulti={false}
                        required={true}
                    />
                </label>
                <label>
                    Topic
                    <input className={"form-control"} id={"Topic"} name={"Topic"} type={"text"} placeholder={"Topic..."}
                           onChange={(e) => {
                               setNewTalk(prev => ({...prev, topic: e.target.value}))
                               console.log(newTalk);
                           }} required={true}/>
                </label>
                <label>
                    Duration
                    <input className={"form-control"} id={"Duration"} name={"Duration"} type={"number"} placeholder={"Duration..."} min={0}
                           onChange={(e) => {
                               setNewTalk(prev => ({...prev, duration: e.target.value}))
                               console.log(newTalk);
                           }} required={true}/>
                </label>
                <label>
                    Props "list"
                    <input className={"form-control"} id={"Props"} name={"Props"} type={"text"} placeholder={"Props..."}
                           onChange={(e) => {
                               setNewTalk(prev => ({...prev, propsList: e.target.value}))
                               console.log(newTalk);
                           }} required={true}/>
                </label>

                <button onClick={(e) => {
                    e.preventDefault();
                    postTalk()
                    console.log(newTalk);
                    setNewTalk({})
                }} type="submit">Create</button>
            </form>

            <form>
                <h2>Speaker</h2>
                <label>
                    Username
                    <input className={"form-control"} id={"Username"} name={"Username"} type={"text"} placeholder={"Username..."}
                           onChange={(e) => {
                               setNewSpeaker(prev => ({...prev, userName: e.target.value}))
                               console.log(newSpeaker);
                           }} required={true}/>
                </label>
                <label>
                    Password
                    <input className={"form-control"} id={"Password"} name={"Password"} type={"text"} placeholder={"Password..."}
                           onChange={(e) => {
                               setNewSpeaker(prev => ({...prev, password: e.target.value}))
                               console.log(newSpeaker);
                           }} required={true}/>
                </label>
                <label>
                    Profession
                    <input className={"form-control"} id={"Profession"} name={"Profession"} type={"text"} placeholder={"Profession..."}
                           onChange={(e) => {
                               setNewSpeaker(prev => ({...prev, profession: e.target.value}))
                               console.log(newSpeaker);
                           }} required={true}/>
                </label>
                <label>
                    Gender
                    <select id="Gender" name="Gender" onChange={(e) => {
                        setNewSpeaker(prev => ({...prev, gender: e.target.value}))
                        console.log(newSpeaker);
                    }} required={true}>
                        <option></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>

                <button onClick={(e) => {
                    e.preventDefault();
                    postSpeaker()
                    console.log(newSpeaker);
                    setNewSpeaker({})
                }} type="submit">Create</button>
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