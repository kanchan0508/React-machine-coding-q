import React from 'react'

const Button = ({onClick, text}) => {
  return (
    <div>
       <button className='bg-green-300 text-white w-14 h-11 rounded-lg min-w-fit pl-4 pr-4' onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button
