import React from 'react';
import moment from 'moment';

import styles from './Messages.module.scss'
import classNames from 'classnames';

import Avatar from 'react-avatar';


let cn = classNames;

export default function Message2({ data, isMine, startsSequence, endsSequence, showTimestamp, friendProfile }: any) {

   const friendlyTimestamp = moment(data.createdAt).format('LLLL');

   return (
      <div className={styles.message}>

         {showTimestamp &&
            <div className={styles.timestamps}>
               {friendlyTimestamp}
            </div>}

         <div className={cn(styles.bubbleContainer, isMine && styles['isMine'],)}>
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
            <div className={cn(
               styles.bubble,
               isMine && styles['isMine'],
               startsSequence && styles['startsSequence'],
               endsSequence && styles['endsSequence'],
            )}>
               {data.text}
            </div>

         </div>

      </div>
   );
}