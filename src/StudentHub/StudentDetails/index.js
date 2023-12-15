import { React, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './index.css'
import axios from "axios";
import { useAuth } from "../../AuthContext";
import AuthService from "../AuthService";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


function StudentDetails(props) {

    const [student, setStudent] = useState({});


    const { id } = useParams();

    console.log("id: ", id)

    const [isEditing, setIsEditing] = useState(false);

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };


    const handleDeleteButtonClick = async () => {
        try {
            const response = await request.delete(`https://roomies-node-app.onrender.com/api/admin/users/${id}`);
            console.log(response.data);
            navigate('/StudentHub/Dashboard');
        } catch (error) {
            console.error('Error deleting student:', error.response.data);
        }
    };


    const request = axios.create({
        withCredentials: true,
    });
    const navigate = useNavigate();
    const { setSignOut, isAdmin } = useAuth();

    useEffect(() => {
        console.log("sdfs")

        const getStudentDetails = async () => {

            const response = await request.post(`https://roomies-node-app.onrender.com/api/users/${id}`);
            setStudent({ ...response.data })
            console.log("student details: ", response.data)
        }

        getStudentDetails();
    }, []);

    // const {id} = useParams();

    //  console.log("id: ", id)




    // const request = axios.create({
    //     withCredentials: true,
    // });
    // const navigate = useNavigate();
    // const { setSignOut } = useAuth();


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




    const handleUpdateButtonClick = async () => {
        try {
            const response = await request.put(`https://roomies-node-app.onrender.com/api/admin/users/${id}`, student[0]);
            console.log(response.data);

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating student details:', error.response.data);
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

    const { isSignedIn } = useAuth();







    console.log("fdasfsaf: ", JSON.stringify(student))
    return (


        <div className="w-100">
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
            <br />
            <br />

            <Container class='formN'>

                <Row className="justify-content-md-center">
                    <Col md={6}>

                        <Form >
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={(student["0"] !== undefined) ? student["0"].firstname : ''}
                                    disabled={!isEditing}



                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control

                                    value={(student["0"] !== undefined) ? student["0"].lastname : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    value={(student["0"] !== undefined) ? student["0"].state : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control

                                    value={(student["0"] !== undefined) ? student["0"].country : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formUniversity">
                                <Form.Label>University</Form.Label>
                                <Form.Control

                                    value={(student["0"] !== undefined) ? student["0"].university : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formMajor">
                                <Form.Label>Major</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].major : ''}
                                    disabled={!isEditing}



                                />
                            </Form.Group>

                            <Form.Group controlId="formTerm">
                                <Form.Label>Term</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].term : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="number"

                                    value={(student["0"] !== undefined) ? student["0"].year : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formSmoking">
                                <Form.Label>Smoking</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"

                                        value="true"
                                        checked={(student["0"] !== undefined) ? student["0"].smoking : '' === true}
                                        disabled={!isEditing}


                                    />
                                    {/* <Form.Check
                                type="radio"

                                value="false"
                                checked={student["0"].smoking === false}

                                /> */}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formDrinking">
                                <Form.Label>Drinking</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"

                                        value="true"
                                        checked={(student["0"] !== undefined) ? student["0"].drinking : '' === true}
                                        disabled={!isEditing}


                                    />
                                    {/* <Form.Check
                                type="radio"

                                value="false"
                                checked={student["0"].drinking === false}

                                /> */}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formVeg">
                                <Form.Label>Veg</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"

                                        value="true"
                                        checked={(student["0"] !== undefined) ? student["0"].veg : '' === true}
                                        disabled={!isEditing}


                                    />
                                    {/* <Form.Check
                                type="radio"

                                value="false"
                                checked={student["0"].veg === false}

                                /> */}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"

                                    value={(student["0"] !== undefined) ? student["0"].age : 0}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formShared">
                                <Form.Label>Shared</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"

                                        value="true"
                                        checked={(student["0"] !== undefined) ? student["0"].shared : '' === true}
                                        disabled={!isEditing}


                                    />
                                    {/* <Form.Check
                                type="radio"
                                value="false"
                                checked={student["0"].shared === false}

                                /> */}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formHobbies">
                                <Form.Label>Hobbies</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].hobbies.join(', ') : ''}
                                    disabled={!isEditing}


                                />
                                {/* <Form.Text className="text-muted">
                                Enter your hobbies separated by commas.
                            </Form.Text> */}
                            </Form.Group>

                            <Form.Group controlId="formDegree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].degree : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formMail">
                                <Form.Label>Mail</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].mail : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formLanguages">
                                <Form.Label>Languages</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].languages.join(', ') : ''}
                                    disabled={!isEditing}


                                />

                            </Form.Group>

                            <Form.Group controlId="formAbout">
                                <Form.Label>About</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].about : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>



                            <Form.Group controlId="formUGUniversity">
                                <Form.Label>Undergraduate University</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].ug_univ : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>

                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={(student["0"] !== undefined) ? student["0"].phone : ''}
                                    disabled={!isEditing}


                                />
                            </Form.Group>
                            <br />
                            <br />

                            {
                                isAdmin ? (
                                    <div>


                                        <button type="button" class="btn btn-danger" onClick={handleDeleteButtonClick}>Delete</button>


                                    </div>

                                ) : (
                                    <div></div>
                                )
                            }


                        </Form>
                    </Col>
                </Row>
            </Container>






        </div>
    );
}
export default StudentDetails;
