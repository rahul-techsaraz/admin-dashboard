import React, { useState } from 'react'
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
    const courseInfoData = [
        { lable: 'Course Name', value: courseInfo.course_name },
        { lable: 'Course Mode', value: courseInfo.course_mode },
        { lable: 'Course Duration', value: courseInfo.course_duration },
        { lable: 'Course Fee Min', value: courseInfo.course_fee_min },
        { lable: 'Course Fee Max', value: courseInfo.course_fee_max },
        { lable: 'Course Description', value: courseInfo.course_description },
        { lable: 'Course Accepting Exam', value: courseInfo.course_accepting_exam },
    ]
    const courseDescriptionData = [
        { lable: 'Course Overview Description', value: courseDescriptions.course_overview_description },
        { lable: 'Course Entrance Exam Description', value: courseDescriptions.course_entrance_exam_description },
        { lable: 'Course Fee Description', value: courseDescriptions.course_fee_description },
        { lable: 'Course Placement Description', value: courseDescriptions.course_placement_description },
        { lable: 'Course Admission Process Description', value: courseDescriptions.course_admission_process_description },
        { lable: 'Course Eligibility Criteria Description', value: courseDescriptions.course_eligibility_criteria_description },
    ]
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
                <TabPanel value="1">{!isEdit && courseId ? <DataToDisplay dataToDisplay={courseInfoData}></DataToDisplay> : <CourseBasicDetails courseId={courseId}/>}</TabPanel>
                <TabPanel value="2">{!isEdit && courseId ? <DataToDisplay dataToDisplay={courseDescriptionData}></DataToDisplay> : <CourseDescriptionDetails courseId={courseId}/>}</TabPanel>
                <TabPanel value="3">{!isEdit && courseId ? <DataToDisplay dataToDisplay={courseDetailsData}></DataToDisplay> : <CourseDetails courseId={courseId}/>}</TabPanel>
                <TabPanel value="4">{!isEdit && courseId ? <DataToDisplay dataToDisplay={syllabusDetailsData}></DataToDisplay> : <SyllabusDetails courseId={courseId}/>}</TabPanel>
            </TabContext>
        </Box>
    </>
  )
}
