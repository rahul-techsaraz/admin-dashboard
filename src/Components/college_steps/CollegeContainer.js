import { Container, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import StepForm from './StepForm'
import AddItemForm from '../AddItemForm'
import { useFetchCategoryList } from '../../hooks/useFetchCategoryList'
import useCourseDetails from '../../hooks/useCourseDetails'

const CollegeContainer = () => {
    const { fetchCategoryList } = useFetchCategoryList()
    useCourseDetails()
    useEffect(() => {
        fetchCategoryList()
    }, [])
    return (
        // <Container component="main" maxWidth="xl" sx={{ mb: 4}}>
        <AddItemForm label={'Add New College'}>
            <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <StepForm />
            </Paper>
        </AddItemForm>
        // </Container>
    )
}

export default CollegeContainer