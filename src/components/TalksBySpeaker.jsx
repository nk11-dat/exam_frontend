import React, {useState} from 'react';
import facade from "../apiFacade.js";

function TalksBySpeaker({dataFromServer, fetchTalksBySpeaker}) {

    const [searchInput, setSearchInput] = useState("")

    const changeHandler = (e) => {
        setSearchInput(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="column middle">
            <h2 className={"text-center"}>Talks by speaker</h2>
            <input id={"searchField"} type="search" placeholder={"speaker..."} onChange={changeHandler}/>
            <button onClick={() => fetchTalksBySpeaker(searchInput)}>SEARCH</button>
            {dataFromServer.length > 0 ? (
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th>Conference</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Date</th>
                            <th>Topic</th>
                            <th>Duration</th>
                            <th>PropsList</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataFromServer.map(talk => (
                            <tr key={talk.id}>
                                <td>{talk.conferenceConferenceName}</td>
                                <td>{talk.conferenceLocation}</td>
                                <td>{talk.conferenceCapacity}</td>
                                <td>{talk.conferenceStrDate}</td>
                                <td>{talk.topic}</td>
                                <td>{talk.duration}</td>
                                <td>{talk.propsList}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>)
                :
                (<p className={"text-center"}>Loading...</p>)}
        </div>
    );
}

export default TalksBySpeaker;