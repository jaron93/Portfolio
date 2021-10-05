import React, { useEffect, useState } from 'react'

import styles from './ConversationListItem.module.scss'

import api from '../../../services/api';

import shave from 'shave';

import { Avatar, Badge, Stack, styled } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
   '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         borderRadius: '50%',
         animation: 'ripple 1.2s infinite ease-in-out',
         border: '1px solid currentColor',
         content: '""',
      },
   },
   '@keyframes ripple': {
      '0%': {
         transform: 'scale(.8)',
         opacity: 1,
      },
      '100%': {
         transform: 'scale(2.4)',
         opacity: 0,
      },
   },
}));

function Conversation({ data, currentUserId, onlineUsers }: any) {

   const [user, setUser] = useState<any>(null);
   const [lastMessage, setLastMessage] = useState<any>(null);

   const friendId = data.members.find((m: String) => m !== currentUserId);

   const isFriendOnline = !!onlineUsers.find((o: any) => o.userId === friendId)

   useEffect(() => {
      const getUser = async () => {
         try {
            const res = await api.get("/api/user?userId=" + friendId);
            setUser(res.data);

         } catch (err) {
            console.log(err);
         }
      };
      getUser()
   }, [data.members, currentUserId, friendId]);

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

   useEffect(() => {
      shave('#lastMessage', 20);
   })

   return (
      <div className={styles.element}>
         <Stack spacing={1.5} direction="row" alignItems="center">
            <StyledBadge
               overlap="circular"
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               variant="dot"
               invisible={!isFriendOnline}
            >
               <Avatar
                  alt={user?.username}
                  className={styles.avatar}
                  src={`/avatars/${user?.profileAvatar}`}
                  sx={{ bgcolor: '#6e2f66' }}
               />
            </StyledBadge>
            <div className={styles.info}>
               <span className={styles.name}>{user?.username}</span>
               {lastMessage?.length !== 0 &&
                  <span
                     className={styles.lastMessage}
                     id="lastMessage"
                  >
                     {lastMessage?.[0].text}
                  </span>
               }
            </div>
         </Stack>
      </div>
   )
}

export default Conversation
