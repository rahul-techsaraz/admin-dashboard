import React from 'react'

export default function SelectBox({options, onChange,styles}) {
  return (
      <select className="form-control show-tick" onChange={(e) => onChange(e)} style={styles}>
          {options.map((optionsValue, index) => (
                <option value={optionsValue?.value} key={index}> {optionsValue.label}</option>
          ))}
                
              </select>
  )
}
