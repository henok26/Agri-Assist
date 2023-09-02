import React, { useState } from "react";
// import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { BsMicrosoft, BsGoogle ,BsFacebook } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";

import axios from "axios";

const SignIn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible,setIsVisible] = useState(false)
    const [error , setErrors] = useState("")
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignIn = async(e) => {
        e.preventDefault();

        // Form validation
        const errors = [];

        if (formValues.username === "") {
            errors.push("Username is required");
        }

        if (formValues.password === "") {
            errors.push("Password is required");
        }

        setFormErrors(errors);

        if (errors.length === 0) {
            console.log("Form Submitted");
            // return <>Form Submited...</>
        }
        //to handle the sign in 
        const url = 'http://localhost:5000/signin'
        const data = {
            username: formValues.username,
            password:formValues.password
        }
        const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer '
            'Accept': "*/*",
            // "User-Agent":"nahom"
  };
        const response = await axios.post(url , data ) 
        console.log(response.statusText)
        if (response.status === 200) {
            // localStorage.setItem(response.data)

            localStorage.setItem('myData', JSON.stringify(response.data));
            // window.navigator.push('/')
            // console.log(response.status)

        }else{
            console.log(response.status)
            setErrors('Wrong Credentials try Again!!')
            console.log(response.statusText)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link
                        to={'/register'}
                        onClick={() => setIsOpen(!isOpen)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSignIn}>
                        {/* Email input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                User Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    value={formValues.username}
                                    onChange={handleInputChange}
                                    required
                                    className={`${formErrors.includes("User Name is required")
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 transition duration-150 ease-in-out`}
                                />
                                {/* Email validation error message */}
                                {formErrors.includes("Email address is required") && (
                                    <p className="mt-2 text-sm text-red-500">
                                        User Name is required
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password input */}
         
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    //   autoComplete=""
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    required
                                    className={`${formErrors.includes("Password is required")
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 transition duration-150 ease-in-out`}
                                />
                                {/* Email validation error message */}
                                {formErrors.includes("Password is required") && (
                                    <p className="mt-2 text-sm text-red-500">
                                        Password is required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="justify-center flex">
                        <button className="p-2 text-white w-[100px] font-bold bg-blue-900 hover:bg-blue-600  rounded-lg justify-center" type="submit" >Sign In </button>

                        </div>
                        <div className="flex flex-1 justify-center">
                            OR
                        </div>
                        <div className="flex justify-evenly  gap-1 mt-4 ">

                        <BsMicrosoft className="w-5 h-5" color="#0F3A62 hover:text-[#007ff7]" />
                        <BsGoogle color="#0F3A62 "  className="w-5 h-5 hover:text-[#007ff7]"/>
                        {/* <BsMicrosoft color="#0F3A62" /> */}
                        <BsFacebook color="#0F3A62"  className="w-5 h-5 hover:text-[#007ff7]"/>
         
        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default SignIn