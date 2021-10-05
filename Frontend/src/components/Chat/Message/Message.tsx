import React, { useState } from 'react';
import moment from 'moment';

import styles from './Message.module.scss'
import classNames from 'classnames';

import Avatar from 'react-avatar';
import { Transition } from 'react-transition-group';
import { Fade } from '@mui/material';

let cn = classNames;

export default function Message2({ data, isMine, startsSequence, endsSequence, showTimestamp, friendProfile }: any) {

   const [isHovering, setIsHovering] = useState(false);

   const friendlyTimestamp = moment(data.createdAt).format('LLLL');
   const hourTime = moment(data.createdAt).format('HH:mm')

   return (

      <div className={styles.message}>

         {showTimestamp &&
            <div className={styles.timestamps}>
               {friendlyTimestamp}
            </div>}

         <div className={cn(styles.bubbleContainer, isMine && styles.isMine,)}>
            {!isMine &&
               <Avatar
                  name={friendProfile?.username}
                  size="35"
                  round
                  color="#a14712f9"
                  src={`/avatars/${friendProfile?.profileAvatar}`}
                  className={cn(styles.avatar, endsSequence && styles['endsSequence'],)}
               />
            }

            <div
               className={cn(
                  styles.bubble,
                  isMine && styles.isMine,
                  startsSequence && styles.startsSequence,
                  endsSequence && styles.endsSequence
               )}
               onMouseOver={() => setIsHovering(true)}
               onMouseOut={() => setIsHovering(false)}
            >
               {data.text}
               <Fade in={isHovering} timeout={500} >

                  <div className={styles.hourTime}>
                     {hourTime}
                  </div>
               </Fade>

            </div>
         </div>

      </div>
   );
}