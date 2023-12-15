import { React, useState } from "react";
import { Link } from "react-router-dom";
import './index.css'



function Universities() {

    const universities = [
        { rank: 1, name: 'Harvard University', country: 'USA' },
        { rank: 2, name: 'Stanford University', country: 'USA' },
        { rank: 3, name: 'Massachusetts institute of Technology', country: 'USA' },
        {rank: 4, name: 'Princeton University', country: 'USA'},
        {rank: 5, name: 'Yale University', country: 'USA'},
        {rank: 6, name: 'Cambidge University', country: 'UK'},
        {rank: 7, name: 'Caltech', country: 'USA'},
        {rank: 8, name: 'University of California, Berkeley', country: 'USA'},
        {rank: 9, name: 'Georgia Institute of Technology', country: 'USA'},
        {rank: 10, name: 'University of Illionois, Urbana Champagne', country: 'USA'},
    ];

    return (
        <div className="container mt-4">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {universities.map((university, index) => (
                        <tr key={index}>
                            <th scope="row">{university.rank}</th>
                            <td>{university.name}</td>
                            <td>{university.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Universities;
