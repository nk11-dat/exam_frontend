import React from 'react';
import facade from "../apiFacade.js";

function AllOwners({dataFromServer, petType, username}) {
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
            <h2 className={"text-center"}>All Owners</h2>
            {dataFromServer.length > 0 ? (
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th>User name</th>
                            <th>Address</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataFromServer.map(user => (
                            <tr key={user.userName}>
                                <td>{user.userName}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>)
                :
                (<p className={"text-center"}>Loading...</p>)}
        </div>
    );
}

export default AllOwners;