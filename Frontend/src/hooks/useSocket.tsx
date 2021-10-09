import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setOnlineUsers } from '../store/slices/user'
import { Socket, io } from 'socket.io-client';
import { useState } from 'react';
import { getAccessToken } from 'axios-jwt';


interface SocketContextData {
   socket: Socket;
   connected: boolean;
}

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL


const SocketContext = createContext<SocketContextData>({} as SocketContextData);


const SocketProvider: React.FC = ({ children }) => {

   const { id } = useSelector(state => state.user.userInfo);
   const dispatch = useDispatch()
   const token = getAccessToken()
   const [connected, setConnected] = useState(false)

   const socket = useMemo(() => {
      return io(`${SOCKET_URL}`, {
         auth: {
            token,
         },
      })

   }, [token]);

   useEffect(() => {
      const disconnect = () => {
         socket.off('connect');
         socket.off('disconnect');
      };

      disconnect();

      socket.on('connect', () => {
         socket.sendBuffer = [];
         setConnected(true);
      });

      socket.on('disconnect', () => {
         setConnected(false);
      });

      return () => {
         disconnect();
      };
   }, [socket]);

   useEffect(() => {

      /*       const disconnect = () => {
               socket.off('getUsers');
            };
      
            disconnect(); */

      socket.emit("addUser", id);
      socket.on('getUsers', (users) => {
         dispatch(setOnlineUsers(users));
      })

   }, [dispatch, id, socket]);


   return (

      <SocketContext.Provider value={{ socket, connected }}   >
         {children}
      </SocketContext.Provider>

   );
}

function useSocket() {
   const context = useContext(SocketContext);

   return context;
}

export { SocketProvider, useSocket };
