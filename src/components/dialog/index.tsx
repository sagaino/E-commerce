import React, { useState } from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Breakpoint } from '@mui/material/styles';

type DialogType = {
  isOpen: boolean,
  handleClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
  title?: string,
  maxWidth?: Breakpoint,
  fullWidth?: boolean,
  contentComponent?: React.ReactElement | React.ReactNode,
  buttonComponent?: React.ReactElement | React.ReactNode,
}

const DialogProduct: React.FC<DialogType> = (props: DialogType) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (props.isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.isOpen]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      scroll={"paper"}
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
      <DialogContent
        id="scroll-dialog-description"
        ref={descriptionElementRef}
      >
        {/* <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
        </DialogContentText> */}
        {props.contentComponent}
      </DialogContent>
      <DialogActions>
        {props.buttonComponent}
        {/* <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default DialogProduct