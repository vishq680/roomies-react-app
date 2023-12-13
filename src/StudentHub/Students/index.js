import { React, useState } from "react";
import { Link } from "react-router-dom";
import './index.css'

function Students() {

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
                            <div className="card">
                                <img className="card-img-top" src="../../images/blue.jpeg" alt="Not Found" />
                                <div className="card-body">
                                    <h5 className="card-title">Student name</h5>
                                    <p className="card-text">University Name</p>
                                    <p className="card-text">Course Name</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Students;