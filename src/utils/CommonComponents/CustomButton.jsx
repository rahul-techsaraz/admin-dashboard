import React from 'react'

export default function CustomButton({ lable, isDisabled, onClick, styles, className }) {
  return (
    <button
      type='button'
      className={className ? className : 'btn btn-primary btn-round'}
      style={styles ? styles : { ...styles, margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
      disabled={isDisabled}
      onClick={() => onClick()}
    >
      {lable}
    </button>
  )
}
