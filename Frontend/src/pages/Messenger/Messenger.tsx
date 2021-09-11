import { createRef, FC, useEffect, useRef, useState } from 'react'
import styles from './Messenger.module.scss'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from '../../store/slices/messenger';

//Chat
import Conversation from '../../components/Chat/Conversation/Conversation'
import Message from '../../components/Chat/Message/Message'
import Online from '../../components/Chat/Online/Online'

//API
import api from '../../services/api';
import { useSocket } from '../../hooks/useSocket';

const Messenger: FC = () => {

   //Redux
   const { conversations } = useSelector(state => state.messenger);
   const { onlineUsers } = useSelector(state => state.user);
   const { id } = useSelector(state => state.user.userInfo);
   const dispatch = useDispatch()

   const { socket } = useSocket();
   const scrollRef = createRef<HTMLDivElement>();
   const mountedRef = useRef(true)

   //State
   const [messages, setMessages] = useState<any>([]);
   const [currentChat, setCurrentChat] = useState<any>(null);
   const [newMessage, setNewMessage] = useState("");
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);


   useEffect(() => {

      const disconnect = () => {
         socket.off('getMessage');
      };

      disconnect();

      socket.on('getMessage', (data: any) => {
         setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
            _id: Math.floor(Math.random() * 99999)
         });
      });

      return () => {
         disconnect();
      };

   }, [socket]);

   useEffect(() => {
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev: any) => [...prev, arrivalMessage]);
      return () => { mountedRef.current = false }

   }, [arrivalMessage, currentChat]);

   useEffect(() => {
      const getMessages = async () => {
         try {
            const res = await api.get("/api/messages/" + currentChat?._id);
            setMessages(res.data)
         } catch (err) {
            console.log(err);
         }
      };
      getMessages();
      return () => { mountedRef.current = false }

   }, [currentChat]);

   useEffect(() => {
      const getConversations = async () => {
         try {
            const res = await api.get("/api/conversation/" + id);

            if (!mountedRef.current) return null;
            dispatch(setConversations(res.data));

         } catch (err) {
            console.log(err);
         }
      };
      getConversations();
      return () => { mountedRef.current = false }
   }, [id, dispatch]);

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      if (newMessage && newMessage.trim() !== '') {
         const message = {
            sender: id,
            text: newMessage,
            conversationId: currentChat._id,
         };

         try {
            const res = await api.post("/api/messages", message);
            /* dispatch(setMessages([...messages, res.data])) */
            setMessages([...messages, res.data])
            setNewMessage("")
         } catch (err) {
            console.log(err);
         }

         const receiverId = currentChat.members.find(
            (member: any) => member !== id
         );

         socket.emit("sendMessage", {
            senderId: id,
            receiverId,
            text: newMessage,
         });
      }

   }

   //Scroll down messages by using references
   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages, scrollRef]);


   return (
      <div className={styles.container}>

         <div className={styles.menu}>
            <div className={styles.menuWrapper}>
               <input placeholder="Search for friends" className={styles.menuInput} />
               {conversations.map((c: any) => (
                  <div key={c._id} onClick={() => setCurrentChat(c)}>
                     <Conversation conversation={c} currentUserId={id} />
                  </div>
               ))}
            </div>
         </div>

         <div className={styles.box}>
            <div className={styles.boxWrapper}>
               {currentChat ? (
                  <>
                     {<div className={styles.boxTop}>
                        {messages.map((m: any) => (
                           <div key={m._id} ref={scrollRef} >
                              <Message message={m} own={m.sender === id} />
                           </div>
                        ))}
                     </div>}
                     <div className={styles.boxBottom}>
                        <textarea
                           className={styles.messageInput}
                           placeholder="write something..."
                           onChange={(e) => setNewMessage(e.target.value)}
                           value={newMessage}
                        ></textarea>
                        <button onClick={handleSubmit}>
                           Send
                        </button>
                     </div>
                  </>
               ) : (
                  <span className={styles.openConversation}>
                     Open a conversation to start a chat.
                  </span>
               )}
            </div>
         </div>
         <div className={styles.online}>
            <div className={styles.onlineWrapper}>
               {
                  onlineUsers.map((o: any) => (
                     <Online
                        key={o.userId}
                        onlineUsers={o}
                        currentUserId={id}
                        setCurrentChat={setCurrentChat}
                     />
                  ))
               }
            </div>
         </div>

      </div >
   )
}

export default Messenger