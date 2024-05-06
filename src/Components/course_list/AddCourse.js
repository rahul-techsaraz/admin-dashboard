import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { constants } from '../../utils/constants';
import CourseDescriptionDetails from './CourseDescriptionDetails';
import SyllabusDetails from './SyllabusDetails';
import CourseDetails from './CourseDetails';
import CourseBasicDetails from './CourseBasicDetails';
import DataToDisplay from './DataToDisplay';
import { useSelector } from 'react-redux';

export default function AddCourse({courseId}) {
    const [value, setValue] = useState('1');
    const {courseInfo, courseDescriptions, courseDetails, syllabusDetails, isEdit} = useSelector(state=>state.course)
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    const courseDetailsData = [
        { lable: 'Course Level', value: courseDetails.course_level },
        { lable: 'Course Duration', value: courseDetails.course_duration },
        { lable: 'Exam Type', value: courseDetails.exam_type },
        { lable: 'Eligiblity Criteria', value: courseDetails.eligiblity_criteria },
        { lable: 'Top Course Colleges', value: courseDetails.top_course_colleges.join(', ') },
    ]
    const syllabusDetailsData = syllabusDetails.accumulated_data.map(data =>{ 
            return  [{ lable : 'Year Name', value : data.year_name },
                    { lable : 'Semester Name', value : data.semester_name },
                    { lable : 'List of Subjects', value : data.list_of_subject}]
        })
    useEffect(() => {
        if (!courseId) {
    return () => console.log('leveing the components')
}
    },[courseId])
  return (
    <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {constants.addNewCourseTab.map((data)=>(
                            <Tab label={data.label} value={data.value}/>    
                        ))}
                    </TabList>
                  </Box>
                  {
                      {
                          "1": <TabPanel value='1'><CourseBasicDetails courseId={courseId} /></TabPanel>,
                          "2": <TabPanel value='2'><CourseDescriptionDetails courseId={courseId}/></TabPanel>,
                          "3": <TabPanel value='3'><CourseDetails courseId={courseId}/></TabPanel>,
                          "4": <TabPanel value='4'><SyllabusDetails courseId={courseId}/></TabPanel>,
                          
                      }[value]
                  }
                {/* <TabPanel value="1">{!isEdit && courseId ? <DataToDisplay dataToDisplay={courseInfoData}></DataToDisplay> : <CourseBasicDetails courseId={courseId}/>}</TabPanel>
                <TabPanel value="2">{!isEdit && courseId ? <DataToDisplay dataToDisplay={courseDescriptionData}></DataToDisplay> : <CourseDescriptionDetails courseId={courseId}/>}</TabPanel>
                <TabPanel value="3">{!isEdit && courseId ? <DataToDisplay dataToDisplay={courseDetailsData}></DataToDisplay> : <CourseDetails courseId={courseId}/>}</TabPanel>
                <TabPanel value="4">{!isEdit && courseId ? <DataToDisplay dataToDisplay={syllabusDetailsData}></DataToDisplay> : <SyllabusDetails courseId={courseId}/>}</TabPanel> */}
            </TabContext>
        </Box>
    </>
  )
}
