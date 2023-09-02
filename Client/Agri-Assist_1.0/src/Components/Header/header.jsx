import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
// import logo from './logo.png'
import logo from '../../assets/Agri-Connect/logo.png'
import person from '../../assets/Agri-Connect/account.png'
import themeimg from '../../assets/Agri-Connect/theme.png'
import { motion } from 'framer-motion'
import './Modals/index.css'

import ProfileModal from './Modals/Profile'

function Header() {

  const [isOpen, setIsOpen] = useState(false);

   const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  // const handleProfile=() => {
  //   return ProfileModal;
  //  }

  const [theme,setTheme]=useState('light')

   function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
   
     <nav className="z-[100] fixed top-0 w-full flex items-center justify-between px-[133px] py-[21px] bg-white  overflow-x-hidden  shadow-lg">
      <div className="flex items-center">
        <Link className='' to='/'>
          <img
          className="w-full"
          src={ logo}
          alt="Logo"
        />
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          className="text-gray-800 font-bold mx-3 hidden sm:block"
          to="/"
        >
          Home
        </Link>
         <Link
          className="text-gray-800 font-bold mx-3 hidden sm:block"
          to="/market-data"
        >
          Market Data
        </Link>
        <Link
          className="text-gray-800 font-bold mx-3 hidden sm:block"
          to="/blog"
        >
          Blog
        </Link>
         <Link
          className="text-gray-800 font-bold mx-3 hidden sm:block"
          to="/about"
        >
          About User
        </Link>
         <Link
          className="text-gray-800 font-bold mx-3 hidden sm:block"
          to="/contact"
        >
          Contact Us
        </Link>
        <div className="inline-flex space-x-10 items-center justify-start ml-5">
        <div className="flex w-12 h-7">
        <div className="flex items-center justify-between flex-1 h-full py-0.5 pl-5 pr-0.5 bg-gray-800 rounded-full">
              <div className={`flex items-start justify-between p-1 mx-auto bg-white shadow rounded-full ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}>
                <img className="w-fit h-fit" src={themeimg} alt='theme'/>
              </div>
            </div>
    </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={ {scale:0.9}}
          onClick={ handleOpen}
          className=" btn inline-flex space-x-5 items-center justify-start ml-5 ">
          <img src={ person} className="w-fit h-fit" alt="account"/>
        </motion.button>
        <ProfileModal isOpen={isOpen} onClose={handleClose} />
  </div>
</nav>
  )
}

export default Header