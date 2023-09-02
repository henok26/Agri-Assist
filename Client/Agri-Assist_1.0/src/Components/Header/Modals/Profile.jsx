import React from 'react';
import { Link } from 'react-router-dom';
// import closebtn from '../../../assets/Agri-Connect/closebtn.png'
import { AiFillCloseCircle } from "react-icons/ai";
const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;


  return (
     <div className="fixed inset-0 z-50 flex items-start left-[850px] top-[50px] justify-start overflow-x-hidden overflow-y-auto">
      <div className="relative w-auto max-w-md mx-auto my-6 ">
        <div className="bg-gray-50 rounded-lg shadow-lg">
          <div className="flex flex-row p-4 justify-between">
            <div className='flex flex-col mr-2 gap-2 font-bold'>
              {/* <Link
              className='my-2  bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
              to='/signin'> Sign Up</Link>
            <Link
              className='my-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
              to='/register'>
              Sign In
            </Link>
            </div>
             <div className=' flex flex-col '>
              <Link
              className='my-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
              to='/signin'>Policy</Link>
            <Link
              className='my-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
              to='/register'>
              Legal
            </Link> */}
               <Link
               onClick={onClose}
          to="/privacy"
          className="block px-4 py-2 text-sm text-gray-700 text-center  rounded-sm bg-gray-100 hover:bg-gray-200 border-xl-gray-600 "
        >
          Pricvacy and Policy
        </Link>
              <Link
              onClick={onClose}
          to="/signin"
          className="block px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 text-center"
        >
          Sign in
        </Link>
        <Link
        onClick={onClose}
          to="/register"
          className="block px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 text-center"
        >
          Sign up
        </Link>
               <button className="my-3  flex justify-end text-white font-bold py-4 px-4 rounded-full" onClick={onClose}>
                {/* <img src={ closebtn }  alt='close'/> */}
                <AiFillCloseCircle  className='text-gray-700 w-7 h-7 hover:text-gray-500'/>
             </button>
            </div>
            
          </div>
         
        </div>
      </div>
      {/* <div className="relative inset-0 z-40 bg-black opacity-50"></div> */}
    </div>
  );
};

export default ProfileModal;