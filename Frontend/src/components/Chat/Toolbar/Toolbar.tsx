import React from 'react'
import styles from './Toolbar.module.scss'

import { Avatar, Badge, Stack, styled } from '@mui/material';
import { useSelector } from 'react-redux';

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

export default function Toolbar({ title, leftItems, avatar, rightItems }: any) {

   const { onlineUsers } = useSelector(state => state.user);

   const friendId = avatar?._id
   const isFriendOnline = !!onlineUsers?.find((o: any) => o.userId === friendId)

   return (
      <div className={styles.toolbar}>
         <div className={styles.left}>{leftItems}</div>

         <Stack spacing={2} direction="row" alignItems="center">
            {avatar &&
               <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  invisible={!isFriendOnline}
               >
                  <Avatar
                     alt={avatar?.username}
                     className={styles.avatar}
                     src={`/avatars/${avatar?.profileAvatar}`}
                     sx={{ bgcolor: '#96927d' }}
                  />
               </StyledBadge>
            }
            <h1 className={styles.title}>{title}</h1>
         </Stack>

         <div className={styles.right}>{rightItems}</div>

      </div>
   )
}

