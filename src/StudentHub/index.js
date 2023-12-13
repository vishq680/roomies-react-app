import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
// import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Login from "./Login";
import Universities from "./Universities";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Students from "./Students";
import StudentDetails from "./StudentDetails";



function StudentHub() {

    // const [uniName, setUniName] = useState("");

    return (

        <div >

            <div className="d-flex">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />

                    <Route path="Dashboard" element={
                        <Dashboard />
                    } />
                
                    <Route path="Login" element={<Login />} />
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path="Universities" element={<Universities />} />
                    <Route path="Students" element={<Students />} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="StudentDetails" element={<StudentDetails />} />

                </Routes>

            </div>
        </div >

    );
}
export default StudentHub;
