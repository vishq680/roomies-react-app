import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        // Check localStorage for authentication status on component mount
        const storedIsSignedIn = localStorage.getItem('isSignedIn');
        if (storedIsSignedIn) {
          setIsSignedIn(JSON.parse(storedIsSignedIn));
        }
      }, []);

    const setSignIn = (userData) => {

        setIsSignedIn(true);
        setUser(userData);
        localStorage.setItem('isSignedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(userData));
        // console.log(user.data())


    };

    const setSignOut = () => {

        setIsSignedIn(false);
        setUser(null);
        localStorage.removeItem('isSignedIn');
        localStorage.removeItem('user');



    };





    return (
        <AuthContext.Provider value={{ isSignedIn, setSignIn, setSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
