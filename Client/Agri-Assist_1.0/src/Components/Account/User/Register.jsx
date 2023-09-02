import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const[word ,setWord] =useState('Choose One')
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        phone:"",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {
            // Form validation
        const errors = [];

        if (formValues.username === "") {
            errors.push("Username is required");
        }

        if (formValues.email === "") {
            errors.push("Email Adress is required");
        }

        if (formValues.phone === "") {
            errors.push("Phone Number is required");
        }

        if (formValues.password === "") {
            errors.push("Password is required");
        }

        setFormErrors(errors);

        if (errors.length === 0) {
            console.log("Form submitted");
        }
        //to handle the sign in 
        const url = 'http://localhost:5000/register-farmer'
        const data = {
            username: formValues.username,
            password: formValues.password,
            email: formValues.email,
            phone:formValues.phone
        }
        const response = await axios.post(url, data)
        if (response.status === 200) {
            // localStorage.setItem(response.data)
            localStorage.setItem('myData', JSON.stringify(response.data));
        }
        if(response.status === 500){
            console.log("Error response",response.data)
        }
        } catch (error) {
         console.log(error)
        }

       
    };

     useEffect(() => {
            const tokens = () => {
                        // Check for tokens in localStorage
    const accessToken = localStorage.getItem('myData.tokens.accessToken');
    const refreshToken = localStorage.getItem('myData.tokens.refreshToken');
    if (accessToken && refreshToken) {
      // Redirect to homepage
      window.location.href = '/homepage';
    }
            }
            tokens()
 
        },[])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mt-[99px] flex justify-center gap-4">
                    <button onClick={()=>setWord('Farmer')} className="w-[20vh] h-[10vh] bg-gray-300 rounded-xl hover:bg-black hover:text-white">
                        <p className="text-center p-2 font-bold ">Farmer</p>
                    </button>
                    <button onClick={()=>setWord('Agro Bussiness')} className="w-[20vh] h-[10vh] bg-gray-300 rounded-xl hover:bg-black hover:text-white">
                        <p className="text-center p-2 font-bold ">
                        Agro Business

                        </p>
                    </button>
                    <button onClick={()=>setWord('Agricultural Community')}  className="w-[20vh] h-[10vh] bg-gray-300 rounded-xl hover:bg-black hover:text-white">
                        <p  className="text-center p-2 font-bold"> 
                        Agricultural Community

                        </p>
                    </button>
                    <button  onClick={()=>setWord('DEA Agent')}  className="w-[20vh] h-[10vh] bg-gray-300 rounded-xl text-center hover:bg-black hover:text-white">
                        <p className="text-center p-2 font-bold">
                        DEA Agent

                        </p>
                    </button>
                    
                    
                </div>

                <h2 className="mt-[99px] text-center text-3xl font-extrabold text-gray-900">
                    Register new {word} account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link
                        to={'/signin'}
                        onClick={() => setIsOpen(!isOpen)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        signin to your account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        {/* Username input */}
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
                                {/* Username validation error message */}
                                {formErrors.includes("Username is required") && (
                                    <p className="mt-2 text-sm text-red-500">
                                        User Name is required
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    required
                                    className={`${formErrors.includes("Email Address is required")
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 transition duration-150 ease-in-out`}
                                />
                                {/* Email validation error message */}
                                {formErrors.includes("Email Address is required") && (
                                    <p className="mt-2 text-sm text-red-500">
                                        Email Address is required
                                    </p>
                                )}
                            </div>
                        </div>
{/* Username input */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                               Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    autoComplete="phone"
                                    value={formValues.phone}
                                    onChange={handleInputChange}
                                    required
                                    className={`${formErrors.includes("Phone Number is required")
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 transition duration-150 ease-in-out`}
                                />
                                {/* Email validation error message */}
                                {formErrors.includes("Phone Number is required") && (
                                    <p className="mt-2 text-sm text-red-500">
                                        Phone Number is required
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
                        <button className="p-2 text-white w-[100px] font-bold bg-blue-900 hover:bg-blue-600  rounded-lg justify-center" type="submit" >Sign Up </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Register