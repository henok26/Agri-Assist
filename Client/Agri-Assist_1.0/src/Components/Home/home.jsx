import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import firstImg from '../../assets/Agri-Connect/FirstLogo.png'
import logoXl from '../../assets/Agri-Connect/Logo-xl.png'
import logoApp from '../../assets/Agri-Connect/Agri-connectApp.png'
import appleLogo from '../../assets/Agri-Connect/appleIcn.png'
import playstoreLogo from '../../assets/Agri-Connect/playstoreIcn.png'
import computer from '../../assets/Agri-Connect/computer.png'
import cloudUP from '../../assets/Agri-Connect/cloudup.png'
import farmfild from '../../assets/Agri-Connect/FarmField.png'
import dataDrivenAgriculture from '../../assets/Agri-Connect/DataDrivenAgriculture.png'
import cloudIcn from '../../assets/Agri-Connect/cloudicn.png'
import userIcn from '../../assets/Agri-Connect/usericn.png'
import dangerIcn from '../../assets/Agri-Connect/dangericn.png'
import thunderIcn from '../../assets/Agri-Connect/thundericn.png'
import soillMachine from '../../assets/Agri-Connect/Soil.png'
import soillDevice from '../../assets/Agri-Connect/soil-device.png'
import soillDevice1 from '../../assets/Agri-Connect/DataDroneTablet.png'
import appBg from '../../assets/Agri-Connect/Union.png'
import appHome from '../../assets/Agri-Connect/appHome.png'
import ourServices from '../../assets/Agri-Connect/ourServices.png'
import  axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  // Global settings for AOS here
  duration: 800,
  anchorPlacement: "center-bottom",
});


// import { motion , useScroll , useTransform } from 'framer-motion'
function Home() {
  

  const [farmers,setFarmers] =useState([])

  useEffect(()=>{
    const farmersCount=async()=>{
      const url='http://localhost:5000/regitered-farmers';
    try {
      const response= await axios(url)
      setFarmers(response.data.count)
      console.log(response.data.count)
    } catch (error) {
      console.log("Error with internal server or another error!!!")
    }
    
    } 
    farmersCount()

  },[])

  const contentData = {
    title: 'Mange Your Data',
    body: 'The Agri-Connect ecosystem allows you to collect data at every level of your operation and share this data with everyone that matters to you. Growers, farm hands, agronomists, input providers, contractors, banks, accountants, land owners and many other stakeholders are now able to work together on the same set of data.',
    imageIcn: "cloud",
    subTitle1: "Collect and access your Data easily.",
    subBody1: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle2: "Collect and access your Data easily.",
    subBody2: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle3: "Collect and access your Data easily.",
    subBody3:"Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    link: '/basics-of-agri-connect',
    mainImage:`${soillDevice1}`
  }

  const [content, setContent] = useState(contentData);
  
  // let { scrollYProgress } = useScroll();
  // let y = useTransform(scrollYProgress, [0.1], ["0%", "50%"]);


  const hanldeSoil = () => {
    
     const contentSoilInfo = {
    title: 'Soil Info',
    body: 'The Agri-Connect ecosystem allows you to collect data at every level of your operation and share this data with everyone that matters to you. Growers, farm hands, agronomists, input providers, contractors, banks, accountants, land owners and many other stakeholders are now able to work together on the same set of data.',
    imageIcn: "cloud",
    subTitle1: "Collect and access your Data easily.",
    subBody1: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle2: "Collect and access your Data easily.",
    subBody2: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle3: "Collect and access your Data easily.",
    subBody3:"Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    link: '/soil',
    mainImage:`${soillDevice1}`
     }
    setContent(contentSoilInfo)
  }
  const handleBasicsofAgriConnect = () => {
     const contentDataBasics = {
    title: 'Mange Your Data',
    body: 'The Agri-Connect ecosystem allows you to collect data at every level of your operation and share this data with everyone that matters to you. Growers, farm hands, agronomists, input providers, contractors, banks, accountants, land owners and many other stakeholders are now able to work together on the same set of data.',
    imageIcn: "cloud",
    subTitle1: "Collect and access your Data easily.",
    subBody1: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle2: "Collect and access your Data easily.",
    subBody2: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle3: "Collect and access your Data easily.",
    subBody3:"Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    link: '/basics-of-agri-connect',
    mainImage:`${soillDevice1}`
     }
    setContent(contentDataBasics)
  }
  const handleFarmMgmt = ()=>{
     const contentFarmMgmt = {
    title: 'Farm Mangement',
    body: 'The Agri-Connect ecosystem allows you to collect data at every level of your operation and share this data with everyone that matters to you. Growers, farm hands, agronomists, input providers, contractors, banks, accountants, land owners and many other stakeholders are now able to work together on the same set of data.',
    imageIcn: "cloud",
    subTitle1: "Collect and access your Data easily.",
    subBody1: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle2: "Collect and access your Data easily.",
    subBody2: "Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    subTitle3: "Collect and access your Data easily.",
    subBody3:"Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.",
    link: '/farm-mgmt',
    mainImage:`${soillDevice1}`
     }
    setContent(contentFarmMgmt)
  }
  const handleMarketData = () => {
      const contentMarketData = {
    title: 'Market Data',
    body: 'Weather and Climate data , collected through remote sensing, is crucial for modern agriculture. By using this information, farmers can make more informed decisions, optimize their crop growth, and increase their yields and profits.',
    imageIcn: "cloud",
    subTitle1: "Yield prediction",
    subBody1: "Weather and climate data, combined with crop growth models, can be used to predict yields for different crops.",
    subTitle2: "Disease and pest management",
    subBody2: " Remote sensing can help identify areas of farmland that are at risk of disease or pest outbreaks.",
    subTitle3: "Irrigation management",
    subBody3:" To determine when crops need to be irrigated, and how much water is needed. This information can help farmers optimize their irrigation practices, conserve water resources, and reduce their operating costs.",
    link: '/market-data',
    mainImage:`${soillDevice1}`
      }
    setContent(contentMarketData)
    
  }
  const handleWeatherandClimate = () => {
      const contentDataWeatherCllimate = {
    title: 'Weather & Climate',
    body: 'Weather and Climate data , collected through remote sensing, is crucial for modern agriculture. By using this information, farmers can make more informed decisions, optimize their crop growth, and increase their yields and profits.',
    imageIcn: "cloud",
    subTitle1: "Yield prediction",
    subBody1: "Weather and climate data, combined with crop growth models, can be used to predict yields for different crops.",
    subTitle2: "Disease and pest management",
    subBody2: " Remote sensing can help identify areas of farmland that are at risk of disease or pest outbreaks.",
    subTitle3: "Irrigation management",
    subBody3:" To determine when crops need to be irrigated, and how much water is needed. This information can help farmers optimize their irrigation practices, conserve water resources, and reduce their operating costs.",
    link: '/weather-and-climate',
    mainImage:`${soillDevice1}`
      }
    setContent(contentDataWeatherCllimate)
    
  }
  const hanldeDeasise = () => {
      const contentDeasise = {
    title: 'Deasise Detection',
    body: 'Weather and Climate data , collected through remote sensing, is crucial for modern agriculture. By using this information, farmers can make more informed decisions, optimize their crop growth, and increase their yields and profits.',
    imageIcn: "cloud",
    subTitle1: "Yield prediction",
    subBody1: "Weather and climate data, combined with crop growth models, can be used to predict yields for different crops.",
    subTitle2: "Disease and pest management",
    subBody2: " Remote sensing can help identify areas of farmland that are at risk of disease or pest outbreaks.",
    subTitle3: "Irrigation management",
    subBody3:" To determine when crops need to be irrigated, and how much water is needed. This information can help farmers optimize their irrigation practices, conserve water resources, and reduce their operating costs.",
    link: '/deasise',
    mainImage:`${soillDevice1}`
      }
    setContent(contentDeasise)
  }
  
  return (
    <div className='max-w-screen mx-auto mr-0' >
       {/* <motion.div
          style={{ y }}
          className=""
        >-
        </motion.div> */}
      <section  data-aos-duration="1000"  data-aos="fade-up" className='mt-[80px] sm:mt-16'>
       
        <div className=" ">
          <div className={` `} >

            <img className='w-screen h-full' src={ firstImg} alt="" />
            <div className="absolute top-[200px] left-[142px] ">
                <h1 className=' text-[#FFC700] text-[56px] font-serif font-bold' >
              The Future of Agriculture
            </h1>
              <div className="flex">
                <h1 className='text-white text-[56px] font-serif font-bold' >
              Is Now.
              </h1>
              <h1 className='text-[#FFC700] text-[56px] font-serif font-bold'>Agri-Connect.</h1>
            </div>
              <p className=' text-[#ffffff] text-[24px] text-bold max-w-3xl font-bold mt-5'> Data Driven Agriculture For A better Productivity </p>
              <p className='text-[#ffffff] text-[16px] max-w-[638px] mt-1'> Data Driven Agriculture is the best way of Agriculture that makes the Agriculturemore productive that makes us rich and another shit  </p>
             
              <div className='mt-[60px] '>
              <Link to= '/signin' className='bg-[#ffffff] border-b-4 shadow text-[#022e0b] font-bold hover:bg-[#022e0b] hover:shadow-2xl hover:text-white hover:font-bold px-[35px] py-5 rounded-full'>Get Started</Link>
              </div>  
              
            </div>
            
          </div>
          <div className="w-[598px] h-[598px] absolute top-[90px] left-[740px] ">
            
                <img src={logoXl} alt="logoxl" className=' w-fit h-fit'/>
              </div>
          </div>
        </section>
        <section id="about-us" className="w-screen mt-[96px] h-[262px] bg-gray-200">
        <div className="flex justify-between pt-[72px] pb-[68px] px-[200px]">
          <div className="relative items-center">
            <p className='text-[#265A1F] max-w-[200px] text-center text-[58px]'>{farmers.length}</p>
            <p className='text-[#265A1F] max-w-[158px] text-center text-[19px]'>Farmers Joined And Impacted</p>
          </div>
          <div className="items-center">
            <p className='text-[#265A1F] max-w-[200px] text-[58px]'>87,000</p>
            <p className='text-[#265A1F] max-w-[158px] text-[19px]'>AGRO-BUSINESSES
HELPED</p>
          </div>
          <div className="">
            <p className='text-[#265A1F] max-w-[200px] text-[58px]'>790+</p>
            <p className='text-[#265A1F] max-w-[158px] text-[19px]'>AGRICULTURAL
COMMUNITY CREATED</p>
          </div>
          <div className="">
            <p className='text-[#265A1F] max-w-[200px] text-[58px]'>29%</p>
            <p className='text-[#265A1F] max-w-[158px] text-[18px]'>AVERAGE ANNUAL INCREASE
IN FARMER’S INCOME</p>
          </div>
        </div>
      </section>
      <section className='flex justify-center space-x-[50px] mt-[99px]' >
        <div className="bg-[#F4F4F4] w-[525px] h-[385px] rounded-xl pt-[37px] pl-[87px]">
          <img src={computer} alt="computer" />
          <h1 className='text-[#01312C] text-[18px] font-medium mt-[33.5px] '> Agri-Connect is a data managment ecosystem</h1>
          <p className='w-[394px] text-[#01312C] text-[15px] mt-2'> Farm Planning, Budgeting, Track and Manage Product Inputs, Job Management, Compliance, Agronomy, Logistics & Grower Services, Precision.</p>
        </div>
        <div className="bg-[#F4F4F4] w-[525px] h-[385px] rounded-xl  pt-[21px] pl-[87px]">
          <img src={cloudUP} alt="cloud" />
          <h1 className='text-[#01312C] text-[18px] font-medium mt-[33.5px]'> Agri-Connect is used by:</h1>
          <p className='w-[394px] text-[#01312C] text-[15px] mt-2'> Growers, Agronomists, Retailers, Application Contractors, Soil Samplers, anyone providing a service to crop growers.</p>
        </div>
      </section>
      <section className='mt-[99px] max-w-screen h-[513px]'>
           <img src={ farmfild} className='w-screen h-[513px]' alt="farm"/>
      </section>
      <section data-aos="fade-left"  data-aos-duration="200" data-aos-offset="700" className='flex justify-center space-x-[41px] mt-[99px] max-w-screen'>
        <div className="items-start max-w-[442px] h-[291px] ">
          <h1 className='text-[25px] w-[440px]'>Mange Your Data </h1>
          <h2 className='text-[12px]'>The Agworld ecosystem allows you to collect data at every level of your operation and share this data with everyone that matters to you. Growers, farm hands, agronomists, input providers, contractors, banks, accountants, land owners and many other stakeholders are now able to work together on the same set of data.</h2>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={cloudIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1>Collect and access your Data easily.</h1>
              <h2>Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.</h2>
            </div>
          </div>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={userIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1>Share your data with others.</h1>
              <h2>Set up your team with personalised accounts to ensure everyone can see only what they need to get their job done.</h2>
            </div>
          </div>
        </div>
        <div className="">
          <img src={ dataDrivenAgriculture} alt="dataDrivenAgriculture"/>
        </div>


      </section>
       <section data-aos="fade-right" data-aos-duration="200" data-aos-offset="700" className='flex justify-center space-x-[41px] mt-[99px] max-w-screen'>
        <div className="">
          <img src={ soillMachine} alt="dataDrivenAgriculture"/>
        </div>
        <div className="items-start max-w-[442px] h-[291px] ">
          <h1 className='text-[25px] w-[440px]'>How Does Agri-Connect help on the farm</h1>
          <h2 className='text-[12px]'>Agri-Connect has a unique structured data system which means that you can take all your historical farm records and data shared from advisors, and turn them into unparalleled insights for more profitable decisions.</h2>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={thunderIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1>Get information fast.</h1>
              <h2>Agri-Connect has been designed to keep you and your advisors on the same page, everyone can see any updates or changes in real time.</h2>
            </div>
          </div>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={dangerIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1>Reduce erros.</h1>
              <h2>Agri-Connect gives you clarity on your agronomic and financial plan for the season with all your product, operational and financial requirements included in an easy to understand format..</h2>
            </div>
          </div>
        </div>
      


      </section>
    

      <section data-aos="fade-up"  data-aos-duration="1000" data-aos-offset="1000" className='flex justify-center mt-[99px]'>
        <div className="relative">
          
            <img src={ourServices} className="" alt="ourServices" />
            <h1 className='absolute top-[272px] left-[83.26px] right-[83px] text-center text-[30px] font-extrabold text-white'>
            Modern farm management software that works where you do
            </h1>
        </div>
      </section>
      <section className='pt-[99px] w-screen h-[149px] flex justify-center gap-4 mb-4'>
        <button onClick={handleBasicsofAgriConnect} className=' px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white '>
            Agri-Connect Basics
        </button>
         <button onClick={handleWeatherandClimate} className='px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white '>
            Wither & Climate 
        </button>
         <button onClick={hanldeSoil} className='px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white '>
           Soil Info
        </button>
         <button onClick={hanldeDeasise} className='px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white '>
           Disease Detection 
        </button>
         <button onClick={handleFarmMgmt} className='px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white '>
          Farm Management
        </button>
         <button onClick={handleMarketData} className='px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white '>
            Market Data
        </button>
        
      </section>

      
       <section className='flex justify-center space-x-[41px] mt-[40px] pb-[20px] max-w-screen'>
        <div className="items-start max-w-[442px] h-[291px] ">
          <h1 className='text-[23px] w-[440px] font-bold'>{content.title }</h1>
          <h2 className='text-[15px]'>{ content.body }</h2>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={cloudIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1 className='text-[14px] font-semibold'>{ content.subTitle1 }</h1>
              <h2 className='text-[14px]'>{content.subBody1}</h2>
            </div>
          </div>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={userIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1 className='text-[14px] font-semibold'>{ content.subTitle2 }</h1>
              <h2 className='text-[14px]'>{ content.subBody2 }</h2>
            </div>
          </div>
           <div className="flex justify-start gap-x-3 mt-5">
            <img src={userIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1 className='text-[14px] font-semibold'>{ content.subTitle3 }</h1>
              <h2 className='text-[14px]'>{ content.subBody3 }</h2>
            </div>
          </div>
          <div className="mt-[20px]">
            <Link  to={content.link} className=' px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white  '> Read More </Link>
          </div>
        </div>
        <div className="">
          <img src={ content.mainImage} alt="dataDrivenAgriculture" className='w-[550px] rounded-2xl' />
        </div>
      </section>
           {/* <section className='flex justify-center space-x-[41px] mt-[99px] pb-[40px] max-w-screen'>
        <div className="items-start max-w-[442px] h-[291px] ">
          <h1 className='text-[25px] w-[440px] font-bold'>Mange Your Data </h1>
          <h2 className='text-[15px]'>The Agri-Connect ecosystem allows you to collect data at every level of your operation and share this data with everyone that matters to you. Growers, farm hands, agronomists, input providers, contractors, banks, accountants, land owners and many other stakeholders are now able to work together on the same set of data.</h2>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={cloudIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1 className='text-[15px]'>Collect and access your Data easily.</h1>
              <h2 className='text-[15px]'>Your farm data is stored in the cloud, which allows you access from any computer or iPad/iPhone.</h2>
            </div>
          </div>
          <div className="flex justify-start gap-x-3 mt-5">
            <img src={userIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1 className='text-[15px]'>Share your data with others.</h1>
              <h2 className='text-[15px]'>Set up your team with personalised accounts to ensure everyone can see only what they need to get their job done.</h2>
            </div>
          </div>
           <div className="flex justify-start gap-x-3 mt-5">
            <img src={userIcn} className="w-fit h-fit"  alt="" />
            <div className="felx justify-start space-x-2 ">
              <h1 className='text-[15px]'>Share your data with others.</h1>
              <h2 className='text-[15px]'>Set up your team with personalised accounts to ensure everyone can see only what they need to get their job done.</h2>
            </div>
          </div>
          <button className='my-[20px] px-[16px] py-3 border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white  '> Read More </button>
        </div>
        <div className="">
          <img src={ soillDevice} alt="dataDrivenAgriculture"/>
        </div>


      </section> */}
      <section   data-aos="fade-up-left" className='w-full h-[353px] mt-[99px] bg-[#266937]'>
        <div className='flex justify-center pt-[45px]'>
          <div>
            <p className=' text-[36px] text-[#FFFFFF]  font-serif-700  font-semibold'>
          Sign Up For Exclusive Offers, Care Tips, Newsletters And More!
            
          </p>
           <p className='flex justify-center text-[16px] text-[#FFFFFF]  font-serif-700 '>
          Sign u p to our newsletter to save 15% OFF your order!
            </p>
            <div className= 'flex justify-center pt-10 '>
              <div className="inline-flex space-x-1.5 items-start justify-start" style={{width: 736, height: 56,}}>
    <input className="flex-1 text-base font-medium text-white  h-full px-8 pt-4 pb-5 shadow border-2 rounded-2xl border-gray-50" placeholder="Name"></input>
    <div className="w-96 h-full shadow border-2 rounded-2xl border-gray-50">
        <input className="flex-1 text-base font-medium text-white h-full px-8 pt-4 pb-5 rounded" placeholder="Email address"></input>
    </div>
    <div className="flex items-center justify-center w-44 h-full px-3 py-2.5 bg-white shadow rounded-2xl">
        <p className="text-sm font-bold leading-7 text-center text-green-800">Subscribe</p>
    </div>
</div>
            </div>
          </div>
        
        </div>
      </section>
     
      <section className='mt-[10px] mb-5 flex justify-center'>
        <img src={appBg} alt="appBg" className='absolute z-0' />
        <div className="bg-white  z-40">
        <img src={appHome} alt="" className=' w-auto h-auto'/>
        </div>
        <div className='w-[529px] ml-[193px] h-[328px]'>
          <div className="mt-[197px]  flex justify-center">
            <img src={logoApp} className='w-full h-full' alt="logoSmallApp" />
          </div>
            <div className="w-[500px] ml-5">
               Agri-Connect's easy to use apps put all the important information at your fingertips and work seamlessly, even when you don't have an internet connection. It's no wonder they've become the most rated farm management apps on the iTunes App store!
          </div>
          
          <div className="flex justify-center mt-5 ">
            <button className="m-5 p-5 w-auto flex justify-center text-[25px] font-bold border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white">
              <img src={appleLogo} className='w-auto' alt="play" />
              App Store
            </button>
            <button className=" p-5 m-5 w-auto flex justify-center text-[25px] font-bold border-2 border-[#01312C]   text-[#01312C] hover:bg-[#01312C] rounded-lg hover:text-white">
              <img src={playstoreLogo} className='w-auto' alt="play" />
              Play Store
            </button>
          </div>
        </div>

      </section>
      
    </div>
  )
}

export default Home