import React, { useEffect, useState } from 'react'
import  {read ,utils}  from 'xlsx';



function MarketDataUpload() {
    const [file,setFile] = useState({})
    
    const handleChange=(e)=>{
         e.preventDefault();
         if(e.target.files){
            const reader= new FileReader();

            reader.onload=async (e)=>{
                const data=e.target.result
                const workbook = await read(data,{type :"array"})
                const sheetName = workbook.SheetNames[0]
                const worksheet= workbook.Sheets[sheetName]
                const json= await utils.sheet_to_json(worksheet)
                console.log(json)
                setFile(json)
            }
            reader.readAsArrayBuffer(e.target.files[0]);

         }
    }

    useEffect(()=>{
       
    },[])
  return (
    <div>
        <form action="POSt">
        <input type="file" className=' mt-[200px]' onChange={handleChange} />
            
        </form>
    </div>
  )
}

export default MarketDataUpload