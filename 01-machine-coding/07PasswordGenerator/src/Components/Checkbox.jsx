import React from 'react'

const Checkbox = ({title, state, onChange}) => {
  return (
    <div className='text-white p-3'>
      <input type='checkbox' checked={state}  onChange={onChange} />
      <label>{title}</label>
    </div>
  )
}

export default Checkbox
