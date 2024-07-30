import React from 'react'

export default function TextArea({ placeholder, inputValue, noOfROws, noOfCols, onChange, styles, fieldName }) {
  return (
    <div className='form-group'>
      <label>{fieldName}</label>
      <textarea
        className='form-control'
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        style={styles}
        row={noOfROws}
        cols={noOfCols}
      />
    </div>
  )
}
