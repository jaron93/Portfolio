import { useEffect, useState } from 'react'
import styles from './Notifications.module.scss'

//Material UI 
import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';
import Fade from '@mui/material/Fade';

//React Icons
import { ImBullhorn } from 'react-icons/im';
import { IoNotifications } from 'react-icons/io5';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification, setAnnouncements, toggleSeen } from '../../../../store/slices/announcements';

//Axios API Instance
import api from '../../../../services/api';
import { isLoggedIn } from 'axios-jwt';

import Moment from 'react-moment';
import { useSocket } from '../../../../hooks/useSocket';
import { toast } from 'react-toastify';

export default function Notifications() {
   const dispatch = useDispatch()
   const { announcements } = useSelector(state => state.announcements);
   const { id } = useSelector(state => state.user.userInfo);

   const [open, setOpen] = useState(false);
   const { socket } = useSocket();

   // Open and close Modal with announcements
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };


   useEffect(() => {

      socket.on("getMessageNotification", async (data: any) => {

         if (isLoggedIn()) {
            const getNotification = async () => {

               try {
                  const res = await api.get("/api/notification/" + id);
                  dispatch(setAnnouncements(res.data))
               } catch (err) {
                  console.log(err);
               }
            };
            getNotification();
         }

         toast(`${data.senderUsername}: ` + data.text)

         await api.post("/api/notification", {
            sender: data.senderId,
            receiver: id,
            message: `You have new messages from ${data.senderUsername}`
         })

      })

   }, [dispatch, id, socket]);




   // Check how many announcement are not checked yet.
   const isNotSeen = announcements.filter((a: { is_read: boolean }) => (a.is_read === false)).length

   const sortedAnnouncementsByTime = [...announcements].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

   // Disable toggle onClick function when F: delete is running 
   const handleDelete = (id: string, e: any) => {
      e.stopPropagation();
      dispatch(deleteNotification(id))
   }

   return (
      <>
         <Badge badgeContent={isNotSeen} color="primary">
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
                     {announcements.length ?
                        (
                           sortedAnnouncementsByTime.map((a: any) => (
                              <li key={a._id}
                                 className={styles.notification}
                                 onClick={() => dispatch(toggleSeen(a))}>
                                 <ImBullhorn size="25" color={a.is_read ? "gray" : "white"}
                                 />
                                 <div className={styles.container}>
                                    <button className={styles.closeBtn} onClick={(e) => handleDelete(a._id, e)}
                                    >x</button>
                                    <span className={styles.time}>{a.created_at}</span>
                                    <p className={styles.text}>{a.message}</p>
                                 </div>
                              </li>
                           ))
                        )
                        :
                        <li className={styles.notification} >
                           <ImBullhorn size="25" color="gray" />
                           <div className={styles.container}>
                              <span className={styles.time}>{
                                 <Moment interval={0} />
                              }
                              </span>
                              <p className={styles.text}>No new messeges.</p>
                           </div>
                        </li>
                     }
                  </ul>
               </div>
            </Fade>
         </Modal>
      </>
   )
}

