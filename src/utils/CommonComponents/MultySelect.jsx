import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import '../../assets/css/Dropdown.css'

const MultySelect = ({ options, label, onChange, value, disabled }) => {
  return (
    <div className='form-group auto-complete'>
      <label>{label}</label>
      <Autocomplete
        multiple={true}
        autoComplete={true}
        disablePortal
        id='tags-outlined'
        options={options}
        sx={{ width: 300 }}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={(e, value) => onChange(e, value)}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}

export default MultySelect
