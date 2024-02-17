const checkValidData = (email, password) => {

     const isEmailValid = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email);

     const isPasswordValid = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/.test(password);

     if(!isEmailValid) return "Email is invalid";
     if(!isPasswordValid) return "Password is invalid";

     return null;
};

export default checkValidData;