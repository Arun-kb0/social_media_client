import React, { useState, useRef, useMemo } from 'react'
import { Snackbar } from '../../imports/materialuiComponents'

const Notification = ({ message, isMessage }) => {
    const [open, setOpen] = useState(false)
    const isInitialMount = useRef(true)

    useMemo(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            // console.log("noti", "initial", 'open ', open, 'isMessage', isMessage)
        } else {
            setOpen(true);
        }
    }, [isMessage]);

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            sx={{ marginTop: 7 }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message={message}
            autoHideDuration={5000}
        />
    )
}

export default Notification