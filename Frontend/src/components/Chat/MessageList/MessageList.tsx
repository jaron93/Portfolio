// React, Redux
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

// Styles, Api
import styles from './MessageList.module.scss'
import api from '../../../services/api'
import { useSocket } from '../../../hooks/useSocket';

// Components
import Compose from '../Compose/Compose';
import Loading from '../../../components/Loading/Loading';
import Message from '../Message/Message'
import Toolbar from '../Toolbar/Toolbar'
import ToolbarButton from '../ToolbarButton/ToolbarButton'

// Icons
import { AiOutlineInfoCircle, AiFillPicture } from 'react-icons/ai'
import { FaThumbsUp, FaSmile } from 'react-icons/fa'

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default function MessageList() {

   const { id, username } = useSelector(state => state.user.userInfo);
   const { currentChat } = useSelector(state => state.messenger);

   const observer = useRef<IntersectionObserver>()
   const mountedRef = useRef(true)
   const targetRef = useRef<HTMLDivElement>(null)
   const dispatch = useDispatch()
   const { socket } = useSocket();

   // State
   const [page, setPage] = useState(1)
   const [messages, setMessages] = useState<any>([]);
   const [hasMore, setHasMore] = useState(false)
   const [loading, setLoading] = useState(true)
   const [newMessage, setNewMessage] = useState<any>("")
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
   const [openEmoji, setOpenEmoji] = useState(false);
   const [conversationTitle, setConversationTitle] = useState("Converation")

   // Reset Messages and Page each time when conversation has been changed. 
   useEffect(() => {
      setMessages([])
      setPage(1)
   }, [currentChat])

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


   // Fetch Messages from server, update page +1 each time when user see last messages.
   useEffect(() => {
      setLoading(true);
      api.get("/api/messages/" + currentChat?._id + `?page=${page}&count=10`)
         .then(res => {
            setMessages((prev: any) => {
               return [...new Set([...prev, ...res.data])]
            })
            setHasMore(res.data.length > 0)
            setLoading(false)
         }).catch(e => {
            console.log(e);
         })
   }, [currentChat?._id, dispatch, page]);


   // Ref to last element from messages
   const lastElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && hasMore) {
            if (messages || arrivalMessage) {
               setPage((prevPage: number) => prevPage + 1)
            }
         }
      })

      if (node) observer.current.observe(node)
   }, [loading, hasMore, messages, arrivalMessage])

   useEffect(() => {
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev: any) => [arrivalMessage, ...prev.slice(0, -1)]);
      return () => { mountedRef.current = false }

   }, [arrivalMessage, currentChat]);

   /*   const newMessage = () => {
        return
        sender: id,
        text: newMessage,
        conversationId: currentChat._id,
     }; */

   // Set Username Title 
   const getCurrentChatTitle = useCallback(() => {
      if (currentChat.length === 0) return null
      const friendId = currentChat.members.find((m: String) => m !== id)
      api.get("/api/user?userId=" + friendId)
         .then(res => setConversationTitle(res.data.username))
         .catch(e => console.log(e))
   }, [currentChat, id])

   //Run getCurrentChatTitle only if currentChat changed
   useEffect(() => {
      getCurrentChatTitle()
   }, [currentChat, getCurrentChatTitle])

   const handleSubmit = async (e: any) => {
      if (e.key === 'Enter') {
         e.preventDefault();

         if (newMessage && newMessage.trim() !== '') {
            const message = {
               sender: id,
               text: newMessage,
               conversationId: currentChat._id,
            };

            try {
               const res = await api.post("/api/messages", message);
               setMessages([res.data, ...messages.slice(0, -1)])
               setNewMessage("")
            } catch (err) {
               console.log(err);
            }

            const receiverId = currentChat.members.find(
               (member: any) => member !== id
            );

            socket.emit("sendMessage", {
               senderId: id,
               senderUsername: username,
               receiverId,
               text: newMessage,
            });
         }
      }
   }

   //Scroll down messages by using references
   useEffect(() => {
      const scroll = document.getElementById('scrollRef');
      scroll?.scrollTo(0, 0)
   }, [newMessage, arrivalMessage]);


   useEffect(() => {
      const checkIfClickedOutside = (e: any) => {
         // If the menu is open and the clicked target is not within the menu,
         // then close the menu
         if (openEmoji && targetRef.current && !targetRef.current.contains(e.target)) {
            setOpenEmoji(false)
         }
      }

      document.addEventListener("mousedown", checkIfClickedOutside)

      return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [openEmoji])

   return (
      <>
         <Toolbar
            title={conversationTitle.charAt(0).toUpperCase() + conversationTitle.slice(1)}
            rightItems={[
               <ToolbarButton
                  key="add"
                  icon={AiOutlineInfoCircle}
               />
            ]}
         />
         <div className={styles.element}>
            <div className={styles.container} id="scrollRef">
               {messages.map((m: any, index: number) => {

                  if (messages.length === index + 1) {
                     return <div key={m._id}>
                        <Message message={m} own={m.sender === id} />
                     </div>
                  } else {
                     return <div key={m._id} ref={lastElementRef}>
                        <Message message={m} own={m.sender === id} />
                     </div>
                  }
               })
               }
               {loading && <Loading />}
            </div>
            {currentChat.length !== 0 &&
               // This component required to remodel.. To much code
               // Push some component with function inside
               <Compose
                  onChange={(e: any) => setNewMessage(e.target.value)}
                  value={newMessage}
                  onKeyDown={handleSubmit}
                  leftItems={[
                     <ToolbarButton
                        key="picture"
                        icon={AiFillPicture}
                        style={{ fontSize: '25' }}
                     />
                  ]}
                  inputItems={[
                     <ToolbarButton
                        key="smile"
                        icon={FaSmile}
                        color={'#7b7b7bab'}
                        style={{ fontSize: '22' }}
                        onClick={() => setOpenEmoji(!openEmoji)}
                     />
                  ]}
                  rightItems={[
                     <ToolbarButton
                        key="thumb"
                        icon={FaThumbsUp}
                        style={{ fontSize: '25' }}
                     />
                  ]} />
            }

            {openEmoji &&
               // This div is only for reference with function to close Picker on click outside component 
               <div ref={targetRef}>
                  <Picker
                     style={{ position: 'absolute', bottom: '10px', right: '50px' }}
                     set='apple'
                     emojiTooltip={true}
                     title='Pick your emoji…'
                     onSelect={(emoji: any) => setNewMessage(newMessage + emoji.native)}
                     showPreview={false}
                     showSkinTones={false}
                  />
               </div>
            }


         </div>
      </>
   )
}


