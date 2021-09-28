import React, { useEffect, useState } from 'react'
import styles from './ConversationListItem.module.scss'

import api from '../../../services/api';
import Avatar from 'react-avatar';

function Conversation({ data, currentUserId }: any) {

   const [user, setUser] = useState<any>(null);
   const [lastMessage, setLastMessage] = useState<any>(null);

   useEffect(() => {
      const friendId = data.members.find((m: String) => m !== currentUserId);

      const getUser = async () => {
         try {
            const res = await api.get("/api/user?userId=" + friendId);
            setUser(res.data);

         } catch (err) {
            console.log(err);
         }
      };
      getUser()
   }, [data.members, currentUserId]);

   useEffect(() => {
      const getLastMessage = async () => {
         try {
            const res = await api.get("/api/messages/" + data._id + `?page=1&count=1`)

            setLastMessage(res.data)
         } catch (err) {
            console.log(err);
         }
      }
      getLastMessage()
   }, [data._id]);

   return (
      <div className={styles.element}>
         <Avatar
            name={user?.username}
            size="50"
            round
            color="#a14712f9"
            src={`/avatars/${user?.profileAvatar}`}
            className={styles.avatar}
         />
         <div className={styles.info}>
            <span className={styles.name}>{user?.username}</span>
            {lastMessage?.length !== 0 &&
               <span className={styles.lastMessage}>{lastMessage?.[0].text}</span>
            }
         </div>
      </div>
   )
}

export default Conversation
