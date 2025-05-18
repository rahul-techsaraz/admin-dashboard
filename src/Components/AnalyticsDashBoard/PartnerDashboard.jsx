import React from 'react'
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import AddItemForm from '../AddItemForm'

const partnerSummary = [
  { label: 'My Colleges', value: 12 },
  { label: 'Applications Submitted', value: 235 },
  { label: 'Approvals', value: 180 },
  { label: 'Rejections', value: 55 }
]

const monthlyApplications = [
  { month: 'Jan', applications: 15 },
  { month: 'Feb', applications: 20 },
  { month: 'Mar', applications: 25 },
  { month: 'Apr', applications: 40 },
  { month: 'May', applications: 30 },
  { month: 'Jun', applications: 35 },
  { month: 'Jul', applications: 45 },
  { month: 'Aug', applications: 50 },
  { month: 'Sep', applications: 55 },
  { month: 'Oct', applications: 60 },
  { month: 'Nov', applications: 65 },
  { month: 'Dec', applications: 70 }
]

const pendingApprovals = ['Application #2045 pending review', 'Application #2048 pending review', 'Application #2050 pending review']

export default function PartnerDashboard() {
  return (
    <AddItemForm>
      <Box sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Partner Dashboard
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {partnerSummary.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#2c3e50',
                  color: '#fff',
                  borderRadius: 2
                }}
              >
                <Typography variant='h6' sx={{ opacity: 0.8 }}>
                  {item.label}
                </Typography>
                <Typography variant='h4' fontWeight='bold'>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Monthly Applications Bar Chart */}
        <Paper elevation={3} sx={{ p: 2, height: 350, backgroundColor: '#34495e', color: '#ecf0f1', borderRadius: 2 }}>
          <Typography variant='h6' mb={2}>
            Monthly Applications
          </Typography>
          <ResponsiveContainer width='100%' height='90%'>
            <BarChart data={monthlyApplications} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey='month' stroke='#ecf0f1' tick={{ fill: '#ecf0f1', fontWeight: 'bold' }} />
              <YAxis stroke='#ecf0f1' tick={{ fill: '#ecf0f1' }} />
              <Tooltip contentStyle={{ backgroundColor: '#2c3e50', borderRadius: 8, border: 'none' }} itemStyle={{ color: '#ecf0f1' }} />
              <Bar dataKey='applications' fill='#1abc9c' radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Pending Approvals */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mt: 4,
            backgroundColor: '#34495e',
            color: '#ecf0f1',
            borderRadius: 2,
            maxWidth: 600
          }}
        >
          <Typography variant='h6' mb={2}>
            Pending Approvals
          </Typography>
          <Divider sx={{ mb: 2, borderColor: '#ecf0f1' }} />
          <List>
            {pendingApprovals.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  borderBottom: '1px solid #2c3e50',
                  py: 1
                }}
                secondaryAction={
                  <Button variant='contained' color='success' size='small'>
                    Approve
                  </Button>
                }
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </AddItemForm>
  )
}
