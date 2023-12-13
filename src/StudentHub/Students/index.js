import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './index.css'
import axios from "axios";


function Students() {
    const location = useLocation();


    const uniName = location.state?.data || 'Default Value';
    // console.log(location.state)

    const [students, setStudents] = useState([]);

    // console.log(uniName);


    useEffect(() => {
        console.log(uniName);
        axios.get(`https://roomies-node-app.onrender.com/api/users/${uniName}`)
            .then(response => setStudents(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <nav class="navbar navbar-dark navbar-expand-md bg-dark justify-content-center">
                <a href="/" class="navbar-brand d-flex w-50 mr-auto p-2">Roomies</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
                    <ul class="navbar-nav w-100 justify-content-center">
                        <Link class='no-underline' to={`/StudentHub/Universities`}>
                            <li class="nav-item ">
                                <a class="nav-link" href="">Top Universities</a>
                            </li>
                        </Link>
                    </ul>
                    <ul class="nav navbar-nav ml-auto w-100 justify-content-end p-2">
                        <Link class='no-underline' to={`/StudentHub/Login`}  >

                            <li class="nav-item">
                                <a class="nav-link " href="">Login</a>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>

            <div>
                <div>
                    <div>
                        <div className="card-deck d-flex flex-row flex-wrap">
                            {students.map((students, index) => (
                                <Link to={{ pathname: 'StudentHub/Students', state: { ...students.name } }}>
                                    <div key={index} className="card m-2">
                                        <img className="card-img-top" src="https://img.freepik.com/premium-vector/cartoon-urban-cityscape-with-college-academy-students-university-architecture-background_212168-968.jpg" alt={students.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{students.name}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Students;
