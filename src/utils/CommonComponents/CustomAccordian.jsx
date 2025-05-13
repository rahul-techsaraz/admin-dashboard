import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CustomAccordian = ({ label, children, expanded, onChange }) => {
  return (
    <Accordion expanded={expanded} onChange={() => onChange()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
        <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default CustomAccordian
