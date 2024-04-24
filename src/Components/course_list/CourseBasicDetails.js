import React, { useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useStyles } from './courseCss';

function valuetext(value) {
  return value;
}

export default function CourseBasicDetails() {
  const [examName, setExamName]= useState([])
  const [value, setValue] = useState([20, 37]);
  const classes = useStyles();
  const handleDelete = (e) => {
    const filteredData = examName.filter((data)=>data.exam_name !== e.target.parentElement.parentElement.childNodes[0].innerText)
    // console.log(e.target.parentElement.parentElement.childNodes[0].innerText);
    // console.log(filteredData)
    setExamName(filteredData)
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    console.log(examName)
  },[examName])
  return (
    <>
      <div className={classes.courseBasicDetailsRoot}>
        <InputFieldText
            inputType="text"
            placeholder="Course Name"
            styles={{width: '280px'}}
        />
        <SelectBox
            label={"Course Mode"}
            options={constants.courseBasicDetailsCourseModeSelectBox}
            styles={{width: '280px', height: '38px'}}
        />
        <InputFieldText
          inputType={"text"}
          placeholder={"Course Duration"}
          styles={{width: '280px'}}
        />
        <TextArea
          placeholder={"Course Description"}
          noOfROws={6}
          noOfCols={55}
          fieldName={"Course Description"}
          styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
        />
        <div className="form-group">
          <label>{"Course Fee" }</label>
          <div className='form-control'>
            <Box sx={{ width: 400 }}>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
              <div style={{display:'flex', justifyContent:"space-between"}}>
                <label>{"Min Fees : " + value[0] }</label>
                <label>{"Max Fees : " + value[1] }</label>
              </div>
          </div>
        </div>
        <div style={{display:'flex', gap:"1.5rem"}}>
          <SelectBox
            label={"Course Accepting Exam"}
            styles={{width: '280px', height: '38px'}}
            options={constants.courseBasicDetailsExamNameSelectBox}
            onChange={(e)=>setExamName([...examName, {exam_name:e.target.value}])}
          />
          <div className="form-group"  style={examName.length > 0 ?   classes.courseBasicDetailsChip: classes.courseBasicDetailsEmptyChip}>
            <Stack direction="column" spacing={1}>
              {examName.map((value)=>(
                <Chip label={value.exam_name} variant="outlined" onDelete={handleDelete} />
              ))}
            </Stack>
          </div>
        </div>
        
      </div>
    </>
  )
}
