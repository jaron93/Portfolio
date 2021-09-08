import React, { useState } from 'react'
import styles from './Notifications.module.scss'

import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';

import { ImBullhorn } from 'react-icons/im';
import { IoNotifications } from 'react-icons/io5';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSeen } from '../../../../store/slices/announcements';

export default function Notifications() {
   const dispatch = useDispatch()
   const { announcements } = useSelector(state => state.announcements);
   const [open, setOpen] = useState(false);

   // Open and close Modal with announcements
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   // Check how many announcement are not checked yet.
   const notSeen = announcements.filter(function (a: { seen: boolean; }) { return a.seen === false; }).length;

   return (
      <>
         <Badge badgeContent={notSeen} color="primary">
            <IoNotifications
               onClick={handleOpen}
               style={{ cursor: 'pointer' }}
               size="22"
               color="white" />
         </Badge>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
         >
            <Fade in={open}>
               <div className={styles.modal}>
                  <ul>
                     {announcements.map((a: any) => (
                        <li key={a.id} className={styles.notification} onClick={() => dispatch(toggleSeen(a))}>
                           <ImBullhorn size="25" />
                           <div className={styles.container}>
                              <span className={styles.time}>{a.date}</span>
                              <p className={styles.text}>{a.text}</p>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </Fade>

         </Modal>
      </>
   )
}
