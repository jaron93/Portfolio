import React from 'react'

import styles from './Message.module.scss'
import TimeAgo from 'timeago-react';
import image from '../../../assets/person/2.jpeg'

function Message({ message, own }: any) {

   return (
      <div className={own ? styles.own : styles.element}>
         <div className={styles.top}>
            <img
               className={styles.img}
               src={image}
               alt="" />
            <p className={styles.text}>
               {message.text}
            </p>
         </div>
         <div className={styles.bottom}>
            <TimeAgo
               datetime={message.createdAt}
               live={false}
            />
         </div>
      </div>
   )
}

export default Message
