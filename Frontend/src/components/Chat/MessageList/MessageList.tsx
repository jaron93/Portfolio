// React, Redux...
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { isConversationSelected } from '../../../store/slices/preferences';

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
import { IoMdArrowBack } from 'react-icons/io'

import moment from 'moment';
import _ from 'lodash';



export default function MessageList() {

   const { id, username } = useSelector(state => state.user.userInfo);
   const { currentChat } = useSelector(state => state.messenger);
   const { selectedConversation } = useSelector(state => state.preferences);

   const observer = useRef<IntersectionObserver>()
   const mountedRef = useRef(true)
   const dispatch = useDispatch()
   const history = useHistory();
   const { socket } = useSocket();

   // State
   const [page, setPage] = useState(1)
   const [messages, setMessages] = useState<any>([]);
   const [hasMore, setHasMore] = useState(false)
   const [loading, setLoading] = useState(true)
   const [newMessage, setNewMessage] = useState<any>("")
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
   const [friendProfile, setFriendProfile] = useState<any>(null)

   // Reset state each time when conversation has been changed. 
   useEffect(() => {
      setMessages([])
      setPage(1)
      setHasMore(false)
      setArrivalMessage(null)
      setNewMessage("")
   }, [currentChat])

   // Get messages form socket
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
            if (!messages.length) setMessages(res.data)
            // Use Lodash union to remove duplicates messages. It's very important to keep in this way.
            setMessages((prev: any) => _.unionBy([...prev, ...res.data], '_id'))
            setHasMore(res.data.length > 0)
            setLoading(false)
            if (!mountedRef.current) return null;
         }).catch(e => {
            console.log(e);
         })
      return () => {
         mountedRef.current = false
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

   // Include arrival messages to state
   useEffect(() => {
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev: any) => [arrivalMessage, ...prev])
      return () => { mountedRef.current = false }
   }, [arrivalMessage, currentChat]);

   // Fetch Friend Profile, useMemo avoid rerendering Avatar profile after using infinite scroll
   useMemo(() => {
      const getFriendData = () => {
         if (currentChat.length === 0) return null
         const friendId = currentChat.members.find((m: String) => m !== id)
         api.get("/api/user?userId=" + friendId)
            .then(res => setFriendProfile(res.data))
            .catch(e => console.log(e))
      }
      getFriendData()
   }, [currentChat.length, currentChat.members, id])

   // Add new messages to api and emit to server
   // Submit by pressing enter
   const handleSubmit = async (e: any) => {

      if (e.keyCode === 13) {

         if (!e.shiftKey && !e.altKey && !e.ctrlKey) {

            if (newMessage && newMessage.trim() !== '') {
               const message = {
                  sender: id,
                  text: newMessage,
                  conversationId: currentChat._id,
               };

               try {
                  const res = await api.post("/api/messages", message);
                  setMessages((prev: any) => [...res.data, ...prev])
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
         if (e.shiftKey) {
            //replace the shift for keycode 13 only
            return 13;
         }
         e.preventDefault();
      }

   }

   // Send thumb, for now it's just copy function of handleSubmit without unnecessary 'if'
   const handleThumbSubmit = async (e: any) => {
      e.preventDefault();

      const message = {
         sender: id,
         text: "👍",
         conversationId: currentChat._id,
      };

      try {
         const res = await api.post("/api/messages", message);
         setMessages([...res.data, ...messages])
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

      // Scroll to bottom after pressing Thumb button
      const scroll = document.getElementById('scrollRef');
      scroll?.scrollTo(0, 0)
   }

   // Scroll down messages by using references
   useEffect(() => {
      const scroll = document.getElementById('scrollRef');
      scroll?.scrollTo(0, 0)
   }, [newMessage, arrivalMessage]);

   // Render messages sorted by groups and timetamps
   const renderMessages = () => {
      let i = 0;
      let messageCount = messages.length;
      let tempMessages = [];

      while (i < messageCount) {
         let previous = messages[i + 1];
         let current = messages[i];
         let next = messages[i - 1];
         let isMine = current.sender === id;
         let currentMoment = moment(current.createdAt);
         let prevBySameAuthor = false;
         let nextBySameAuthor = false;
         let startsSequence = true;
         let endsSequence = true;
         let showTimestamp = true;

         if (previous) {
            let previousMoment = moment(previous.createdAt);
            let previousDuration = moment.duration(currentMoment.diff(previousMoment));
            prevBySameAuthor = previous.sender === current.sender;

            if (prevBySameAuthor && previousDuration.as('hours') < 1) {
               startsSequence = false;
            }

            if (previousDuration.as('hours') < 1) {
               showTimestamp = false;
            }
         }

         if (next) {
            let nextMoment = moment(next.createdAt);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            nextBySameAuthor = next.sender === current.sender;

            if (nextBySameAuthor && nextDuration.as('hours') < 1) {
               endsSequence = false;
            }
         }

         tempMessages.push(
            (tempMessages.length < 9) ?
               <div key={i}>
                  <Message
                     friendProfile={friendProfile}
                     isMine={isMine}
                     startsSequence={startsSequence}
                     endsSequence={endsSequence}
                     showTimestamp={showTimestamp}
                     data={current}
                  />
               </div>
               :
               <div key={i} ref={lastElementRef}>
                  <Message
                     friendProfile={friendProfile}
                     isMine={isMine}
                     startsSequence={startsSequence}
                     endsSequence={endsSequence}
                     showTimestamp={showTimestamp}
                     data={current}
                  />
               </div>
         );
         // Proceed to the next message.
         i += 1;
      }

      return tempMessages;
   }
   // Back to conversation list from current conversation (Mobile version with splited conversation and messages window)
   useEffect(() => {
      return () => {
         if (history.action === "POP" && selectedConversation) {
            dispatch(isConversationSelected(false))
            history.push('/messenger')
         }
      }
   }, [dispatch, history, selectedConversation])

   return (
      <>
         <Toolbar
            leftItems={[
               <ToolbarButton
                  key="back"
                  icon={IoMdArrowBack}
                  className={styles.backArrow}
                  onClick={() => {
                     dispatch(isConversationSelected(false))
                     history.push('/messenger')
                  }}
               />
            ]}
            avatar={friendProfile}
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
               {renderMessages()}
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


