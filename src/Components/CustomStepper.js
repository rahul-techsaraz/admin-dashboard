/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
import AddItemForm from './AddItemForm'

const CustomStepper = ({ steps, onComplete, formName }) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1))
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0))
  }
  console.log(activeStep, steps[activeStep]?.isNextDisabled)
  return (
    <AddItemForm label={formName}>
      <Box sx={{ width: '100%' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepLabel-root .Mui-active': {
              color: '#2C3E50' // Active step color
            },
            '& .MuiStepLabel-root .Mui-completed': {
              color: '#2C3E50' // Completed step color
            },
            '& .MuiStepLabel-root .Mui-disabled': {
              color: '#BDC3C7' // Disabled step color
            }
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2 }}>
          {React.createElement(steps[activeStep]?.component)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                borderColor: '#2C3E50',
                color: '#2C3E50',
                '&:hover': {
                  borderColor: '#2C3E50',
                  backgroundColor: '#ECF0F1'
                }
              }}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={onComplete}
                  sx={{
                    backgroundColor: '#2C3E50',
                    '&:hover': {
                      backgroundColor: '#34495E'
                    }
                  }}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  sx={{
                    backgroundColor: '#2C3E50',
                    '&:hover': {
                      backgroundColor: '#34495E'
                    }
                  }}
                  disabled={steps[activeStep]?.isNextDisabled}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </AddItemForm>
  )
}

export default CustomStepper
