import React from 'react'
import Header from './Header';
import { useState, useRef } from 'react';
import checkValidData from '../utils/validate';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constant';



const Login = () => {
    
      const[isSignInForm, setIsSignInForm] = useState(true);
      const[errorMessage, setErrorMessage] = useState(null);
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const email = useRef(null);
      const password = useRef(null);
      const name = useRef(null);

      const handleButtonClick = () => {
        
        
        const message =checkValidData(email.current.value, password.current.value);
        // e.log(message);
        setErrorMessage(message);

        if(message) return;

        if(!isSignInForm){
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
           .then((userCredential) => {
    // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: "Abhishek Tripathi", photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            const {uid, email, displayname} = auth.currentUser;
           dispatch(addUser({uid: uid, email: email, displayname: displayname}));
           
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
            setErrorMessage(errorMessage);
          });
          
          
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
    // ..
  }
  );
 }
        else{
          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
        }
      };

      
       
       const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
       }

  return (
    <div >
      <Header/>
      <div className='absolute'>
        <img className='h-screen object-cover' src= {BG_URL}
        alt='Background-img'/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-75'>
        <h1 className='font-bold text-white text-2xl'>  {isSignInForm ? "Sign in" : "Sign Up"}</h1>
        {/* {isSignInForm ? "Sign in" : "Sign Up"} */}
        {
          !isSignInForm && (
            <input
       
        type='text'
        placeholder='Name'
        className='p-4 my-4 w-full bg-gray-700'
        />
          )
        }
        <input
        ref={email}
        type='text'
        placeholder='Email or Phone number'
        className='p-4 my-4 w-full bg-gray-700'
        />
        <input
        ref= {password}
        type='password'
        placeholder='Password'
        className='p-4 my-4 w-full bg-gray-700'
        />
        <p className='text-red-500'>{errorMessage}</p>
        <button className='text-white p-4 my-6 bg-red-600 w-full rounded-lg' onClick={handleButtonClick}>
           {isSignInForm ? "Sign in" : "Sign Up"}
           </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign up now." : "Already Registered! Sign in now"}</p>
      </form>
    </div>
    
  )
}

export default Login;