import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { update_order_status } from '../../../actions/order';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    margin:"10px",
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CancelModal({ id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleCancelBooking = (orderId) => {
    update_order_status(orderId,"CANCELLED")
       .then((value) => {
          if(typeof window !== undefined){
            window.location.reload()
          }
       })
       .catch((err) => {
         console.log(err)
       })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleOpen}>Cancel</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="text-center">
              <font className="cm-title">Are you sure to cancel this booking ?</font>
              <div className="row justify-content-center pt-3">
                 <div className="col-4">
                   <Button color="primary" variant="contained" onClick={handleClose}>No</Button>
                 </div>
                 <div className="col-4">
                   <Button color="primary" variant="contained" onClick={() => handleCancelBooking(id)}>Yes</Button>
                 </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
