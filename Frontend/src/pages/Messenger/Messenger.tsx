import { useSelector } from 'react-redux';
import ConversationList from '../../components/Chat/ConversationList/ConversationList'
import MessageList from '../../components/Chat/MessageList/MessageList'
import styles from './Messenger.module.scss'

export default function Messenger() {
   const { currentChat } = useSelector(state => state.messenger);

   return (
      <>
         <div className={styles.messenger}>

            <div className={styles.sidebar}>
               <ConversationList />
            </div>


            <div className={styles.content}>
               {currentChat &&
                  <MessageList />
               }
            </div>
         </div>
      </>
   )

}


