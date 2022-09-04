import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
    display: 'flex',
    flexDirection: 'column',
    m: 'auto',
    width: 'fit-content',
  }

const CustomModal = (props) => {

    const { open, onClose, children } = props

    return <Dialog
                open={open}
                onClose={onClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Create Gateway Entry</DialogTitle>
                <DialogContent dividers>
                    <Fade in={open}>
                        <Box sx={style}>
                            {children}
                        </Box>
                    </Fade>
                </DialogContent>
    </Dialog>;
}

export default CustomModal