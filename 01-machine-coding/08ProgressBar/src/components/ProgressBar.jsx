import React from 'react'

const ProgressBar = ({value = 25}) => {
  return (
    <div className= 'flex justify-center items-center mt-10 overflow-hidden'>
      <div className='w-[50%] h-7 bg-slate-200 text-center justify-center '></div>
      <h1 className='absolute'>{value}%</h1>
      <div style={{
        width: `${value}%`,
      }} className='absolute h-7 bg-green-500'></div>
      
    </div>
  )
}

export default ProgressBar
