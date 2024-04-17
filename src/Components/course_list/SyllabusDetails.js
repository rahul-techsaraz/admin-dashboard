import React from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import TextArea from '../../utils/CommonComponents/TextArea'

export default function SyllabusDetails() {
  return (
    <>
        <div style={{ gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap" }}>
            <InputFieldText
                inputType="text"
                styles={{ width: '280px' }}
                placeholder="Year Name"
            />
            <InputFieldText
                inputType="text"
                styles={{width: '280px'}}
                placeholder="Semester Name"
            />
            <TextArea
                placeholder="List of Subjects"
                noOfROws={6}
                noOfCols={55}
                fieldName="List of Subjects"
                styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
            />
        </div>
    </>
  )
}
