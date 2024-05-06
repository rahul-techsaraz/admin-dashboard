import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CustomDialogPopup({open,handleClose,label,children,handleSubmit,buttonLabel}) {
 

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
}
