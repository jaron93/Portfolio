import styles from './Online.module.scss'

import image from '../../../assets/person/6.jpeg'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../services/api';


export default function Online({ onlineUsers, currentUserId, setCurrentChat }: any) {

   const [user, setUser] = useState<any>(null);

   useEffect(() => {
      const getUser = async () => {
         try {
            const res = await axiosInstance("/api/user?userId=" + onlineUsers.userId);
            setUser(res.data);

         } catch (err) {
            console.log(err);
         }
      };
      getUser()
   }, [currentUserId, onlineUsers.userId]);


   const handleClick = async () => {
      try {
         const res = await axiosInstance(
            `/api/conversation/find/${currentUserId}/${user._id}`
         );

         if (res.data === null) {
            const data = {
               'senderId': currentUserId,
               'receiverId': user._id
            }

            const res = await axiosInstance.post(
               `/api/conversation/`, data
            );
            setCurrentChat(res.data);
         } else {
            setCurrentChat(res.data)
         }

      } catch (err) {
         console.log(err);
      }

   };

   return (
      <li className={styles.element} onClick={handleClick}>
         <div className={styles.container}>
            <img src={image} alt="" />
            <span className={styles.online}></span>
         </div>
         <span className={styles.username}>{user?.username}</span>
      </li>
   );
}
