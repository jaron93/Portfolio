import styles from './Message.module.scss'

import TimeAgo from 'timeago-react';

import Avatar from 'react-avatar';

function Message({ message, own, friendProfile }: any) {

   return (
      <div className={own ? styles.own : styles.element}>
         <div className={styles.top}>
            {!own &&
               <Avatar
                  name={friendProfile?.username}
                  size="35"
                  round
                  color="#a14712f9"
                  src={`/avatars/${friendProfile?.profileAvatar}`}
                  className={styles.avatar}
               />
            }
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
