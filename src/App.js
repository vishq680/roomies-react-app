import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentHub from './StudentHub';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <div>

        <Routes>
        <Route path="/" element={<Navigate to="/StudentHub" />} />
          <Route path="/StudentHub/*" element={<StudentHub />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
