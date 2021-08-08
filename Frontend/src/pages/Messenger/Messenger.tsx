import React, { createRef, FC, useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";

import Conversation from '../../components/Chat/Conversation/Conversation'
import Message from '../../components/Chat/Message/Message'
import Online from '../../components/Chat/Online/Online'

import styles from './Messenger.module.scss'

import { axiosInstance } from '../../services/api';
import { io } from 'socket.io-client';

/* import { setConversations, setMessages } from '../../store/slices/messenger'; */

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL


const Messenger: FC = () => {
   const scrollRef = createRef<HTMLDivElement>();
   const socket = useRef<any>();

   const [onlineUsers, setOnlineUsers] = useState<any>([]);
   const [messages, setMessages] = useState<any>([]);
   const [conversations, setConversations] = useState([]);
   const [currentChat, setCurrentChat] = useState<any>(null);
   const [newMessage, setNewMessage] = useState("");
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);

   const mountedRef = useRef(true)

   /*   const { conversations, messages } = useSelector(state => state.messenger); */
   const { id } = useSelector(state => state.user.userInfo);


   useEffect(() => {
      socket.current = io(`${SOCKET_URL}`);
      socket.current.on("getMessage", (data: any) => {
         setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
            _id: Math.floor(Math.random() * 99999)
         });
      });
      return () => {
         socket.current.disconnect();
      }

   }, []);

   useEffect(() => {
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev: any) => [...prev, arrivalMessage]);
      return () => { mountedRef.current = false }

   }, [arrivalMessage, currentChat]);

   useEffect(() => {
      const getMessages = async () => {
         try {
            const res = await axiosInstance("/api/messages/" + currentChat?._id);
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
            const res = await axiosInstance("/api/conversation/" + id);
            /* dispatch(setConversations(res.data)); */
            if (!mountedRef.current) return null;

            setConversations(res.data)
         } catch (err) {
            console.log(err);
         }
      };
      getConversations();
      return () => { mountedRef.current = false }
   }, [id, conversations]);

   useEffect(() => {
      socket.current.emit("addUser", id);
      socket.current.on("getUsers", (users: any) => {
         setOnlineUsers(
            users.filter((user: any) => user.userId !== id)
         );
      })

   }, [id]);


   const handleSubmit = async (e: any) => {
      e.preventDefault();

      if (newMessage && newMessage.trim() !== '') {
         const message = {
            sender: id,
            text: newMessage,
            conversationId: currentChat._id,
         };

         try {
            const res = await axiosInstance.post("/api/messages", message);
            /* dispatch(setMessages([...messages, res.data])) */
            setMessages([...messages, res.data])
            setNewMessage("")
         } catch (err) {
            console.log(err);
         }

         const receiverId = currentChat.members.find(
            (member: any) => member !== id
         );


         socket.current.emit("sendMessage", {
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