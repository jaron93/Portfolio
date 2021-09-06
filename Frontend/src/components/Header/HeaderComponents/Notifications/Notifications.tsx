import React, { useState } from 'react'
import styles from './Notifications.module.scss'

import Modal from '@material-ui/core/Modal';
/* import Fade from '@material-ui/core/Fade'; */
import Badge from '@material-ui/core/Badge';

import { makeStyles } from '@material-ui/core/styles';

import { ImBullhorn } from 'react-icons/im';
import { IoNotifications } from 'react-icons/io5';


const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(2),
      },
   },
}));

export default function Notifications() {

   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <div className={classes.root}>
            <Badge badgeContent={3} color="primary">
               <IoNotifications
                  onClick={handleOpen}
                  style={{ cursor: 'pointer' }}
                  size="22"
                  color="white" />
            </Badge>
         </div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
         >
            {/* <Fade in={open}> */}
            <div className={styles.modal}>
               <ul>
                  <li className={styles.notification}>
                     <ImBullhorn size="25" />
                     <div className={styles.container}>
                        <span className={styles.time}>Sep 01 2021 - 13: 59: 06 (GMT+2)</span>
                        <p className={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                     </div>
                  </li>
               </ul>
            </div>
            {/* </Fade> */}
         </Modal>
      </>
   )
}
