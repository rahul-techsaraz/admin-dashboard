import React from 'react'

export default function CustomButton({lable,isDisabled,onClick,styles}) {
  return (
    <button type="button" className="btn btn-primary btn-round" style={{...styles,margin:'0px 30px',padding:'0px 20px', width:"300px",height:"40px"}} disabled={isDisabled} onClick={() => onClick()}>{lable}</button>
  )
}
