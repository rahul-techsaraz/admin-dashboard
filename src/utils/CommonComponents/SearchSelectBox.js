import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../../assets/css/Dropdown.css';

export default function SearchSelectBox({options, label, onChange, disabled, inputValue}) {
  return (
    <div className="form-group auto-complete">
      <label>{label}</label>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={(e,value)=>onChange(e,value)}
        disabled={disabled}
        inputValue={inputValue}
    />
    </div>
    
  )
}
