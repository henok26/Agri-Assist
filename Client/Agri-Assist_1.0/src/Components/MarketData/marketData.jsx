import React from 'react'
import downloadbtn from '../../assets/Agri-Connect/downloadbtn.png'
import { motion } from 'framer-motion'

function MarketData() {
  const handleDownload = () => {
    
  }
  return (
    <div className=' mt-[99px] mb-[99px]  w-screen  pt-[50px] px-[77px] '>
      <div className="flex justify-between">
      <h1 className='text-[35px] text-gray-700 font-bold mb-2 text-start'>Market Data</h1>
        <motion.button
           whileHover={{ scale: 1.1 }}
          whileTap={ {scale:0.9}}
          onClick={handleDownload}
          className='bg-gray-100 hover:bg-gray-300 text-white  pt-[3px] pb-[3.17px] px-[5px] rounded-circle' >
          <img src={ downloadbtn } alt='donload Btn'/>
      </motion.button> 
      </div>
      <table className='w-full bg-gray-700'>
        <thead className='bg-gray-700 border-b-2 border-l-2 border-r-2 border-gray-800 rounded-lg'>
          <tr>
          <td className='p-3 text-sm border-r-2 font-semibold tracking-wide text-left'>Name</td>
          <td className='p-3 text-sm border-r-2 font-semibold tracking-wide text-left'>Year</td>
          <td className='p-3 text-sm border-r-2 font-semibold tracking-wide text-left'>Price </td>
          <td className='p-3 text-sm border-r-2 font-semibold tracking-wide text-left'>Change</td>
          <td className='p-3 text-sm border-r-2 font-semibold tracking-wide text-left'>Up</td>
          <td className='p-3 text-sm border-r-2 font-semibold tracking-wide text-left'>Down</td>
          </tr>
       
        </thead>
        <tbody>
          <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr>
            <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Beans</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>-120</td>
          </tr >
            <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr>
           <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr>
           <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr> <tr className='bg-white'>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>Wheate</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2015</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>2000 ETB</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>+150</td>
            <td className='p-3 text-sm text-gray-700 border-b-2 border-r-2'>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MarketData