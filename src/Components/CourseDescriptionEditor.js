// CourseDescriptionEditor.js
import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types' // Import PropTypes

const CourseDescriptionEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme='snow'
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['bold', 'italic', 'underline'],
          ['link'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          ['clean']
        ]
      }}
      style={{
        backgroundColor: '#FFFFFF',
        minHeight: '150px',
        borderRadius: '4px',
        padding: '10px',
        fontSize: '14px'
      }}
    />
  )
}

// Add PropTypes validation
CourseDescriptionEditor.propTypes = {
  value: PropTypes.string.isRequired, // Value must be a string and is required
  onChange: PropTypes.func.isRequired // onChange must be a function and is required
}

export default CourseDescriptionEditor
