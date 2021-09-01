import React from 'react'
import styles from './Header.module.scss'
import { CgCardSpades } from 'react-icons/cg';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { toggleBar } from '../../store/slices/preferences';
import logo from '../../assets/logo.png'

const Header: React.FC = () => {

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

            <div className={styles.logo}>
               <img src={logo} alt="JN" />
               <span className={styles.title}>Portfolio App</span>
            </div>

         </div>

      </header>

   )
}

export default Header
