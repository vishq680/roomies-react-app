import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import './index.css';
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import AuthService from "../AuthService";







function Login() {

    const request = axios.create({
        withCredentials: true,
    });


    const navigate = useNavigate();
    const { isSignedIn, setSignIn, isAdmin, setAdmin } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('user');


    const handleSignIn = async () => {

        if (selectedRole == "admin") {
            console.log("Admin")
            try {
                const response = await request.post('https://roomies-node-app.onrender.com/api/admin/users/signin', { username, password });
                console.log(response.data);
                if (response.data.length === 0) {
                    console.log('Error signing in:');
                    alert('Invalid credentials. Please try again.');
                }
                else {
                    console.log('Sign-in successful');
                    setSignIn(response.data);
                    AuthService.saveUserDetails(response.data);
                    navigate('/StudentHub/Dashboard');
                    setAdmin();
                }
            } catch (error) {
                console.error('Error signing in:', error.response.data.message);
                alert('Invalid credentials. Please try again.');
            }
        }

        else {
            try {
                const response = await request.post('https://roomies-node-app.onrender.com/api/users/signin', { username, password });
                console.log(response.data);
                if (response.data.length === 0) {
                    console.log('Error signing in:');
                    alert('Invalid credentials. Please try again.');
                }
                else {
                    console.log('Sign-in successful');
                    setSignIn(response.data);
                    AuthService.saveUserDetails(response.data);
                    navigate('/StudentHub/Dashboard');
                }
            } catch (error) {
                console.error('Error signing in:', error.response.data.message);
                alert('Invalid credentials. Please try again.');
            }
        };

    }


    return (

        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1>Sign In</h1>
                    <br />
                    <br />
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Login As</Form.Label>
                            <Form.Control as="select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Control>
                        </Form.Group>


                        <Button variant="primary" onClick={handleSignIn}>
                            Sign In
                        </Button>
                    </Form>
                    <Link to={`/StudentHub/SignUp`}>
                        <div class="text-center">
                            <p>Not a member? <a href="#!">Register</a></p>
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>


    );


}
export default Login;
