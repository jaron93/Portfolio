import React from 'react'
import styles from './Header.module.scss'

import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { toggleBar } from '../../store/slices/preferences';
import logo from '../../assets/logo.png'
import { Stack } from '@mui/material';
import Notifications from './HeaderComponents/Notifications/Notifications';
import Avatar from 'react-avatar';


const Header: React.FC = () => {

   const { username, profileAvatar } = useSelector(state => state.user.userInfo);

   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(toggleBar());
   }

   return (
      <header className={styles.header}>

         <div className={styles.menu}>
            <AiOutlineMenuUnfold className={styles.btn} onClick={handleClick} />
         </div>

         <div className={styles.main}>

            <div className={styles.left}>
               <img src={logo} alt="JN" />
               <span className={styles.title}>Portfolio App</span>
            </div>

            <div className={styles.right}>
               <Stack spacing={2} direction="row" alignItems="center">
                  <Notifications />
                  <Avatar
                     name={username}
                     size="45"
                     round
                     color="#68686852"
                     src={`/avatars/${profileAvatar}`}
                     className={styles.avatar}
                  />
               </Stack>
            </div>

         </div>

      </header>
   )
}

export default Header
