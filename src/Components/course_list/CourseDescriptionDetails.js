import React from 'react'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'

export default function CourseDescriptionDetails() {
  return (
    <>
        <div style={{ display: " flex", flexWrap: "wrap", justifyContent: "space-between", gap: '3rem', margin: 'auto', padding: 'auto' }}>
            {constants.courseDescriptionInputFieldList.map((description)=>(
                <TextArea
                    placeholder={description.label}
                    noOfROws={6}
                    noOfCols={55}
                    fieldName={description.label}
                    styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
                />
            ))}
        </div>
    </>
  )
}
