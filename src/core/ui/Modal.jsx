import { Dialog } from '@mui/material';
import React from 'react';

const Modal = ({ open, close, children, ...props }) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          className: 'rounded-lg !bg-background-secondary !shadow-lg',
        },
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
