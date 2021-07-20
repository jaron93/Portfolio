import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import styles from './Sidebar.module.scss'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames';


import { IconContext } from "react-icons";
import { CgMenuGridO } from 'react-icons/cg';
import { IoMdPower } from 'react-icons/io';
import { FiUserPlus } from 'react-icons/fi';
import { TiContacts } from 'react-icons/ti';

import { clearAuthTokens } from 'axios-jwt'
import { clearState } from '../../store/slices/user';




let cn = classNames;


const Sidebar: React.FC = () => {

   const dispatch = useDispatch()

   const sidebarOpen = useSelector(state => state.preferences.sidebarOpen);

   const isActive = sidebarOpen && styles['isActive'];


   const { userInfo } = useSelector(state => state.user);


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
                     <NavLink to="/" className={styles.link}>
                        <CgMenuGridO className={styles.icon1} />
                        <span className={cn(styles.links_name, isActive)}>Home Page</span>
                     </NavLink>
                     <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
                  </li>
                  {!userInfo &&
                     <li>
                        <NavLink to="/signin" className={styles.link}>
                           <CgMenuGridO /* className={styles.icon2} */ />
                           <span className={cn(styles.links_name, isActive)}>Signin</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Signin</span>
                     </li>
                  }
                  {!userInfo &&
                     <li>
                        <NavLink to="/signup" className={styles.link}>
                           <FiUserPlus /* className={styles.icon3} */ />
                           <span className={cn(styles.links_name, isActive)}>Signup</span>
                        </NavLink>
                        <span className={cn(styles.tooltip, isActive)}>Signup</span>
                     </li>
                  }

                  <li>
                     <Link to="/" className={styles.link}>
                        <CgMenuGridO /* className={styles.icon4} */ />
                        <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                     </Link>
                     <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
                  </li>

                  <li>
                     <Link to="/" className={styles.link}>
                        <TiContacts /* className={styles.icon5} */ />
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