import React from 'react'
import styles from './Header.module.scss'
import { CgCardSpades } from 'react-icons/cg';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { toggleBar } from '../../store/slices/preferences';

const Header: React.FC = () => {

   const dispatch = useDispatch();

   const { username } = useSelector(state => state.user.userInfo)

   const handleClick = () => {
      dispatch(toggleBar());
   }

   return (



      <header className={styles.header}>
         <div className={styles.menu_content}>
            <AiOutlineMenuUnfold className={styles.btn} onClick={handleClick} />
         </div>

         <div className={styles.logo_content}>
            <div className={styles.logo}>
               <CgCardSpades className={styles.logo_icon} />
               <div className={styles.logo_name}>Name of Site</div>
            </div>
         </div>
         {!!username &&
            <div className={styles.welcome}>
               <span>Welcome, {username}!</span>
            </div>
         }
      </header>

   )
}

export default Header
