import React from 'react'
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

export default function AddCourse() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {constants.addNewCourseTab.map((data)=>(
                            <Tab label={data.label} value={data.value} />    
                        ))}
                    </TabList>
                </Box>
                <TabPanel value='1'><CourseBasicDetails/></TabPanel>
                <TabPanel value="2"><CourseDescriptionDetails/></TabPanel>
                <TabPanel value="3"><CourseDetails/></TabPanel>
                <TabPanel value="4"><SyllabusDetails/></TabPanel>
            </TabContext>
        </Box>
    </>
  )
}
