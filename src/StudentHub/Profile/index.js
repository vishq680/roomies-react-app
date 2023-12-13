import { React, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import './index.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


function Profile() {

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


    const [universities, setUniversities] = useState([]);
    const { isSignedIn } = useAuth();


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        state: '',
        country: '',
        university: '',
        major: '',
        term: '',
        year: '',
        smoking: '',
        drinking: '',
        veg: '',
        Age: '',
        shared: '',
        hobbies: '',
        degree: '',
        mail: '',
        languages: '',
        about: '',
        username: '',
        password: '',
        ug_univ: '',
        phone: '',


    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();
    const { setSignIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server
            const response = await axios.post('https://roomies-node-app.onrender.com/api/users/signup', formData);
            console.log(response.data);


            // Reset the form data if needed
            setFormData({
                firstname: '',
                lastname: '',
                state: '',
                country: '',
                university: '',
                major: '',
                term: '',
                year: '',
                smoking: '',
                drinking: '',
                veg: '',
                Age: '',
                shared: '',
                hobbies: '',
                degree: '',
                mail: '',
                languages: '',
                about: '',
                username: '',
                password: '',
                ug_univ: '',
                phone: '',
            });

            alert('User signed up successfully!');
            setSignIn(response.data);
            navigate('/StudentHub/Dashboard');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up. Please try again.');
        }
    };



    return (
        <span class="w-100">
            <nav class="navbar navbar-dark navbar-expand-md bg-dark justify-content-center 
            ">
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
                                                <a className="dropdown-item" href="#" >
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

            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h1 class='justify-center'>Profile</h1>
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your First Name"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Last Name"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formUniversity">
                                <Form.Label>University</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your University"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formMajor">
                                <Form.Label>Major</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Major"
                                    name="major"
                                    value={formData.major}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formTerm">
                                <Form.Label>Term</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Term"
                                    name="term"
                                    value={formData.term}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formSmoking">
                                <Form.Label>Smoking</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Smoking status"
                                    name="smoking"
                                    value={formData.smoking}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDrinking">
                                <Form.Label>Drinking</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Drinking status"
                                    name="drinking"
                                    value={formData.drinking}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formVeg">
                                <Form.Label>Veg</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Vegetarian status"
                                    name="veg"
                                    value={formData.veg}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Age"
                                    name="Age"
                                    value={formData.Age}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formShared">
                                <Form.Label>Shared</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Shared status"
                                    name="shared"
                                    value={formData.shared}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formHobbies">
                                <Form.Label>Hobbies</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Hobbies"
                                    name="hobbies"
                                    value={formData.hobbies}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDegree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Degree"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formMail">
                                <Form.Label>Mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Mail"
                                    name="mail"
                                    value={formData.mail}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formLanguages">
                                <Form.Label>Languages</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Languages"
                                    name="languages"
                                    value={formData.languages}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formAbout">
                                <Form.Label>About</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tell us about yourself"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formUGUniversity">
                                <Form.Label>Undergraduate University</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Undergraduate University"
                                    name="ug_univ"
                                    value={formData.ug_univ}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </span>
    );
}


export default Profile;
