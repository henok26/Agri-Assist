import axios from 'axios';
import React, { useState } from 'react'

function Predict() {
    const [crop,setCrop] = useState('')

    if(!localStorage.getItem('myData')){
            localStorage.setItem('myData', JSON.stringify(""));
        
    }
    const token =JSON.parse( localStorage.getItem('myData'));
        const accessT = token?.tokens?.accessToken
        console.log( accessT)

    const handlePredict = ()=>{
        

    }

    const [error , setErrors] = useState("")
    const [formValues, setFormValues] = useState({
        nitrogen: "",
        Potasium: "",
        fospurus: "",
        humidity: "",
        temprature: "",
        soilph: "",
        rainfall: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });

    };

    const handleSignIn = async(e) => {

        const token = localStorage.getItem('myData');
    
        console.log("accessTokoen => " , token)

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
        const url = 'http://localhost:5000/api/predict'
        const data = {
            n:parseFloat(formValues.nitrogen) || 0,
            p:parseFloat(formValues.nitrogen) ||0,
            k:parseFloat(formValues.fospurus) || 0,
            temp:parseFloat(formValues.temprature) || 0,
            hum:parseFloat(formValues.humidity) || 0,
            ph:parseFloat(formValues.soilph) || 0,
            rainfall:parseFloat(formValues.rainfall) ||0,

        }
        

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessT}`,
            'Accept': "*/*",
            "User-Agent":"nahom"
  };
        const response = await axios.post(url , data ,{ headers:headers }) 
        console.log(response.statusText)
        if (response.status === 200) {
            // localStorage.setItem(response.data)

            // localStorage.setItem('myData', JSON.stringify(response.data));
            // window.navigator.push('/')
            // console.log(response.status)
            setCrop(JSON.stringify(response.data))
            
        }else{
            console.log(response.status)
            setErrors('Wrong Credentials try Again!!')
            console.log(response.statusText)
        }
    };

  return (
    <div className='w-screen h-auto bg-gray-200 mt-[99px]'>
    <div className="mt-10 mx-[80px] pb-[10px] ">
        <div className="flex justify-center pt-10">
            <div className="text-[50px] font-bold ">
                Predict The Crop 
            </div>
        </div>
   
      <div className="grid gap-2 lg:grid-cols-3 mt-[10px] pt-10">
           
                <div className="w-full rounded-lg shadow-md lg:max-w-sm" >
                    
                    <div className="p-4">
                        <h4 className="text-xl font-semibold text-blue-600">
                            Data from The Device and Satelite
                            {/* {items.title} */}
                        </h4>
                        <div className="mb-2 pt-4 leading-normal">
                        {/* {items.content} */}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                               Nitrogen(N)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="nitrogen"
                                    name="nitrogen"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.nitrogen}
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
                                        Nitrogen Is Required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                               Fosfurus(p)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="fospurus"
                                    name="fospurus"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.fospurus}
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
                                        Fosphures Is Required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                               potasium(k)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="Potasium"
                                    name="Potasium"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.Potasium}
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
                                        Potasium Is Required
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                               Temprature(F)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="temprature"
                                    name="temprature"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.temprature}
                                    onChange={handleInputChange}
                                    required
                                    className={`${formErrors.includes("Temprature is required")
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 transition duration-150 ease-in-out`}
                                />
                                {/* Email validation error message */}
                                {formErrors.includes("Email address is required") && (
                                    <p className="mt-2 text-sm text-red-500">
                                        Temprature Is Required
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Soil Ph
                            </label>
                            <div className="mt-1">
                                <input
                                    id="soilph"
                                    name="soilph"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.soilph}
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
                                        Soil Ph Is Required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                               Rain Fall
                            </label>
                            <div className="mt-1">
                                <input
                                    id="rainfall"
                                    name="rainfall"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.rainfall}
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
                                        Rain Fall Is Required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                               Humidity
                            </label>
                            <div className="mt-1">
                                <input
                                    id="humidity"
                                    name="humidity"
                                    type="number"
                                    // autoComplete="username"
                                    value={formValues.humidity}
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
                                        Rain Fall Is Required
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        
                        



                        </div>
                        <button onClick={handleSignIn} className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                            predict
                        </button>
                    </div>
                </div>
            {/* ))} */}

            <div className="w-full rounded-lg shadow-md lg:max-w-sm" >
                    
                    <div className="p-4">
                        <h4 className="text-xl font-semibold text-blue-600">

                            {/* {items.title} */}
                            Recomened Crop
                        </h4>
                        <h1>Crop : {crop}</h1>
                        
                        <button onClick={handlePredict} className="px-4 py-2 text-sm flex justify-center text-blue-100 bg-blue-500 rounded shadow">
                            Reset
                        </button>
                    </div>
                </div>
        </div>
        </div>
</div>
  )
}

export default Predict