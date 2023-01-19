import React from 'react';
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



    return (
        <div className="column middle">
            <h2 className={"text-center"}>All Users</h2>
            {dataFromServer.length > 0 ? (
                    <table key={"ConferenceTable"} className="table table-dark">
                        <thead>
                        <tr key={"header"}>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>strDate</th>
                        </tr>
                        </thead>
                        <tbody key={"TableBody"}>
                        {dataFromServer.map((conference, index) => (
                            <tr key={conference.index}> {/*Den vil ikke spise den her key af en underlig årsag...*/}
                                <td>{conference.conferenceName}</td>
                                <td>{conference.location}</td>
                                <td>{conference.capacity}</td>
                                <td>{conference.strDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>)
                :
                (<p className={"text-center"}>Loading...</p>)}
        </div>
    );
}

export default AllConferences;