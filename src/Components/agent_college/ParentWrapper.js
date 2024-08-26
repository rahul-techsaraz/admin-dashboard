import React, { useState } from 'react'
import { FileUpload } from '../../utils/FileUpload'
import ViewCollegeDetails from './ViewCollegeDetails'
import AddNewCollege from './AddNewCollege'
import { useParams } from 'react-router-dom'

export default function ParentWrapper() {
    const [collegeLogo, setCollegeLogo] = useState([])
    const [collegeThumbnail, setCollegeThumbnail] = useState([])
    const [collegeGallary, setCollegeGallary] = useState([])
    const [collegeGallaryUrl, setCollegeGallaryUrl] = useState([])

    const { collegeId } = useParams()
    return (
        <>
            <FileUpload.Provider
                value={{
                    collegeLogo,
                    setCollegeLogo,
                    collegeThumbnail,
                    setCollegeThumbnail,
                    collegeGallary,
                    setCollegeGallary,
                    collegeGallaryUrl,
                    setCollegeGallaryUrl
                }}
            >
                {collegeId ? <ViewCollegeDetails collegeId={collegeId} /> : <AddNewCollege />}
            </FileUpload.Provider>
        </>
    )
}
