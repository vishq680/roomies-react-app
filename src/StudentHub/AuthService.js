

const AuthService = {
    // Function to save user details in localStorage
    saveUserDetails: (userDetails) => {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    },
    setStudentDetails: (studentDetails) => {
      localStorage.setItem('studentDetails', JSON.stringify(studentDetails));
    },

    getStudentDetails: () => {
      const studentDetailsString = localStorage.getItem('studentDetails');
      return studentDetailsString ? JSON.parse(studentDetailsString) : null;
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
  