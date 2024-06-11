import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IconButton from '@mui/material/IconButton';


export default function UploadFile({label,onChange,onClick,styles,multiple}) {
  return (
    <>
        <div className="form-group">
            <label>{label}</label>
            <div className="form-control" style={styles}>
                <input type="file" multiple={multiple} onChange={(e) => onChange(e)}/>
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={(e)=> onClick(e)}>
                <FileUploadIcon />
                </IconButton>
            </div>
        </div>
    </>
  )
}
