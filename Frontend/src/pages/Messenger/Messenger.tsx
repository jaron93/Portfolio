import { useSelector } from 'react-redux';
import ConversationList from '../../components/Chat/ConversationList/ConversationList'
import MessageList from '../../components/Chat/MessageList/MessageList'
import styles from './Messenger.module.scss'
import classNames from 'classnames';

let cn = classNames;

export default function Messenger() {

   const { currentChat } = useSelector(state => state.messenger);
   const { selectedConversation } = useSelector(state => state.preferences);

   return (
      <div className={styles.messenger}>

         <div className={cn(styles.sidebar, selectedConversation && styles['isActive'])}>
            <ConversationList />
         </div>


         <div className={cn(styles.content, selectedConversation && styles['isActive'])}>
            {!!currentChat &&
               <MessageList />
            }
         </div>
      </div>
   )

}


