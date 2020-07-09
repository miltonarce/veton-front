import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogDeactivateDoctorConfirmation = ({ buttonText ,title, text, onClickConfirm }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        handleClose();
        onClickConfirm();
    }

    return (
        <Grid container alignItems="flex-start" justify="center" direction="row">
            <Button color="primary" size="medium" variant="contained" onClick={handleClickOpen}>
                DESACTIVAR
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default DialogDeactivateDoctorConfirmation;