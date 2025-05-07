/* eslint-disable react/prop-types */
// components/common/CollapsibleSection.js
import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CollapsibleSection = ({ title = '', children, defaultExpand = false }) => {
  return (
    <Accordion defaultExpanded={defaultExpand}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h5'>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default CollapsibleSection
