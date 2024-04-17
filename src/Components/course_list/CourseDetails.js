import React from 'react'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'

export default function CourseDetails() {
  return (
    <>
        <div style={{gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap"}}>
            <SelectBox
                label={'Course Level'}
                options={constants.courseLevelSelectBox}
                styles={{width: '280px', height: '38px'}}
            />
            <SelectBox
                label={'Course Duration'}
                options={constants.courseDurationSelectBox}
                styles={{width: '280px', height: '38px'}}
            />
            <SelectBox
                label={'Exam Type'}
                options={constants.courseExamTypeSelectBox}
                styles={{width: '280px', height: '38px'}}
            />
            {constants.courseDetailsInputFieldList.map((description)=>(
                <TextArea
                placeholder={description.label}
                noOfROws={6}
                noOfCols={55}
                fieldName={description.label}
                styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
            />  
            ))}
            <SelectBox
                label={'Top Course Colleges'}
                options={constants.courseTopCourseCollegesSelectBox}
                styles={{width: '280px', height: '38px'}}
            />
        </div>
    </>
  )
}
