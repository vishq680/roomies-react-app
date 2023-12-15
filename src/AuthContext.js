import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    // const [user, setUser] = useState({});
    let user;


    useEffect(() => {
        // Check localStorage for authentication status on component mount
        const storedIsSignedIn = localStorage.getItem('isSignedIn');
        if (storedIsSignedIn) {
            setIsSignedIn(JSON.parse(storedIsSignedIn));
        }
    }, []);

    const setAdmin = () => {
        setIsAdmin(true);
    }

    const setSignIn = (userData) => {
        // console.log(userData[0]);
        // console.log(userData.type);

        user = userData;

        setIsSignedIn(true);
        // setUser({...userData[0]});

        localStorage.setItem('isSignedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(userData));
        // console.log(user);


    };

    const setSignOut = () => {

        setIsSignedIn(false);
        // setUser(null);
        if(isAdmin === true) {
            setIsAdmin(false);
        }
        localStorage.removeItem('isSignedIn');
        localStorage.removeItem('user');
    };





    return (
        <AuthContext.Provider value={{ isSignedIn, setSignIn, setSignOut,isAdmin,setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
