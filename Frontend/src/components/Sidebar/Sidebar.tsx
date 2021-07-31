import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import styles from './Sidebar.module.scss'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames';
import { IconContext } from "react-icons";

import { AiOutlineHome } from 'react-icons/ai';
import { IoMdPower } from 'react-icons/io';
import { FiUserPlus, FiLogIn, FiHelpCircle } from 'react-icons/fi';
import { BiMessageDots } from 'react-icons/bi';

import { clearAuthTokens } from 'axios-jwt'
import { clearState } from '../../store/slices/user';
import { hideBar } from '../../store/slices/preferences'


let cn = classNames;


const Sidebar: React.FC = () => {

   const dispatch = useDispatch()
   const sidebarOpen = useSelector(state => state.preferences.sidebarOpen);

   const isActive = sidebarOpen && styles['isActive'];


   const { userInfo } = useSelector(state => state.user);

   const handleNavigateToPage = () => {
      if (window.innerWidth <= 576) {
         dispatch(hideBar());
      }
   }

   const handleLogout = () => {
      clearAuthTokens()
      dispatch(clearState())
   }

   return (
      <IconContext.Provider value={{ className: styles.icon }}>

         <div className={cn(styles.sidebar, isActive)}>
            <ul>
               <div>

                  <li>
                     <NavLink
                        to="/"
                        className={styles.link}
                        onClick={() => { handleNavigateToPage() }}
                     >
                        <AiOutlineHome className={styles.icon1} />
                        <span className={cn(styles.links_name, isActive)}>Home Page</span>
                     </NavLink>
                     <span className={cn(styles.tooltip, isActive)}>Home Page</span>
                  </li>
                  {!userInfo &&
                     <li>
                        <NavLink
                           to="/signin"
                           className={styles.link}
                           onClick={() => { handleNavigateToPage() }}
                        >
                           <FiLogIn /* className={styles.icon2} */ />
                           <span className={cn(styles.links_name, isActive)}>Login</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Login</span>
                     </li>
                  }
                  {!userInfo &&
                     <li>
                        <NavLink
                           to="/signup"
                           className={styles.link}
                           onClick={() => { handleNavigateToPage() }}
                        >
                           <FiUserPlus /* className={styles.icon3} */ />
                           <span className={cn(styles.links_name, isActive)}>Register</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Register</span>
                     </li>
                  }

                  <li>
                     <Link
                        to="/"
                        className={styles.link}
                        onClick={() => { handleNavigateToPage() }}
                     >
                        <FiHelpCircle />
                        <span className={cn(styles.links_name, isActive)}>Help</span>
                     </Link>
                     <span className={cn(styles.tooltip, isActive)}>Help</span>
                  </li>

                  <li>
                     <Link
                        to="/"
                        className={styles.link}
                        onClick={() => { handleNavigateToPage() }}
                     >
                        <BiMessageDots />
                        <span className={cn(styles.links_name, isActive)}>Contact</span>
                     </Link>
                     <span className={cn(styles.tooltip, isActive)}>Contact</span>
                  </li>

               </div>

               {!!userInfo &&
                  < li >
                     <div className={styles.link} onClick={handleLogout}>
                        <IoMdPower />
                        <span className={cn(styles.links_name, isActive)}>Logout</span>
                     </div>
                     <span className={cn(styles.tooltip, isActive)}>Logout</span>
                  </li>
               }

            </ul>
         </div>


      </IconContext.Provider >
   )
}

export default Sidebar
