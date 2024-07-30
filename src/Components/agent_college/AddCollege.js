import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { constants } from '../../utils/constants'
import CollegeBasicDetails from './CollegeBasicDetails'
import CourseOffered from './CourseOffered'
import CollegeDescription from './CollegeDescription'
import CollegeCommon from './CollegeCommon'
import CollegeGallary from './CollegeGallary'
import CollegeHighlights from './CollegeHighlights'

export default function AddCollege({ collegeId }) {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              {constants.addNewCollegeTab.map((data) => (
                <Tab label={data.label} value={data.value} />
              ))}
            </TabList>
          </Box>
          {
            {
              1: (
                <TabPanel value='1'>
                  <CollegeBasicDetails collegeId={collegeId} />{' '}
                </TabPanel>
              ),
              2: (
                <TabPanel value='2'>
                  <CourseOffered collegeId={collegeId} />{' '}
                </TabPanel>
              ),
              3: (
                <TabPanel value='3'>
                  <CollegeDescription collegeId={collegeId} />{' '}
                </TabPanel>
              ),
              4: (
                <TabPanel value='4'>
                  <CollegeHighlights collegeId={collegeId} />{' '}
                </TabPanel>
              ),
              5: (
                <TabPanel value='5'>
                  <CollegeCommon collegeId={collegeId} />{' '}
                </TabPanel>
              ),
              6: (
                <TabPanel value='6'>
                  <CollegeGallary collegeId={collegeId} />{' '}
                </TabPanel>
              )
            }[value]
          }
        </TabContext>
      </Box>
    </>
  )
}
