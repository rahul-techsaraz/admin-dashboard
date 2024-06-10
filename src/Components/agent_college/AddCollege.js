import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { constants } from '../../utils/constants';
import CollegeBasicDetails from './CollegeBasicDetails';
import CourseOffered from './CourseOffered';
import CollegeDescription from './CollegeDescription';
import CollegeCommon from './CollegeCommon';
import CollegeGallary from './CollegeGallary';
import CollegeHighlights from './CollegeHighlights'


export default function AddCollege({logoSetter, thumbnailSetter, gallarySetter}) {
  const [value, setValue] = useState('1');
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
};
  return (
    <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {constants.addNewCollegeTab.map((data)=>(
                            <Tab label={data.label} value={data.value}/>    
                        ))}
                    </TabList>
                  </Box>
                  {
                      {
                          "1": <TabPanel value='1'><CollegeBasicDetails logoGetter={(e)=>logoSetter(e)} thumbnailGetter={(e)=>thumbnailSetter(e)}/> </TabPanel>,
                          "2": <TabPanel value='2'><CourseOffered/> </TabPanel>,
                          "3": <TabPanel value='3'><CollegeDescription/> </TabPanel>,
                          "4": <TabPanel value='4'><CollegeHighlights/> </TabPanel>,
                          "5": <TabPanel value='5'><CollegeCommon/> </TabPanel>,
                          "6": <TabPanel value='6'><CollegeGallary gallaryGetter={(e)=>gallarySetter(e)}/> </TabPanel>,
                      }[value]
                  }
            </TabContext>
        </Box>
    </>
  )
}
