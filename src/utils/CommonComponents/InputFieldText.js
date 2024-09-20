import React from 'react'

export default function InputFieldText({ placeholder, inputValue, inputType, onChange, styles, disabled, display }) {
  return (
    <div className="form-group" style={{ display: display }}>
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
