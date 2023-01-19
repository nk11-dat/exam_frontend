import React, {useEffect} from 'react';
import facade from "../apiFacade.js";
import {Button} from "react-bootstrap";

function DeleteTalk({dataFromServer, onDelete}) {
    // //TODO: Se om du kan bruge username til det samme som "addPet", bare hvor der testes om det er null eller ej

    useEffect(() => console.log(dataFromServer))


    return (
        <div className="column middle">
            <h2 className={"text-center"}>All Talks</h2>
            {dataFromServer ? (
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th>talk ID</th>
                            <th>Topic</th>
                            <th>Duration</th>
                            <th>Proplist</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataFromServer.map(talk => (
                            <tr key={talk.id}>
                                <td>{talk.id}</td>
                                <td>{talk.topic}</td>
                                <td>{talk.duration}</td>
                                <td>{talk.propsList}</td>
                                <td><Button className={""} onClick={() => onDelete(talk.id)}>DELETE</Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>)
                :
                (<p className={"text-center"}>Loading...</p>)}
        </div>
    );
}

export default DeleteTalk;