import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Notifications.module.scss'

//Material UI 
import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';
import Fade from '@mui/material/Fade';

//React Icons
import { ImBullhorn } from 'react-icons/im';
import { IoNotifications } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlineDotsHorizontal, HiOutlineBadgeCheck } from 'react-icons/hi';

import ClickAwayListener from '@mui/material/ClickAwayListener';

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
   /*    const { announcements } = useSelector(state => state.announcements); */
   const { id } = useSelector(state => state.user.userInfo);
   const [announcements, setAnnouncements] = useState<any>([]);


   const [page, setPage] = useState(1)
   const [hasMore, setHasMore] = useState(false)
   const [loading, setLoading] = useState(true)
   const observer = useRef<IntersectionObserver>()
   const [isPopoverOpen, setIsPopoverOpen] = useState(false)
   const [open, setOpen] = useState(false);
   const { socket } = useSocket();

   // Open and close Modal with announcements
   const handleModalOpen = () => {
      setOpen(true);
   };
   const handleModalClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      setAnnouncements([])
      setHasMore(false)
      setPage(1)
   }, [])

   useEffect(() => {
      setLoading(true);
      api.get("/api/notification/" + id + `?page=${page}&count=5`)
         .then(res => {
            setAnnouncements((prev: any) => [...prev, ...res.data])
            setHasMore(res.data.length > 0)
            setLoading(false)
         }).catch(e => {
            console.log(e);
         })
   }, [dispatch, id, page]);

   // Ref to last element from messages
   const lastElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage: number) => prevPage + 1)
         }
      })

      if (node) observer.current.observe(node)
   }, [loading, hasMore])


   /*  useEffect(() => {
    
       socket.on("getMessageNotification", async (data: any) => {
    
          if (isLoggedIn()) {
             const getNotification = async () => {
    
                try {
                   const res = await api.get("/api/notification/" + id + `?page=1&count=5`);
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
    
    }, [dispatch, id, socket]); */


   // Check how many announcement are not checked yet.
   const isNotSeen = announcements.filter((a: { is_read: boolean }) => (a.is_read === false)).length

   /*  const sortedAnnouncementsByTime = [...announcements].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) */

   // Disable toggle onClick function when F: delete is running 
   const handleDelete = (id: string, e: any) => {
      e.stopPropagation();
      dispatch(deleteNotification(id))
   }

   return (
      <>
         <Badge badgeContent={isNotSeen} color="primary">
            <IoNotifications
               onClick={handleModalOpen}
               style={{ cursor: 'pointer' }}
               size="22"
               color="white" />
         </Badge>
         <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
         >
            <Fade in={open}>

               <div className={styles.modal}>

                  {/* Header */}

                  <div className={styles.header}>
                     <span>Notifications</span>

                     <button onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                        <HiOutlineDotsHorizontal size={22} className={styles.button} />
                     </button>
                     {isPopoverOpen &&
                        <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
                           <div className={styles.popover}>
                              <div className={styles.popoverItems}>
                                 <HiOutlineBadgeCheck size={22} />
                                 <span>Mark all messages as read</span>
                              </div>
                              <div className={styles.popoverItems}>
                                 <MdDeleteForever size={22} />
                                 <span>Delete all your notifications</span>
                              </div>
                           </div>
                        </ClickAwayListener>
                     }

                  </div>


                  <ul>
                     {announcements.length ?
                        (
                           announcements.map((a: any) => (
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
                     <span ref={lastElementRef} />
                  </ul>
               </div>
            </Fade>
         </Modal>
      </>
   )
}

