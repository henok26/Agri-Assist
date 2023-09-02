import React from 'react'

function Climate() {
  return (
    <div>
      <div>
        <div className='flex justify-center mt-20 mb-20'>
          <div className="relative bg-gradient-to-r from-white to-white shadow border-2 rounded-3xl" style={{width: 1314, height: 717}}>
            <div className="inline-flex flex-col space-y-32 items-center justify-center pl-14 pr-56 pt-7 pb-32 left-0 top-0">
              <div className='flex justify-center'>
                <p className="text-center text-7xl font-extrabold text-gray-800">Weather & Climate</p>
              </div>
              <p className="leading-normal text-gray-800" style={{width: 589, height: 129}}>How It Works?<br /><br />Use data visualization tools to display climate and weather patterns over a longer period of time, such as several years or even decades. This will allow farmers to see how weather patterns have changed over time and make informed decisions about long-term crop planning.<br /></p>
              <p className="text-xl leading-normal text-gray-800" style={{width: 598, height: 90}}>Provide detailed information about microclimates in different areas, as this can affect crop yields and optimal planting times.</p>
            </div> 
            <p className="absolute text-xl leading-normal text-gray-800" style={{width: 598, height: 98, left: 707, top: 358}}>Use satellite imagery and other remote sensing technologies to monitor crop growth and health in real-time. This can help farmers identify potential issues early on and take proactive measures to address them.</p> 
          </div>
        </div>
        <div className="">
          <div className="flex justify-center">
            <iframe className='rounded-2xl mt-2' width="800" height="600" src="https://embed.windy.com/embed2.html?lat=5.375&lon=44.648&detailLat=6.354&detailLon=44.143&width=650&height=450&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Climate