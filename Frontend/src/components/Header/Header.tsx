import React from 'react'
import styles from './Header.module.scss'
import { CgCardSpades } from 'react-icons/cg';
import { BiMenuAltRight } from 'react-icons/bi';

import { useDispatch } from "react-redux";
import { toggleBar } from '../../store/slices/preferences';

function Header() {

   const handleClick = () => {
      dispatch(toggleBar());
   }

   const dispatch = useDispatch();


   return (
      <header className={styles.header}>

         <div className={styles.menu_content}>
            <BiMenuAltRight className={styles.btn} onClick={handleClick} />
         </div>

         <div className={styles.logo_content}>
            <div className={styles.logo}>
               <CgCardSpades className={styles.logo_icon} />
               <div className={styles.logo_name}>Name of Site</div>
            </div>
         </div>

      </header>
   )
}

export default Header
