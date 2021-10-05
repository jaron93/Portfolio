import { useSelector } from 'react-redux';
import ConversationList from '../../components/Chat/ConversationList/ConversationList'
import MessageList from '../../components/Chat/MessageList/MessageList'
import styles from './Messenger.module.scss'
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

let cn = classNames;

export default function Messenger() {

   const [onlineUsers, setOnlineUsers] = useState([])

   const { socket } = useSocket();

   useEffect(() => {
      socket.on('getUsers', (data: any) => {
         setOnlineUsers(data)
      });
   }, [socket]);


   const { currentChat } = useSelector(state => state.messenger);
   const { selectedConversation } = useSelector(state => state.preferences);

   return (
      <div className={styles.messenger}>

         <div className={cn(styles.sidebar, selectedConversation && styles['isActive'])}>
            <ConversationList onlineUsers={onlineUsers} />
         </div>


         <div className={cn(styles.content, selectedConversation && styles['isActive'])}>
            {!!currentChat &&
               <MessageList onlineUsers={onlineUsers} />
            }
         </div>
      </div>
   )

}


