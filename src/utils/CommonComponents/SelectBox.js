import React from 'react'

export default function SelectBox({options, onChange}) {
  return (
      <select className="form-control show-tick" onChange={(e) => onChange(e)}>
          {options.map((optionsValue, index) => (
                <option value={optionsValue?.value} key={index}> {optionsValue.label}</option>
          ))}
                
              </select>
  )
}
