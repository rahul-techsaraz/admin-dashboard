import React from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  ListItemButton,
  ListItemIcon,
  Avatar
} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts'
import AddItemForm from '../AddItemForm'
import SchoolIcon from '@mui/icons-material/School'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/PendingActions'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const summaryData = [
  { label: 'Total Colleges', value: 128 },
  { label: 'Applications', value: 1034 },
  { label: 'Approvals', value: 756 },
  { label: 'Rejections', value: 278 }
]

const extraMetrics = [
  { label: 'Conversion Rate', value: '73.1%', color: '#66bb6a' },
  { label: 'Bounce Rate', value: '12.4%', color: '#ef5350' },
  { label: 'Avg Processing Time', value: '2.3 days', color: '#ffa726' }
]

const monthlyApplications = [
  { month: 'Jan', applications: 120 },
  { month: 'Feb', applications: 200 },
  { month: 'Mar', applications: 150 },
  { month: 'Apr', applications: 280 },
  { month: 'May', applications: 350 },
  { month: 'Jun', applications: 400 },
  { month: 'Jul', applications: 380 },
  { month: 'Aug', applications: 420 },
  { month: 'Sep', applications: 450 },
  { month: 'Oct', applications: 500 },
  { month: 'Nov', applications: 480 },
  { month: 'Dec', applications: 520 }
]

const admissionStatus = [
  { name: 'Approved', value: 756 },
  { name: 'Pending', value: 200 },
  { name: 'Rejected', value: 78 }
]

const COLORS = ['#4caf50', '#ff9800', '#f44336']

const activityIcons = {
  registered: <SchoolIcon sx={{ color: '#2c3e50' }} />,
  approved: <CheckCircleIcon sx={{ color: '#4caf50' }} />,
  rejected: <CancelIcon sx={{ color: '#f44336' }} />,
  pending: <PendingIcon sx={{ color: '#ff9800' }} />
}

// Sample activities with type and timestamp
const recentActivities = [
  { id: 1, type: 'registered', text: 'New college "ABC University" registered', time: '2 hrs ago' },
  { id: 2, type: 'approved', text: 'Application #1023 approved', time: '4 hrs ago' },
  { id: 3, type: 'rejected', text: 'Application #1024 rejected', time: '5 hrs ago' },
  { id: 4, type: 'registered', text: 'New college "XYZ Institute" registered', time: '1 day ago' },
  { id: 5, type: 'pending', text: 'Application #1025 pending review', time: '2 days ago' }
]

function RecentActivities() {
  return (
    <Paper elevation={3} sx={{ p: 2, maxHeight: 320, overflowY: 'auto' }}>
      <Typography variant='h6' mb={2}>
        Recent Activities
      </Typography>
      <Divider />
      <List>
        {recentActivities.map(({ id, type, text, time }) => (
          <ListItemButton
            key={id}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&:hover': {
                bgcolor: '#e3f2fd',
                cursor: 'pointer'
              }
            }}
            onClick={() => alert(`Clicked on: ${text}`)} // example click action
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'transparent' }}>{activityIcons[type] || <AccessTimeIcon />}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={text}
              secondary={
                <Tooltip title={`Activity time: ${time}`}>
                  <Typography variant='caption' color='textSecondary'>
                    {time}
                  </Typography>
                </Tooltip>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}

export default function AdminDashboard() {
  const theme = useTheme()

  return (
    <AddItemForm>
      <Box sx={{ p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
        <Typography variant='h4' gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          College Admission Kart - Analytics Dashboard
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {summaryData.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Paper elevation={4} sx={{ p: 2, textAlign: 'center', bgcolor: '#ffffff' }}>
                <Typography variant='h6' color='textSecondary'>
                  {item.label}
                </Typography>
                <Typography variant='h4' fontWeight='bold' sx={{ color: '#2c3e50' }}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Extra Metrics */}
        <Grid container spacing={3} mb={4}>
          {extraMetrics.map((metric) => (
            <Grid item xs={12} sm={4} key={metric.label}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: '#ffffff' }}>
                <Typography variant='subtitle1' color='textSecondary'>
                  {metric.label}
                </Typography>
                <Typography variant='h5' fontWeight='bold' sx={{ color: metric.color }}>
                  {metric.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Monthly Applications Bar Chart */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, height: 350 }}>
              <Typography variant='h6' mb={2}>
                Monthly Applications
              </Typography>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={monthlyApplications}>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='applications' fill='#2c3e50' />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Admission Status Pie Chart */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: 350 }}>
              <Typography variant='h6' mb={2}>
                Admission Status Breakdown
              </Typography>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie data={admissionStatus} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={90} label>
                    {admissionStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign='bottom' height={36} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Trend Line Chart */}
        <Box mt={4}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <Typography variant='h6' mb={2}>
              Application Trends
            </Typography>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={monthlyApplications}>
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='applications' stroke='#2c3e50' strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        <RecentActivities />
      </Box>
    </AddItemForm>
  )
}
