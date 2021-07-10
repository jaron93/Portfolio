import React, { useState } from 'react'
import styles from './Sidebar.module.scss'
import { Link, NavLink } from 'react-router-dom'

import classNames from 'classnames';

import { IconContext } from "react-icons";
import { CgMenuGridO } from 'react-icons/cg';

import { useTypedSelector } from '../../store/store';

let cn = classNames;


export default function Sidebar() {

   const sidebarOpen = useTypedSelector(state => state.preferences.sidebarOpen);

   const isActive = sidebarOpen && styles['isActive'];

   return (
      <IconContext.Provider value={{ className: styles.icon }}>

         <div className={cn(styles.sidebar, isActive)}>

            <ul>

               <li>
                  <Link to="/" className={styles.link}>
                     <CgMenuGridO className={styles.icon1} />
                     <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                  </Link>
                  <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
               </li>

               <li>
                  <Link to="/" className={styles.link}>
                     <CgMenuGridO className={styles.icon2} />
                     <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                  </Link>
                  <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
               </li>

               <li>
                  <Link to="/" className={styles.link}>
                     <CgMenuGridO className={styles.icon3} />
                     <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                  </Link>
                  <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
               </li>

               <li>
                  <Link to="/" className={styles.link}>
                     <CgMenuGridO className={styles.icon4} />
                     <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                  </Link>
                  <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
               </li>

               <li>
                  <Link to="/" className={styles.link}>
                     <CgMenuGridO className={styles.icon5} />
                     <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                  </Link>
                  <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
               </li>

               <li>
                  <Link to="/" className={styles.link}>
                     <CgMenuGridO className={styles.icon6} />
                     <span className={cn(styles.links_name, isActive)}>Dashboard</span>
                  </Link>
                  <span className={cn(styles.tooltip, isActive)}>Dashboard</span>
               </li>
            </ul>

            {/*  <div className="profile_content">
               <div className="profile">
                  <div className="profile_details">
                     <img src="profile.jpg" alt="">
                        <div className="name_job">
                           <div className="name">Prem Shahi</div>
                           <div className="job">Web Designer</div>
                        </div>
                        <i className='bx bx-log-out' id="log_out" ></i>
                  </div>
                  </div>
               </div> */}

         </div>


      </IconContext.Provider >
   )
}
