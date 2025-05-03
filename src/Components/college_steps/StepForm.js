import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { constants } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../utils/CommonComponents/CustomButton';
import CollegeBasicDetails from './components/CollegeBasicDetails';
import CourseOffered from './components/CourseOffered';
import CollegeDescription from './components/CollegeDescription';
import Placements from './components/Placements';
import News from './components/News';
import { resetCollege, updateCollegeInfo } from '../../features/newCollegeSlice';
import FacilitiesFaculties from './components/FacilitiesFaculties';
import CollegeGallary from './components/CollegeGallary';
import { v4 as uuid } from 'uuid'
import { updateError } from '../../features/commonSlice';
import { FileUpload } from '../../utils/FileUpload';
import { createNewCollege } from '../../utils/reduxThunk/collegeThunk';
import { useNavigate } from 'react-router-dom';


const StepForm = () => {
    const { activeStep, collegeBasicDetails, courseOffered, collegeDescriptions, facilities, gallary, placements, news } = useSelector((state) => state.newCollege)
    const { userToken } = useSelector((state) => state.user)
    const { facultyImage,
        setFacultyImage,
        setFacultyImageUrl,
        collegeLogo,
        setCollegeLogo,
        setCollegeLogoUrl,
        collegeThumbnail,
        setCollegeThumbnail,
        setCollegeThumbnailUrl,
        collegeBrochure,
        setCollegeBrochure,
        setCollegeBrochureUrl,
        collegeGallary,
        setCollegeGallary,
        setCollegeGallaryUrl, } = useContext(FileUpload)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(userToken)
    const handleSteps = (step) => {
        switch (step) {
            case 0:
                return <CollegeBasicDetails />;
            case 1:
                return <CourseOffered />;
            case 2:
                return <CollegeDescription />;
            case 3:
                return <Placements />;
            case 4:
                return <News />;
            case 5:
                return <FacilitiesFaculties />;
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
        } else if (label.isValitadeError === 'placements') {
            return { ...label, isValitadeError: placements.isValitadeError }
        } else if (label.isValitadeError === 'news') {
            return { ...label, isValitadeError: news.isValitadeError }
        } else if (label.isValitadeError === 'facilities') {
            return { ...label, isValitadeError: facilities.isValitadeError }
        } else if (label.isValitadeError === 'gallary') {
            return { ...label, isValitadeError: gallary.isValitadeError }
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
        } else if (activeStep === 3 && !placements.isValitadeError) {
            return false;
        } else if (activeStep === 4 && !news.isValitadeError) {
            return false;
        } else if (activeStep === 5 && !facilities.isValitadeError) {
            return false;
        } else if (activeStep === 6 && !gallary.isValitadeError) {
            return false;
        } else {
            return true;
        }
    }
    const handleSubmit = async () => {
        try {
            const college_id = uuid()
            const payload = {
                college_id: college_id,
                college_name: collegeBasicDetails?.college_name,
                location: collegeBasicDetails?.location,
                affiliate_by: collegeBasicDetails?.affiliate_by,
                ratings: collegeBasicDetails?.ratings,
                state: collegeBasicDetails?.state,
                city: collegeBasicDetails?.city,
                category_name: collegeBasicDetails?.category_name,
                college_type: collegeBasicDetails?.college_type,
                college_logo: collegeBasicDetails?.college_logo,
                college_thumbnail: collegeBasicDetails?.college_thumbnail,
                college_download_brochure_path: collegeBasicDetails?.college_download_brochure_path,
                fee_starting: collegeBasicDetails?.fee_starting,
                avg_first_year_fee: collegeBasicDetails?.avg_first_year_fee,
                message: collegeBasicDetails?.message,
                account_name: JSON.parse(localStorage.getItem('userData')).account_name,
                is_publish: constants.collegeStatus.NOTPUBLISHED,
                courseOffered: courseOffered?.courses_offered,
                collegeDescriptions: {
                    college_description: collegeDescriptions?.college_description,
                    college_course_description: collegeDescriptions?.college_course_description,
                    college_highlights_description: collegeDescriptions?.college_highlights_description,
                    college_campus_description: collegeDescriptions?.college_campus_description,
                    college_admission_description: collegeDescriptions?.college_admission_description,
                },
                facilities: {
                    facilities: facilities?.facilities,
                    faculty_data: facilities?.faculty_data
                },
                placements: placements?.placement_data,
                news: news?.news_data,
                gallary: gallary?.image_path,
            }
            console.log(userToken)
            const filePayload = new FormData()
            filePayload.append('data', JSON.stringify(payload))
            filePayload.append('college_logo[]', collegeLogo[0])
            filePayload.append('college_thumbnail[]', collegeThumbnail[0])
            filePayload.append('college_brochure[]', collegeBrochure[0])
            for (let i = 0; i < collegeGallary.length; i++) {
                filePayload.append('college_gallary[]', collegeGallary[i])
            }
            for (let i = 0; i < facultyImage.length; i++) {
                const facultyId = facultyImage[i].name.split('.')[0] // Get the corresponding faculty_id
                if (facultyId) {
                    filePayload.append(`faculty_image[${facultyId}]`, facultyImage[i])
                }
            }
            const response = await dispatch(createNewCollege({
                url: constants.apiEndPoint.NEW_COLLEGE,
                payload: filePayload,
                header: { Authorization: userToken }
            }))
            if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                }))
            } else {
                localStorage.removeItem('formData')
                resetCollege()
                setCollegeLogo([])
                setCollegeLogoUrl([])
                setCollegeThumbnail([])
                setCollegeThumbnailUrl([])
                setCollegeBrochure([])
                setCollegeBrochureUrl([])
                setCollegeGallary([])
                setCollegeGallaryUrl([])
                setFacultyImage([])
                setFacultyImageUrl([])
                navigate('/list-agent-college')
            }
        } catch (error) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                flag: true
            }))
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
                {activeStep < 6 ?
                    <CustomButton onClick={() => handleNext()} lable={'Next'} isDisabled={disableNextBtn()} /> :
                    <CustomButton onClick={() => handleSubmit()} lable={'Submit'} isDisabled={disableNextBtn()} />
                }
            </div>
        </>
    )
}

export default StepForm