import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import facade from "../apiFacade.js";

function EditConference({
                            allConferences,
                            allSpeakers,
                            allTalks,
                            conferenceToEdit,
                            setConferenceToEdit,
                            putConference,
                            fetchSpecificConference,
                            specificConference
                        }) {

    useEffect(() => {
        //This is run once, when the page renders
        setConferenceToEdit({
            conferenceName: '',
            location: "",
            make: "",
            capacity: "",
            strDate: '',
            talks: [{id: '', users: [{userName: ""}]}]
        })

        // let test = document.querySelector("#make");
        //
        // let empty = document.createElement('option')
        // empty.text = "";
        // empty.value = "";
        // test.add(empty)
        //
        // let currentYear = new Date().getFullYear();
        // let earliestYear = 1900;
        // while (currentYear >= earliestYear) {
        //     let dateOption = document.createElement('option');
        //     dateOption.text = currentYear;
        //     dateOption.value = currentYear;
        //     // test.add(dateOption);
        //     currentYear -= 1;
        // }
    }, [])

    // const handleBrand = (e) => {
    //     setBoat(prevBoat => ({
    //         ...prevBoat, brand: e.target.value
    //     }));
    //     console.log(boat);
    //     //e.target.id: e.target.value
    // };
    //
    // const handleMake = (e) => {
    //     setConferenceToEdit(previous => ({
    //         ...previous, make: e.target.value
    //     }));
    //     console.log(conferenceToEdit);
    //     //e.target.id: e.target.value
    // };
    //
    // const handleImage = (e) => {
    //     setBoat(prevBoat => ({
    //         ...prevBoat, image: e.target.value
    //     }));
    //     console.log(boat);
    //     //e.target.id: e.target.value
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        putConference()
        console.log(conferenceToEdit);
    };

    const [boatSelectValue, setBoatSelectValue] = useState();
    const [ownersSelectValue, setOwnersSelectValue] = useState();
    const [harbourSelectValue, setHarbourSelectValue] = useState();
    const [brandSelectValue, setBrandSelectValue] = useState();

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
    const brandList = [
        {value: "Brand1", label: "Brand1"},
        {value: "Brand2", label: "Brand2"},
        {value: "Brand3", label: "Brand3"}
    ];

    // Function triggered on selection
    // const updateBoatSelectValue = (data) => {
    //     setBoatSelectValue(data);
    //     console.log(boatSelectValue)
    // }
    // const updateOwnerSelectValue = (data) => {
    //     setOwnersSelectValue(data);
    //     console.log(ownersSelectValue)
    // }
    // const updateHarbourSelectValue = (data) => {
    //     setHarbourSelectValue(data);
    //     console.log(harbourSelectValue)
    // }


    return (
        //String brand, String make, String image
        <div className="column middle">
            <h1>Edit Conference</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Conference to edit
                    <Select
                        options={conferenceList}
                        placeholder="Select Conference"
                        // value={boatSelectValue}
                        onChange={(data) => {
                            setConferenceToEdit(previous => ({
                                ...previous, conferenceName: data.value, talks: specificConference.talks, users:specificConference.users
                            }));
                            console.log(conferenceToEdit);
                        }}
                        isSearchable={false}
                        isMulti={false}
                        required={true}
                    />
                </label>

                <button onClick={(e) => {
                    e.preventDefault()
                    fetchSpecificConference(conferenceToEdit.conferenceName)
                    console.log("show selected conference...")
                }}>
                    Show
                </button>

                <label>
                    Location
                    <input className={"form-control"} id={"Location"} name={"Location"} type={"text"}
                           placeholder={"Location..."} onChange={(e) => {
                        setConferenceToEdit(previous => ({
                            ...previous, location: e.target.value
                        }));
                        console.log(conferenceToEdit);
                    }}/>
                </label>

                <label>
                    Capacity
                    <input className={"form-control"} id={"Capacity"} name={"Capacity"} type={"number"}
                           placeholder={"Capacity..."} min={0} onChange={(e) => {
                        setConferenceToEdit(previous => ({
                            ...previous, capacity: e.target.value
                        }));
                        console.log(conferenceToEdit);
                    }}/>
                </label>

                <label>
                    Date
                    <input className={"form-control"} style={{borderRadius: "5px"}} type="date" id="start"
                           name="trip-start"
                           min={new Date().toISOString().split("T")[0]} max="2030-12-31" onChange={(e) => {
                        setConferenceToEdit(prev => ({...prev, strDate: e.target.value}))
                        console.log(conferenceToEdit);
                    }} required={true}/>
                </label>

                {/*<label>*/}
                {/*    Talks*/}
                {/*    <Select*/}
                {/*        options={talkList}*/}
                {/*        placeholder="Select talks"*/}
                {/*        // value={ownersSelectValue}*/}
                {/*        onChange={(data) => {*/}

                {/*                setConferenceToEdit(previous => ({*/}
                {/*                    ...previous, talks: previous.talks.map(talk => (*/}
                {/*                        data.map((item) => {*/}
                {/*                        console.log(talk);*/}
                {/*                        return {...talk, id: item.value}})*/}
                {/*                    ))*/}
                {/*            }))*/}
                {/*            // const talksArr = data.map((item) => {*/}
                {/*            //     return {id: item.value}*/}
                {/*            //     // setConferenceToEdit(previous => ({*/}
                {/*            //     //     ...previous, talks: previous.talks.map(talk => {return {...talk, id: item.value}})*/}
                {/*            //     // }));*/}
                {/*            // })*/}
                {/*            // // console.log(talksArr)*/}
                {/*            // setConferenceToEdit(previous => ({*/}
                {/*            //     ...previous, talks: [previous.talks.users, talksArr]*/}
                {/*            // }));*/}
                {/*        // onChange={(data) => {*/}
                {/*        //     data.map((item) => {*/}
                {/*        //         setConferenceToEdit(previous => ({*/}
                {/*        //             ...previous, talks: [...previous.talks, previous.talks.map(talk => {return {id: item.value}})]*/}
                {/*        //         }));*/}
                {/*        //     })*/}
                {/*            // console.log("talksArr:" + talksArr);*/}
                {/*            // setConferenceToEdit(previous => ({*/}
                {/*            //     ...previous, talks: [{...previous.talks, id:talksArr}]*/}
                {/*            // }));*/}
                {/*            console.log(conferenceToEdit);*/}
                {/*        }}*/}
                {/*        isSearchable={false}*/}
                {/*        isMulti={true}*/}
                {/*    />*/}
                {/*</label>*/}

                {/*<label>*/}
                {/*    Harbour*/}
                {/*    /!*change this to owners...*!/*/}
                {/*    <Select*/}
                {/*        options={harbourList}*/}
                {/*        placeholder="Select Harbours"*/}
                {/*        // value={harbourSelectValue}*/}
                {/*        onChange={(data) => {*/}
                {/*            setConferenceToEdit(previous => ({*/}
                {/*                ...previous, HarbourInnerDTOHarbourId: data.value*/}
                {/*            }));*/}
                {/*            console.log(conferenceToEdit);*/}
                {/*        }}*/}
                {/*        isSearchable={false}*/}
                {/*        isMulti={false}*/}
                {/*    />*/}
                {/*</label>*/}

                {/*<label>*/}
                {/*    Brand*/}
                {/*    <Select*/}
                {/*        options={brandList}*/}
                {/*        placeholder="Select Brand"*/}
                {/*        // value={brandSelectValue}*/}
                {/*        onChange={(data) => {*/}
                {/*            setConferenceToEdit(previous => ({*/}
                {/*                ...previous, brand: data.value*/}
                {/*            }));*/}
                {/*            console.log(conferenceToEdit);*/}
                {/*        }}*/}
                {/*        isSearchable={false}*/}
                {/*        isMulti={false}*/}
                {/*    />*/}
                {/*</label>*/}

                {/*<label>*/}
                {/*    Make*/}
                {/*    <select className={"form-select"} id="make" name="make" ref={makeSelector} onChange={(e) => {*/}
                {/*        setConferenceToEdit(previous => ({*/}
                {/*        ...previous, make: e.target.value*/}
                {/*    }));*/}
                {/*        console.log(conferenceToEdit);}} />*/}
                {/*</label>*/}

                {/*<label>*/}
                {/*    Image Link*/}
                {/*    <input className={"form-control"} id={"image"} name={"image"} type={"text"} placeholder={"Image Link"} onChange={(e) => {*/}
                {/*        setConferenceToEdit(previous => ({*/}
                {/*            ...previous, image: e.target.value*/}
                {/*        }));*/}
                {/*        console.log(conferenceToEdit);}}/>*/}
                {/*</label>*/}

                <button onClick={handleSubmit} type="submit">Edit</button>
            </form>

            {specificConference ?
                <div className={"column"}>
                    Location: {specificConference.location}
                    <br/>
                    Capacity: {specificConference.capacity}
                    <br/>
                    Date: {specificConference.strDate}
                    <br/>
                    <div>
                        <h4>Talks:</h4>
                        {specificConference.talks.map(talk => (
                            <>
                                <h5>{talk.topic}</h5>
                                ID: {talk.id}
                                <br/>
                                Duration: {talk.duration}min
                                <br/>
                                Props: {talk.propsList}
                                {talk.users.map(speaker => (
                                    <>
                                        <br/>
                                        <b>Speaker: {speaker.userName}</b>
                                        <br/>
                                        Profession: {speaker.profession}
                                        <br/>
                                        Gender: {speaker.gender}
                                    </>
                                ))}
                            </>
                        ))}
                    </div>
                </div> : ""}

            {/*{boat.boatId ? <><h3>new boat info</h3>*/}
            {/*    <p>boatId: {boat.boatId}, brand: {boat.brand}, make: {boat.make}, image: {boat.image}</p></> : ""}*/}
        </div>
    );
}

export default EditConference;

// CardList.prototype = {
//     onClickHandler: PropTypes.func.isRequired,
//     onChangeHandler: PropTypes.func.isRequired
// }