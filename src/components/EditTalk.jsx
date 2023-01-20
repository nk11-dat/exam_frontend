import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import facade from "../apiFacade.js";

function EditTalk({allConferences, allSpeakers, allTalks, putTalk, setNewTalk, newTalk}) {

    useEffect(() => {
        //This is run once, when the page renders
        setNewTalk({
            id: '',
            conferenceConferenceName: "",
            topic: "",
            duration: "",
            propsList: '',
            users: [{userName: "", profession: "", gender: ""}]
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        putConference()
        console.log(conferenceToEdit);
    };

    // Array of all options
    const conferenceList = allConferences.length > 0 ? allConferences.map((conf) => {
        return {value: conf.conferenceName, label: conf.conferenceName}
    }) : [
        {value: 1, label: "Loading...1"},
        {value: 2, label: "Loading...2"},
        {value: 3, label: "Loading...3"},
    ];
    const speakerList = allSpeakers.length > 0 ? allSpeakers.map((speaker) => {
        return {value: speaker.userName, label: speaker.userName}
    }) : [
        {value: 1, label: "s Loading...1"},
        {value: 2, label: "s Loading...2"},
        {value: 3, label: "s Loading...3"},
    ];
    const talkList = allTalks.length > 0 ? allTalks.map((talk) => {
        return {value: talk.id, label: talk.topic}
    }) : [
        {value: 1, label: "t Loading...1"},
        {value: 2, label: "t Loading...2"},
        {value: 3, label: "t Loading...3"},
    ];


    return (
        //String brand, String make, String image
        <div className="column middle">
            <h1>Edit Talk</h1>
            <form>
                <h2>Talk</h2>
                <label>
                    Talk
                    <Select
                        options={talkList}
                        placeholder="Select Talk"
                        // value={boatSelectValue}
                        onChange={(data) => {
                            setNewTalk(previous => ({
                                ...previous, id: data.value
                            }));
                            console.log(newTalk);
                        }}
                        isSearchable={false}
                        isMulti={false}
                        required={true}
                    />
                </label>
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
                <label>
                    Speakers
                    <Select
                        options={speakerList}
                        placeholder="Select Speakers"
                        // onChange={(data) => {
                        //     const ownersArr = data.map((item) => {return item.value})
                        //     setNewTalk(previous => ({
                        //         ...previous, users: [{userName: ownersArr}]
                        //     }));
                        //     console.log(newTalk);
                        // }}
                        onChange={(data) => {
                            // console.log(data);
                            const testUsers = data.map((item) => {return {userName:item.value}})
                            // console.log(testUsers)
                            setNewTalk(prev => ({
                                ...prev, users: testUsers
                            }))
                            console.log(newTalk);
                        }}
                        isSearchable={false}
                        isMulti={true}
                        required={true}
                    />
                </label>

                <button onClick={(e) => {
                    e.preventDefault();
                    putTalk()
                    console.log(newTalk);
                }} type="submit">Update</button>
            </form>

            {/*{specificConference ?*/}
            {/*    <div className={"column"}>*/}
            {/*        Location: {specificConference.location}*/}
            {/*        <br/>*/}
            {/*        Capacity: {specificConference.capacity}*/}
            {/*        <br/>*/}
            {/*        Date: {specificConference.strDate}*/}
            {/*        <br/>*/}
            {/*        <div>*/}
            {/*            <h4>Talks:</h4>*/}
            {/*            {specificConference.talks.map(talk => (*/}
            {/*                <>*/}
            {/*                    <h5>{talk.topic}</h5>*/}
            {/*                    ID: {talk.id}*/}
            {/*                    <br/>*/}
            {/*                    Duration: {talk.duration}min*/}
            {/*                    <br/>*/}
            {/*                    Props: {talk.propsList}*/}
            {/*                    {talk.users.map(speaker => (*/}
            {/*                        <>*/}
            {/*                            <br/>*/}
            {/*                            <b>Speaker: {speaker.userName}</b>*/}
            {/*                            <br/>*/}
            {/*                            Profession: {speaker.profession}*/}
            {/*                            <br/>*/}
            {/*                            Gender: {speaker.gender}*/}
            {/*                        </>*/}
            {/*                    ))}*/}
            {/*                </>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div> : ""}*/}

            {/*{boat.boatId ? <><h3>new boat info</h3>*/}
            {/*    <p>boatId: {boat.boatId}, brand: {boat.brand}, make: {boat.make}, image: {boat.image}</p></> : ""}*/}
        </div>
    );
}

export default EditTalk;

// CardList.prototype = {
//     onClickHandler: PropTypes.func.isRequired,
//     onChangeHandler: PropTypes.func.isRequired
// }