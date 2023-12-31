import { React, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './index.css'
import axios from "axios";
import { useAuth } from "../../AuthContext";
import AuthService from "../AuthService";


function Students(props) {
    const location = useLocation();
    const request = axios.create({
        withCredentials: true,
    });
    const navigate = useNavigate();
    const { setSignOut } = useAuth();


    const capitalizeFirstLetter = (str) => {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleSignOut = async () => {
        try {
            const response = await request.post('https://roomies-node-app.onrender.com/api/users/signout');
            console.log(response.data);
            setSignOut();
            AuthService.clearUserDetails();
            navigate('/StudentHub/Dashboard');

        } catch (error) {
            console.error(error.response.data);
        }
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    useEffect(() => {
        const updateDropdownPosition = () => {
            if (dropdownRef.current) {
                const dropdownRect = dropdownRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Check if the dropdown is going below the viewport
                if (dropdownRect.bottom > viewportHeight) {
                    const top = dropdownRect.top - (dropdownRect.bottom - viewportHeight);
                    setDropdownPosition({ top, left: dropdownRect.left });
                } else {
                    // Reset position if it's within the viewport
                    setDropdownPosition({ top: 0, left: -100 });
                }
            }
        };

        if (isDropdownOpen) {
            window.addEventListener('scroll', updateDropdownPosition);
            window.addEventListener('resize', updateDropdownPosition);
            updateDropdownPosition(); // Initial position check

            return () => {
                window.removeEventListener('scroll', updateDropdownPosition);
                window.removeEventListener('resize', updateDropdownPosition);
            };
        }
    }, [isDropdownOpen]);

    const { isSignedIn, user } = useAuth();







    const { uniName } = useParams();

    // const uniName = location.state || 'arizona state university';    
    console.log(location.state + 'uniName')

    const [students, setStudents] = useState([]);
    // const { uniName} = props.location.state;
    console.log(uniName)

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
                        {/* <li class="nav-item">
                            <a class="nav-link" href="//codeply.com">Codeply</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li> */}
                    </ul>
                    <ul class="nav navbar-nav ml-auto w-100 justify-content-end p-2">
                        {
                            isSignedIn ? (
                                <li>
                                    <div className="dropdown" ref={dropdownRef} style={dropdownPosition}>
                                        <button
                                            className="btn btn-primary btn-floating dropdown-toggle hidden-arrow bg-dark"
                                            type="button"
                                            id="dropdownMenuButton2"
                                            onClick={toggleDropdown}
                                            aria-expanded={isDropdownOpen}
                                        >
                                            <i class="fa-solid fa-user"></i>
                                        </button>
                                        <ul
                                            className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                                            aria-labelledby="dropdownMenuButton2"
                                        >
                                            <Link class='no-underline' to={`/StudentHub/Profile`}>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        <i className="fas fa-user-alt pe-2"></i>My Profile
                                                    </a>
                                                </li>
                                            </Link>
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={handleSignOut}>
                                                    <i className="fas fa-door-open pe-2"></i>Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                            ) : (
                                <Link class='no-underline' to={`/StudentHub/Login`}  >

                                    <li class="nav-item">
                                        <a class="nav-link " href="">Login</a>
                                    </li>
                                </Link>
                            )

                        }

                    </ul>
                </div>
            </nav>

            <div>
                <div>
                    <div>
                        <div className="card-deck d-flex flex-row flex-wrap">
                            {students.map((students, index) => (
                                <Link class='no-underline' to={{ pathname: `/StudentHub/StudentDetails/${students.id}`, state: { ...students.name } }}
                                
                                >
                                    <div key={index} className="card m-2">
                                        <img className="card-img-top" src="https://img.freepik.com/premium-vector/cartoon-urban-cityscape-with-college-academy-students-university-architecture-background_212168-968.jpg" alt={students.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{capitalizeFirstLetter(students.firstname)} {capitalizeFirstLetter(students.lastname)}</h5>
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
