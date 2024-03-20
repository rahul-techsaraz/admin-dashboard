import React from 'react'

export default function InputFieldText({placeholder,inputValue,inputType,onChange}) {
  return (
  
              <div className="form-group">
                <input type={inputType} className="form-control" value={inputValue} placeholder={placeholder} onChange={(e) => onChange(e)} />
              </div>
          
  )
}
