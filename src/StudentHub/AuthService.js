

const AuthService = {
    // Function to save user details in localStorage
    saveUserDetails: (userDetails) => {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    },
  
    // Function to get user details from localStorage
    getUserDetails: () => {
      const userDetailsString = localStorage.getItem('userDetails');
      return userDetailsString ? JSON.parse(userDetailsString) : null;
    },
  
    // Function to clear user details from localStorage (on logout, for example)
    clearUserDetails: () => {
      localStorage.removeItem('userDetails');
    },
  };
  
  export default AuthService;
  