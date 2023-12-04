import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
// import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Login from "./Login";




function StudentHub() {

    return (

        <div >
            {/* <div>
                <HubNavigation />
            </div> */}

            <div className="d-flex">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />

                    <Route path="Dashboard" element={
                        <Dashboard />
                    } />
                    <Route path="Login" element={<Login />} />

                </Routes>

            </div>
        </div >

    );
}
export default StudentHub;
