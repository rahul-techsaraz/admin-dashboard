import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect } from 'react'
import { constants } from '../../utils/constants'
// import CollegeBasicDetails from '../agent_college/CollegeBasicDetails';
// import CourseOffered from '../agent_college/CourseOffered';
// import CollegeDescription from '../agent_college/CollegeDescription';
// import CollegeHighlights from '../agent_college/CollegeHighlights';
import CollegeCommon from '../agent_college/CollegeCommon';
import CollegeGallary from '../agent_college/CollegeGallary';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../utils/CommonComponents/CustomButton';
import CollegeBasicDetails from './components/CollegeBasicDetails';
import CourseOffered from './components/CourseOffered';
import CollegeDescription from './components/CollegeDescription';
import Placements from './components/Placements';
import News from './components/News';
import { updateCollegeInfo } from '../../features/newCollegeSlice';


const StepForm = () => {
    const { activeStep, collegeBasicDetails, courseOffered, collegeDescriptions, facilities, gallary, placements, news } = useSelector((state) => state.newCollege)
    const dispatch = useDispatch()
    const handleSteps = (step) => {
        switch (step) {
            case 0:
                return <CollegeBasicDetails />;
            case 1:
                return <CourseOffered />;
            case 2:
                return <CollegeDescription />;
            case 3:
                return <CollegeCommon />;
            case 4:
                return <Placements />;
            case 5:
                return <News />;
            case 6:
                return <CollegeGallary />;
            default:
                throw new Error("Unknown step");
        }
    };
    const inhanceLabel = constants.collegeStepsLabel.map((label) => {
        if (label.isValitadeError === 'collegeBasicDetails') {
            return { ...label, isValitadeError: collegeBasicDetails.isValitadeError }
        } else if (label.isValitadeError === 'courseOffered') {
            return { ...label, isValitadeError: courseOffered.isValitadeError }
        } else if (label.isValitadeError === 'collegeDescriptions') {
            return { ...label, isValitadeError: collegeDescriptions.isValitadeError }
        } else if (label.isValitadeError === 'facilities') {
            return { ...label, isValitadeError: facilities.isValitadeError }
        } else if (label.isValitadeError === 'gallary') {
            return { ...label, isValitadeError: gallary.isValitadeError }
        } else if (label.isValitadeError === 'placements') {
            return { ...label, isValitadeError: placements.isValitadeError }
        } else if (label.isValitadeError === 'news') {
            return { ...label, isValitadeError: news.isValitadeError }
        }
    })
    const handleNext = () => {
        dispatch(updateCollegeInfo({ classKey: 'activeStep', value: activeStep + 1 }))
    }
    const disableNextBtn = () => {
        if (activeStep === 0 && !collegeBasicDetails.isValitadeError) {
            return false;
        } else if (activeStep === 1 && !courseOffered.isValitadeError) {
            return false;
        } else if (activeStep === 2 && !collegeDescriptions.isValitadeError) {
            return false;
        } else if (activeStep === 4 && !facilities.isValitadeError) {
            return false;
        } else if (activeStep === 5 && !gallary.isValitadeError) {
            return false;
        } else if (activeStep === 6 && !placements.isValitadeError) {
            return false;
        } else if (activeStep === 7 && !news.isValitadeError) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
                {inhanceLabel.map((label, index) => (
                    <Step key={index} completed={!label.isValitadeError}>
                        <StepLabel>{label.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {handleSteps(activeStep)}
            <div className={activeStep === 0 ? 'stepper-btn-container2' : 'stepper-btn-container'}>
                {activeStep > 0 && <CustomButton lable={'Prev'} onClick={() => dispatch(updateCollegeInfo({ classKey: 'activeStep', value: activeStep - 1 }))} />}
                <CustomButton onClick={() => handleNext()} lable={'Next'} isDisabled={disableNextBtn()} />
            </div>
        </>
    )
}

export default StepForm