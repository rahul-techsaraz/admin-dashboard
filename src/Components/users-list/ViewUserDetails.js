import React, { useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import { Box, Button, Card, Chip, Fab, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import useFetchDetails from '../../hooks/useFetchDetails'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { constants } from '../../utils/constants';

const ViewUserDetails = () => {
  const { email } = useParams();
  const { fetchUsersDetails } = useFetchDetails();
  const { userDetailsByEmail } = useSelector(state => state.common);
  const { basicUserDetails, educationalQalification, userPreferences, basicDocument, admissionProofDocument } = userDetailsByEmail;
  useEffect(() => {
    fetchUsersDetails(email);
  }, [])
  console.log({ userDetailsByEmail })
  const convertToUpperCase = (str) => {
    return str;
  }
  const changedBasicDocument = (data) => {
    const changedData = Object.keys(data[0])
    const filteredData = changedData.filter((value) => { if (['certificate_10th', 'certificate_12th', 'graduation_certificate', 'pg_certificate', 'aadhaar_card', 'pan_card'].includes(value)) return value })
    const finalData = filteredData.filter((value) => { if (basicDocument[0][value] !== ' ') return value })
    return finalData
  }
  const formatStrinng = (data) => {
    const splitData = data.replace(/_/, ' ')
    if (splitData === "certificate 10th" || splitData === "certificate 12th") {
      return splitData.split(' ').reverse().join(" ")
    }
    return splitData
  }
  // useEffect(() => {
  //   changedBasicDocument(basicDocument)
  // }, [basicDocument])
  return (
    <AddItemForm label={''}>
      {basicUserDetails ? <>
        <Box>
          <Typography variant='h5' style={{ fontWeight: 600, color: '#34aadc', marginBottom: '2rem' }}>User Basic Details</Typography>
          <Box style={{ margin: '1rem', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Email : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.email)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Full Name : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.full_name)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>city : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.city)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>State : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.state)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Country : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.country)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Date of Birth : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.dob)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Gender : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.gender)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Marital Status : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.marital_status)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Physically Challenged : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.physically_challenged)} />
            </Box>
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <Typography style={{ fontWeight: 600 }}>Social Category : </Typography>
              <Chip label={convertToUpperCase(basicUserDetails?.social_category)} />
            </Box>

          </Box>
          <Typography variant='h5' style={{ fontWeight: 600, color: '#34aadc', marginBottom: '2rem' }}>Educational Qalification</Typography>
          <Box style={{ display: 'flex', gap: '2rem' }}>
            {educationalQalification.map((qualification) => (
              <Card style={{ width: '300px' }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                  <Typography variant="h5" component="div" style={{ fontWeight: 600 }}>

                    {qualification.class_name}
                  </Typography>
                </Box>
                <Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Board Name : </Typography>
                    <Chip label={qualification.board_name} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>School Name : </Typography>
                    <Chip label={qualification.school_name} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Passing Year : </Typography>
                    <Chip label={qualification.passing_year} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Stream : </Typography>
                    <Chip label={qualification.stream} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Aggregate : </Typography>
                    <Chip label={qualification.marks_percentage} />
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          <Typography variant='h5' style={{ fontWeight: 600, color: '#34aadc', margin: '2rem 0' }}>User Preferences</Typography>
          <Box style={{ display: 'flex', gap: '2rem' }}>
            {userPreferences.map((preferenced) => (
              <Card style={{ width: '300px' }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                  <Typography variant="h5" component="div" style={{ fontWeight: 600 }}>

                    Stream
                  </Typography>
                  {/* <Fab color="secondary" aria-label="edit">
                    <EditIcon />
                  </Fab> */}
                </Box>

                <Box >
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Stream : </Typography>
                    <Chip label={preferenced.stream} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Level : </Typography>
                    <Chip label={preferenced.level} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Specialization : </Typography>
                    <Chip label={preferenced.specialization} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Location : </Typography>
                    <Chip label={preferenced.location} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>College_type : </Typography>
                    <Chip label={preferenced.college_type} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Fee Range : </Typography>
                    <Chip label={preferenced.fee_range} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Colleges : </Typography>
                    <Chip label={preferenced.colleges} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Interested Abroad : </Typography>
                    <Chip label={preferenced.interested_abroad} />
                  </Box>
                  <Box style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
                    <Typography style={{ fontWeight: 600 }}>Need Loan : </Typography>
                    <Chip label={preferenced.need_loan} />
                  </Box>
                </Box>

              </Card>
            ))}






          </Box>

          <Typography variant='h5' style={{ fontWeight: 600, color: '#34aadc', margin: '2rem 0' }}>User Documents</Typography>
          <Box style={{ display: 'flex', flexWrap: "wrap", gap: '2rem' }}>
            {changedBasicDocument(basicDocument).map((data) => (
              <Card style={{ width: '300px' }}>
                <Box style={{ display: 'flex', justifyContent: "center", width: '80%', height: '150px', margin: '0 auto' }}>
                  <img src={constants.imageAbsolutePath + basicDocument[0][data]} style={{ maxHeight: "150px" }} alt='Certificate' />
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                  <Typography variant="h5" component="div" style={{ fontWeight: 600, textTransform: "capitalize" }}>
                    {formatStrinng(data)}
                  </Typography>
                  {/* <Fab color="secondary" aria-label="edit">
                    <EditIcon />
                  </Fab> */}
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                  <button class="btn btn-primary btn-round">View</button>
                </Box>

              </Card>
            ))}
          </Box>
        </Box>
      </> : <Typography style={{ fontWeight: 600 }}>User does not have any user details data</Typography>}

    </AddItemForm>
  )
}

export default ViewUserDetails