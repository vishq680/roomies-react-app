import { React, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import AuthService from "../AuthService";
import './index.css';


function Dashboard() {

    const request = axios.create({
        withCredentials: true,
    });
    const navigate = useNavigate();
    const { setSignOut } = useAuth();
    // console.log(uniName);



    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    const capitalizeFirstLetter = (str) => {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };


    const handleSignOut = async () => {
        if (isAdmin) {
            try {
                const response = await request.post('https://roomies-node-app.onrender.com/api/admin/users/signout');
                // console.log(response.data);
                setSignOut();
                AuthService.clearUserDetails();
                navigate('/StudentHub/Dashboard');

            } catch (error) {
                console.error(error.response.data);
            }
        }
        else {
            try {
                const response = await request.post('https://roomies-node-app.onrender.com/api/users/signout');
                // console.log(response.data);
                setSignOut();
                AuthService.clearUserDetails();

                navigate('/StudentHub/Dashboard');

            } catch (error) {
                console.error(error.response.data);
            }
        }
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


    const [universities, setUniversities] = useState([]);
    const { isSignedIn, user, isAdmin } = useAuth();

    const [students, setStudents] = useState([]);
    const [userDetails, setUserDetails] = useState(null);


    const storedUserDetails = AuthService.getUserDetails();
    // console.log(storedUserDetails[0].university)




    useEffect(() => {
        // Fetch data when the component mounts
        axios.post('https://roomies-node-app.onrender.com/api/users/univ')
            .then(response => setUniversities(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const [Restaurants, setRestaurants] = useState([]);

    useEffect(() => {


        const getProfiles = async () =>{


        if (isSignedIn && !isAdmin) {
            try {
                await axios.get(`https://roomies-node-app.onrender.com/api/users/${storedUserDetails[0].university}`)
                    .then(response => setStudents(response.data))
                    .catch(error => console.error('Error fetching data:', error));
            }
            catch {
                console.log("No students found from university");

            }
        }
        }

        getProfiles();



    }, []);



    useEffect(() =>{

        const getRestaurantData = async () =>{

            const univ = storedUserDetails[0].university;
            let place = "";
            
            if (univ === "northeastern university"){
                place = "boston";
            }
            else if (univ === "chicago university"){
                place = "chicago";
            }
            else if ( univ === "stanford university"){
                place = "cambridge";
            }
            else if ( univ === "mit university"){
                place = "brookline";
            }
            else if ( univ === "university texas dallas"){
                place = "dallas";
            }
            else if ( univ === "arizona state university"){
                place = "tempe";
            }
            else if ( univ === "stony brook"){
                place = "new york";
            }

            if (isSignedIn) {
                await axios.get(`https://roomies-node-app.onrender.com/api/users/restaurants/${place}`)
                .then(response => setRestaurants(response.data))
                .catch(error => console.error('Error fetching data:', error));
            }
        }

        getRestaurantData();



    }, [])

    const [searchText, setSearchText] = useState("");



    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-md bg-dark justify-content-center">
                <a href="/" className="navbar-brand d-flex w-50 mr-auto p-2">Roomies</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                    <ul className="navbar-nav w-100 justify-content-center">
                        <Link className='no-underline' to={`/StudentHub/Universities`}>
                            <li className="nav-item ">
                                <a className="nav-link" href="">Top Universities</a>
                            </li>
                        </Link>
                    </ul>
                    <ul className="nav navbar-nav ml-auto w-100 justify-content-end p-2">
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
                                            <i className="fa-solid fa-user"></i>
                                        </button>
                                        <ul
                                            className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                                            aria-labelledby="dropdownMenuButton2"
                                        >
                                            <Link className='no-underline' to={`/StudentHub/Profile`}>
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
                                <Link className='no-underline' to={`/StudentHub/Login`}  >

                                    <li className="nav-item">
                                        <a className="nav-link " href="">Login</a>
                                    </li>
                                </Link>
                            )

                        }

                    </ul>
                </div>
            </nav>



           

            {
                isAdmin ? (
                    <div className="container d-flex justify-content-center align-items-center vh-10 search">
                        <div className="row">
                            <div className="col-md-12 offset-md-2">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Search Student ID"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                    />
                                    <div className="input-group-append">
                                        <Link to={`/StudentHub/StudentDetails`}>
                                            <button className="btn btn-primary" type="button">
                                                Search
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : ( 
                        <div className="container d-flex justify-content-center align-items-center vh-10 search">
                        <div className="row">
                            <div className="col-md-12 offset-md-2">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Search University"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                        value={searchText}
                                        onChange={(e) =>{setSearchText(e.target.value)}}
                                    />
                                    <div className="input-group-append">
                                        <Link to={`/StudentHub/Students/${searchText}`}>
                                            <button className="btn btn-primary" type="button">
                                                Search
                                            </button>
                                        </Link>
  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }



            <div>
                <div>
                    <div>
                    <hr />
                        <h2 className="p-2">Popular Universities</h2>
                        


                        <div className="card-deck d-flex flex-row flex-wrap">
                            {universities.map((university, index) => (

                                <Link key={university.id} className='no-underline' to={ `/StudentHub/Students/${university.name}`}>

                           

                                    <div key={index} className="card m-2">
                                        <img className="card-img-top" src="https://img.freepik.com/premium-vector/cartoon-urban-cityscape-with-college-academy-students-university-architecture-background_212168-968.jpg" alt={university.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{capitalizeFirstLetter(university.name)}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                    <div>
                    {
                        isSignedIn && !isAdmin ? (
                            <div>
                                <br />
                                <br />
                                <hr />
                                <h2>Recommended Profiles</h2>
                                
                                <div className="card-deck d-flex flex-row flex-wrap"> 
                                    {students.map((students, index) => (
                                        <Link className='no-underline' to={{ pathname: 'StudentHub/Students', state: { ...students.name } }} key={students.id}>
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
                        ) : (
                            <div></div>
                        )
                    }
                    </div>
                    <div>
                    {
                        isSignedIn ? (
                            <div>
                                <br />
                                <br />
                                <hr />
                                <h2>Recommended Restaurants around {storedUserDetails[0].university}</h2>
                                
                                <div className="card-deck d-flex flex-row flex-wrap"> 
                                    {Restaurants.map((restaurant, index) => (
                                        <Link className='no-underline' key={restaurant.id}>
                                            <div key={index} className="card m-2">
                                                <img className="card-img-top" src={restaurant.image_url} alt={restaurant.name} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{capitalizeFirstLetter(restaurant.name)}</h5>
                                                    <p>{restaurant.rating}</p>
                                                    <p>{restaurant.address}</p>
                                                    <p>{restaurant.review_count}</p>
                                                    <p>{restaurant.phone}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
