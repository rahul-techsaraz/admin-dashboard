import React from 'react'

export default function SelectBox({ label, options, onChange, styles, inputValue }) {
  return (
    <>
      <div className='form-group'>
        <label>{label}</label>
        <select className='form-control show-tick' onChange={(e) => onChange(e)} style={styles} value={inputValue}>
          {options?.map((optionsValue, index) => (
            <option value={optionsValue?.value} key={index}>
              {' '}
              {optionsValue.label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
