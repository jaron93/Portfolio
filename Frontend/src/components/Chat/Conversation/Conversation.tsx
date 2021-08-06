import React, { useEffect, useState } from 'react'
import styles from './Conversation.module.scss'

import image from '../../../assets/person/1.jpeg'
import { axiosInstance } from '../../../services/api';


function Conversation({ conversation, currentUserId }: any) {

   const [user, setUser] = useState<any>(null);

   useEffect(() => {
      const friendId = conversation.members.find((m: String) => m !== currentUserId);

      const getUser = async () => {
         try {
            const res = await axiosInstance("/api/user?userId=" + friendId);
            setUser(res.data);


         } catch (err) {
            console.log(err);
         }
      };
      getUser()
   }, [conversation.members, currentUserId]);

   return (
      <div className={styles.element}>
         <img
            className={styles.img}
            src={image}
            alt=""
         />
         <span className={styles.name}>{user?.username}</span>
      </div>
   )
}

export default Conversation
