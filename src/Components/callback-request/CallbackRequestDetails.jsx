import React, { useEffect } from 'react'
import { Card, CardContent, Typography, Button, Grid, Box, Divider } from '@mui/material'
import AddItemForm from '../AddItemForm'
import { useSelector } from 'react-redux'
import { useCallbackRequest } from '../../hooks/useCallbackRequest'
import { useParams } from 'react-router-dom'

const QueryDetails = ({ data }) => {
  const { queryMarkResolved } = useCallbackRequest()

  const handleMarkResolved = (email, id) => {
    queryMarkResolved(email, id)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {/* {data.map((item) => {
          const { id, email, mobile, query_for, is_resolved, others } = item
          const parsedOthers = others || {}

          return (
            <Grid item xs={12} md={6} lg={6} key={id}>
              <Card
                variant='outlined'
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: 2,
                  p: 1
                }}
              >
                <CardContent>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Query ID: #{id}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Email:</strong> {email}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Mobile:</strong> {mobile}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Query For:</strong> {query_for}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Preferred Time:</strong> {parsedOthers.preferred_time || 'N/A'}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Notes:</strong> {parsedOthers.notes || 'N/A'}
                  </Typography>
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color: is_resolved ? 'green' : 'orange',
                        fontWeight: 600
                      }}
                    >
                      {is_resolved ? 'Resolved' : 'Pending'}
                    </span>
                  </Typography>
                </CardContent>

                {!is_resolved && (
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button variant='contained' color='primary' fullWidth onClick={() => handleMarkResolved(email, id)}>
                      Mark as Resolved
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          )
        })} */}
        {data.map((item) => {
          const { id, email, mobile, query_for, is_resolved, others } = item
          const parsedOthers = others || {}

          return (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <Card
                variant='outlined'
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: 2,
                  p: 1
                }}
              >
                <CardContent>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Query ID: #{id}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Email:</strong> {email}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Mobile:</strong> {mobile}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }}>
                    <strong>Query For:</strong> {query_for}
                  </Typography>

                  {/* 🔁 Dynamic others rendering */}
                  {Object.entries(parsedOthers).map(([key, value]) => (
                    <Typography key={key} variant='body2' sx={{ mb: 0.5 }}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
                    </Typography>
                  ))}

                  <Typography variant='body1' sx={{ mt: 1 }}>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color: is_resolved ? 'green' : 'orange',
                        fontWeight: 600
                      }}
                    >
                      {is_resolved ? 'Resolved' : 'Pending'}
                    </span>
                  </Typography>
                </CardContent>

                {!is_resolved && (
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button variant='contained' color='primary' fullWidth onClick={() => handleMarkResolved(email, id)}>
                      Mark as Resolved
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

const mockResponse = {
  status_code: 200,
  status: 'success',
  data: [
    {
      id: 2,
      name: null,
      email: 'john@example.com',
      mobile: 2147483647,
      is_resolved: 1,
      query_for: 'Admission process',
      others: '{"preferred_time":"Morning","notes":"Urgent callback needed"}'
    },
    {
      id: 3,
      name: null,
      email: 'john@example.com',
      mobile: 2147483647,
      is_resolved: 0,
      query_for: 'Admission process',
      others: '{"preferred_time":"Morning","notes":"Urgent callback needed"}'
    },
    {
      id: 3,
      name: null,
      email: 'john@example.com',
      mobile: 2147483647,
      is_resolved: 0,
      query_for: 'Admission process',
      others: '{"preferred_time":"Morning","notes":"Urgent callback needed"}'
    }
  ]
}
const CallBackRequestDetails = () => {
  const { email } = useParams()
  const { getUserQueryDetails } = useCallbackRequest()
  const { userQueryDetails } = useSelector((state) => state.callbackrequest)

  useEffect(() => {
    getUserQueryDetails(email)
  }, [])
  return (
    <AddItemForm label={'User Query Details'}>
      {/* <DataToDisplay dataToDisplay={feedback.length > 0 ? feedbackData() : []} admin={'admin'} /> */}
      <QueryDetails data={userQueryDetails} />
    </AddItemForm>
  )
}

export default CallBackRequestDetails
