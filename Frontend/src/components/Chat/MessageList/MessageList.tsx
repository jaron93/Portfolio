// React, Redux
import { useCallback, useEffect, useRef, useState } from 'react'
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
import { AiOutlineInfoCircle } from 'react-icons/ai'
import moment from 'moment';
/* import _ from 'lodash'; */

export default function MessageList() {

   const { id, username } = useSelector(state => state.user.userInfo);
   const { currentChat } = useSelector(state => state.messenger);

   const observer = useRef<IntersectionObserver>()
   const mountedRef = useRef(true)
   const dispatch = useDispatch()
   const { socket } = useSocket();

   // State
   const [page, setPage] = useState(1)
   const [messages, setMessages] = useState<any>([]);
   const [hasMore, setHasMore] = useState(false)
   const [loading, setLoading] = useState(true)
   const [newMessage, setNewMessage] = useState<any>("")
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
   const [friendProfile, setFriendProfile] = useState<any>(null)


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

   // Fetch Friend Profile
   const getFriendData = useCallback(() => {
      if (currentChat.length === 0) return null
      const friendId = currentChat.members.find((m: String) => m !== id)
      api.get("/api/user?userId=" + friendId)
         .then(res => setFriendProfile(res.data))
         .catch(e => console.log(e))
   }, [currentChat, id])

   //Run getCurrentChatTitle only if currentChat changed
   useEffect(() => {
      getFriendData()
   }, [currentChat, getFriendData])

   // Add new messages to api and emit to server
   // Submit by pressing enter
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



   const handleThumbSubmit = async (e: any) => {
      e.preventDefault();

      const message = {
         sender: id,
         text: "👍",
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
         text: "👍",
      });
   }

   //Scroll down messages by using references
   useEffect(() => {
      const scroll = document.getElementById('scrollRef');
      scroll?.scrollTo(0, 0)
   }, [newMessage, arrivalMessage]);


   /*    function groupBy(dataToGroupOn: any, fieldNameToGroupOn: _.ValueIteratee<any> | undefined, fieldNameForGroupName: _.PropertyName, fieldNameForChildren: _.PropertyName) {
         var result = _.chain(dataToGroupOn)
            .groupBy(fieldNameToGroupOn)
            .toPairs()
            .map(function (currentItem) {
               return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
            })
            .value();
         return result;
      }
   
      var result = groupBy(messages, 'sender', 'senderId', 'users');
   
      console.log(result); */

   /*    const data = [{ "name": "jim", "color": "blue", "age": "22" }, { "name": "Sam", "color": "blue", "age": "33" }, { "name": "eddie", "color": "green", "age": "77" }];
   
      console.log(_.chain(data)
         .groupBy("color")
         .toPairs()
         .map(item => _.zipObject(["color", "users"], item))
         .value());
    */


   return (
      <>
         <Toolbar
            title={
               friendProfile ?
                  friendProfile.username.charAt(0).toUpperCase() + friendProfile.username.slice(1)
                  : "Conversation"
            }
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
                        <Message
                           message={m}
                           own={m.sender === id}
                           friendProfile={friendProfile}
                        />
                     </div>
                  } else {
                     return <div key={m._id} ref={lastElementRef}>
                        <Message
                           message={m}
                           own={m.sender === id}
                           friendProfile={friendProfile}
                        />
                     </div>
                  }
               })}

               {loading && <Loading />}
            </div>

            {currentChat.length !== 0 &&
               <Compose
                  onChange={(e: any) => setNewMessage(e.target.value)}
                  value={newMessage}
                  onKeyDown={handleSubmit}
                  onSelect={(emoji: any) => setNewMessage(newMessage + emoji.native)}
                  thumbOnClick={handleThumbSubmit}
               />}
         </div>
      </>
   )
}


