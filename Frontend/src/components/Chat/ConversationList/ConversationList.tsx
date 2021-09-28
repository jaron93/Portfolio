// React and Redux
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from '../../../store/slices/messenger'

// Utils
import styles from './ConversationList.module.scss'
import api from '../../../services/api'

// Components
import Toolbar from '../Toolbar/Toolbar'
import ToolbarButton from '../ToolbarButton/ToolbarButton'
import ConversationSearch from '../ConversationSearch'
import ConversationListItem from '../ConversationListItem/ConversationListItem'
import Loading from '../../../components/Loading/Loading';

// Icons
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ImCogs } from 'react-icons/im'

export default function ConversationList() {

   const dispatch = useDispatch()
   const mountedRef = useRef(true)

   const { id } = useSelector(state => state.user.userInfo);
   const [conversations, setConversations] = useState<any>([]);
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(true);
      const getConversations = async () => {
         try {
            const res = await api.get("/api/conversation/" + id);
            setConversations(res.data)
            setLoading(false)
            if (!mountedRef.current) return null;
         } catch (err) {
            console.log(err);
         }
      };
      getConversations();
      return () => {
         mountedRef.current = false
         if (!mountedRef.current) dispatch(setCurrentChat([]))
      }
   }, [dispatch, id]);

   return (
      <div className={styles.ConversationList}>
         <Toolbar
            title="Messenger"
            leftItems={[
               <ToolbarButton
                  key="cog"
                  icon={ImCogs}
               />
            ]}
            rightItems={[
               <ToolbarButton
                  key="add"
                  icon={AiOutlinePlusCircle}
               />
            ]}
         />
         <ConversationSearch />
         {conversations.map((conversation: any) =>
            <div key={conversation._id} onClick={() => dispatch(setCurrentChat(conversation))}>
               <ConversationListItem
                  key={conversation._id}
                  data={conversation}
                  currentUserId={id}
               />
            </div>
         )}
         {loading && <Loading />}
      </div >
   )
}

