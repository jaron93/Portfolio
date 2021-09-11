import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import styles from './Sidebar.module.scss'
import { Link, NavLink, useHistory } from 'react-router-dom'
import classNames from 'classnames';

import { IconContext } from "react-icons";
import { AiOutlineHome } from 'react-icons/ai';
import { IoMdPower } from 'react-icons/io';
import { FiUserPlus, FiLogIn, FiHelpCircle } from 'react-icons/fi';
import { BiMessageDots } from 'react-icons/bi';
import { RiMessengerFill, RiSettings3Line } from 'react-icons/ri';
import { logout } from '../../store/slices/user'
import { hideBar } from '../../store/slices/preferences'

import { isLoggedIn } from 'axios-jwt'

let cn = classNames;

const Sidebar: React.FC = () => {
   const history = useHistory();
   const dispatch = useDispatch()
   const sidebarOpen = useSelector(state => state.preferences.sidebarOpen);

   const isActive = sidebarOpen && styles['isActive'];

   const handleNavigateToPage = () => {
      if (window.innerWidth <= 576) {
         dispatch(hideBar());
      }
   }

   const handleLogout = () => {
      dispatch(logout())
      history.push('/')
   }

   return (
      <IconContext.Provider value={{ className: styles.icon }}>

         <div className={cn(styles.sidebar, isActive)}>
            <ul>

               <div>

                  <li>
                     <NavLink
                        to="/"
                        onClick={() => { handleNavigateToPage() }}
                        exact activeClassName={styles.active}
                     >
                        <AiOutlineHome />
                        <span className={cn(styles.links_name, isActive)}>Home Page</span>
                     </NavLink>
                     <span className={cn(styles.tooltip, isActive)}>Home Page</span>
                  </li>
                  {isLoggedIn() &&
                     <li>
                        <NavLink
                           to="/messenger"
                           onClick={() => { handleNavigateToPage() }}
                           activeClassName={styles.active}
                        >
                           <RiMessengerFill />
                           <span className={cn(styles.links_name, isActive)}>Messenger</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Messenger</span>
                     </li>
                  }

                  {isLoggedIn() &&
                     <li>
                        <NavLink
                           to="/settings"
                           onClick={() => { handleNavigateToPage() }}
                           activeClassName={styles.active}
                        >
                           <RiSettings3Line />
                           <span className={cn(styles.links_name, isActive)}>Settings</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Settings</span>
                     </li>
                  }


                  {!isLoggedIn() &&
                     <li>
                        <NavLink
                           to="/signin"
                           onClick={() => { handleNavigateToPage() }}
                           activeClassName={styles.active}
                        >
                           <FiLogIn />
                           <span className={cn(styles.links_name, isActive)}>Login</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Login</span>
                     </li>
                  }
                  {!isLoggedIn() &&
                     <li>
                        <NavLink
                           to="/signup"
                           onClick={() => { handleNavigateToPage() }}
                           activeClassName={styles.active}
                        >
                           <FiUserPlus />
                           <span className={cn(styles.links_name, isActive)}>Register</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Register</span>
                     </li>
                  }

                  <li>
                     <NavLink
                        to="/help"
                        onClick={() => { handleNavigateToPage() }}
                        activeClassName={styles.active}
                     >
                        <FiHelpCircle />
                        <span className={cn(styles.links_name, isActive)}>Help</span>
                     </NavLink>
                     <span className={cn(styles.tooltip, isActive)}>Help</span>
                  </li>

                  <li>
                     <NavLink
                        to="/contact"
                        onClick={() => { handleNavigateToPage() }}
                        activeClassName={styles.active}
                     >
                        <BiMessageDots />
                        <span className={cn(styles.links_name, isActive)}>Contact</span>
                     </NavLink>
                     <span className={cn(styles.tooltip, isActive)}>Contact</span>
                  </li>
               </div>

               {isLoggedIn() &&
                  <li>
                     <Link
                        to="/"
                        onClick={handleLogout}>
                        <IoMdPower />
                        <span className={cn(styles.links_name, isActive)}>Logout</span>
                     </Link>
                     <span className={cn(styles.tooltip, isActive)}>Logout</span>
                  </li>
               }

            </ul>
         </div>


      </IconContext.Provider >
   )
}

export default Sidebar
