import * as React from 'react'
import { Box, Fade, Dialog, DialogContent, DialogTitle } from '@mui/material'

const CustomModal = (props) => {
  const { open, onClose, children } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
      <DialogTitle id="scroll-dialog-title">Create Gateway Entry</DialogTitle>
      <DialogContent dividers>
        <Fade in={open}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}>
            {children}
          </Box>
        </Fade>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
