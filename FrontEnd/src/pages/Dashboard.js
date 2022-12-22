import React from 'react'
import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState , Delete } from 'react'
import { showList } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Container, Button, Table } from 'react-bootstrap';


export default function Dashboard() {
    
     const nav = useNavigate();

    const [show, setShow] = useState([]);

    const handleSubmit = async (_id) => {
        alert("task deleted")
        const updateResponse = await Delete(_id);
        console.log(updateResponse.data.message)
        window.location.reload()
    }

    useEffect(() => {
        const showStud = async () => {
            const result = await showList()
            const arr = result.data.result;
            setShow(arr);
        }
        showStud();
    }, [])

    return (
        <div>
            <center><h4>Welcome</h4></center>
            <Link to="/AddStud">
            <button className= "btn btn-outline-success">Add Marks</button></Link><br/>
            <div className="container mt-4">
                <div>
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Grade</th>
                                <th>Percentage</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {show.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.name}</td>
                                        <td><img src={data.image}/></td>
                                        <td>{data.email}</td>
                                        <td>{data.grade}</td>
                                        <td>{data.percentage}</td>
                                        <td><Link to={`/Update/${data._id}`}>
                                            <Button variant="danger">Edit</Button></Link></td>
                                        <td><Button variant="danger"
                                            onClick={() => handleSubmit(data._id)}
                                            className="bi bi-trash" >delete </Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}