import React from 'react'

export default function InputFieldText({ placeholder, inputValue, inputType, onChange, styles, disabled }) {
  return (
    <div className='form-group'>
      <label>{placeholder}</label>
      <input
        type={inputType}
        className='form-control'
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        style={styles}
        disabled={disabled}
      />
    </div>
  )
}
