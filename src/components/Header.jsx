import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { Logo, SUPPORTED_LANG } from '../utils/constant';
import { toggleGPTSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstant';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=> store.user);
  const showGPTSearch = useSelector((store)=> store?.gpt?.showGPTSearch);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  useEffect(() => {
        
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid, email, displayname} = user.uid;
        dispatch(addUser({uid: uid, email: email, displayname: displayname}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
        
      }
    });
           return () => unsubscribe();

  }, []);

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());

  }
         
     const handleLanguageChange = (e) => {
      dispatch(changeLanguage(e.target.value));
     };

  return (
    <div className='absolute w-screen bg-gradient-to-b from-black px-8 py-2 z-10 flex flex-col justify-between md:flex-row'>
        <img className = 'w-44 mx-auto md:mx-0' src={Logo} alt='logo'/>
        {
         user && (
          <div className='flex p-2 justify-between'>
            {showGPTSearch && (<select className='p-2 m-2 bg-gray-600 text-white' onChange={handleLanguageChange}>
              { SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value= {lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>)}
            <button className='bg-purple-700 text-white p-2 m-2 rounded-lg'
             onClick={handleGPTSearchClick}>
              {showGPTSearch?"Home Page": "GPT Search"}
              </button>
         
         
         <button onClick ={handleSignOut}className='font-bold text-white'>Sign Out</button>
         </div>)}
    </div>
    
  )
}

export default Header;