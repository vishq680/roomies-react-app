import { React, useState } from "react";
import { Link } from "react-router-dom";
import './index.css'


function Dashboard() {

    return (
        <div>
            <nav class="navbar navbar-dark navbar-expand-md bg-dark justify-content-center">
                <a href="/" class="navbar-brand d-flex w-50 mr-auto">Navbar 3</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
                    <ul class="navbar-nav w-100 justify-content-center">
                        <li class="nav-item ">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="//codeply.com">Codeply</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                        <Link to={`/StudentHub/Login`}  >

                            <li class="nav-item">
                                <a class="nav-link" href="/HubNavigation/">Login</a>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>

            <h1>Dashboard</h1>
            <div className="wd-grid-col-main-content">
                <div className="main-heading">
                    <h1 className="color-gray">Dashboard</h1>
                </div>
                <hr />
                <h4>Published Courses </h4>
                <h5>Course</h5>


                <hr />
                <div className="card-deck d-flex flex-row flex-wrap">

                    <div className="card">
                        <img className="card-img-top" src="../../images/blue.jpeg" alt="Not Found" />
                        <div className="card-body">
                            <h5 className="card-title">New Card</h5>
                            <p className="card-text">New Text</p>
                            <p className="card-text">
                                <small className="text-muted">25/11/2023</small><br />
                                <small className="text-muted">23/12/2023</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
