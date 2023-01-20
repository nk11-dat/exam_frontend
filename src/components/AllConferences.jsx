import React, {useState} from 'react';
import facade from "../apiFacade.js";

function AllConferences({dataFromServer}) {
    // //TODO: Se om du kan bruge username til det samme som "addPet", bare hvor der testes om det er null eller ej
    // const addClick = (e) => {
    //     console.log(e.target.value)
    //     const dogId = e.target.value;
    //     const jsonElement = dataFromServer.filter((dog) => {
    //         // console.log(dog);
    //         return dog.id == dogId
    //     })[0];
    //     console.log(jsonElement);
    //     facade.postData("dog/addDogToUser/" + username,
    //         () => {}, "", jsonElement);
    //     e.target.disabled = true;
    // }

    const [chosenConference, setChosenConference] = useState({});

    return (
        <div className="column middle">
            <h2 className={"text-center"}>All Users</h2>
            <div>
                {dataFromServer.length > 0 ? (
                        <table key={"ConferenceTable"} className="table table-dark">
                            <thead>
                            <tr key={"header"}>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Capacity</th>
                                <th>strDate</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody key={"TableBody"}>
                            {dataFromServer.map((conference, index) => (
                                <tr key={conference.index}> {/*Den vil ikke spise den her key af en underlig årsag...*/}
                                    <td>{conference.conferenceName}</td>
                                    <td>{conference.location}</td>
                                    <td>{conference.capacity}</td>
                                    <td>{conference.strDate}</td>
                                    <td>
                                        <button onClick={() => {
                                            setChosenConference(conference)
                                            console.log(chosenConference);
                                        }}>Show Talks
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>)
                    :
                    (<p className={"text-center"}>Loading...</p>)}
            </div>

            {chosenConference ? (<>
                <h4 className={"text-center"}>Talks</h4>
                <table key={"TalksTable"} className="table table-light">
                    <thead>
                    <tr key={"TalksHeader"}>
                        <th>Topic</th>
                        <th>Duration</th>
                        <th>Props "list"</th>
                        <th>Speakers</th>
                    </tr>
                    </thead>
                    <tbody key={"TableBody"}>
                    {chosenConference.talks ? (chosenConference.talks.map((talk, index) => (
                        <tr key={talk.topic}> {/*Den vil ikke spise den her key af en underlig årsag...*/}
                            <td>{talk.topic}</td>
                            <td>{talk.duration}</td>
                            <td>{talk.propsList}</td>
                            {/*<td>{talk.propsList}</td>*/}
                            <td>{talk.users.map(user => (<li>{user.userName}</li>))}</td>
                        </tr>
                    ))) : ""}
                    </tbody>
                </table>
            </>) : ""}
        </div>
    );
}

export default AllConferences;