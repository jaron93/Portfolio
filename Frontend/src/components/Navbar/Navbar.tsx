import React from 'react'
import styles from './Navbar.module.scss'
import logo from '../../assets/logo.png'

import { useDispatch } from "react-redux";
import { useTypedSelector } from '../../store/store';
import { toggleBar } from '../../store/slices/preferences';

import { IconContext } from 'react-icons/lib';
import { IoMdSettings } from 'react-icons/io';
import { ImHome } from 'react-icons/im';


export default function Navbar() {

   const handleClick = () => {
      dispatch(toggleBar());
   }

   const sidebarOpen = useTypedSelector(state => state.preferences.sidebarOpen);

   const dispatch = useDispatch();

   return (
      <>
         <nav className={sidebarOpen ? styles.container : styles.big}>
            <div className={styles.logo}>
               <img src={logo}></img>
            </div>
            <div className={styles.iconsContainer}>
               <IconContext.Provider value={{ color: 'white', size: '25' }}>
                  <ImHome />
                  <IoMdSettings onClick={handleClick} />
               </IconContext.Provider>
            </div>
         </nav>

      </>
   )
}

