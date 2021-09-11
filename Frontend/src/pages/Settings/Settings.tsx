import React, { FC } from 'react'
import styles from './Settings.module.scss'

import { useSelector } from 'react-redux';
import { IconContext } from 'react-icons';


const Settings: FC = () => {

   const { username, profileAvatar } = useSelector(state => state.user.userInfo);

   return (
      <IconContext.Provider value={{ className: styles.icon }}>
         <div className={styles.container}>
            <div className={styles.userInfo}>
               <div className={styles.avatarSection}>
                  <img
                     className={styles.img}
                     src={`${"avatars/" + profileAvatar}`}
                     alt="avatar"
                  />
                  <span className={styles.text}>{username}</span>
               </div>


               <div className={styles.infoSection}>info</div>













               {/*       <div className={styles.avatar}>
                  <img
                     className={styles.img}
                     src={`${"avatars/" + profileAvatar}`}
                     alt="avatar"
                  />
                  <span className={styles.text}>{username}</span>
               </div>

               <div className={styles.info}>

                  <div className={styles.top}>
                     <span className={styles.infoText}>Username: {username}</span>
                     <span className={styles.infoText}>E-mail: {email}</span>
                     <span className={styles.infoText}>UserID: {id}</span>
                  </div>
                  <div className={styles.bottom}>
                     <span className={styles.infoText}>Informacje np. last login</span>
                  </div>

               </div> */}

            </div>

            {/* <div className={styles.updateSection}>
               <div className={styles.menu}>
                  <ul>
                     <li>
                        <NavLink to="/">
                           <RiLockPasswordLine />
                           <span>Change password</span>
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/">
                           <RiLockPasswordLine />
                           <span>Change password</span>
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/">
                           <RiLockPasswordLine />
                           <span>Change password</span>
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/">
                           <RiLockPasswordLine />
                           <span>Change password</span>
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <div className={styles.updateContainer}>

               </div>
            </div> */}
         </div>
      </IconContext.Provider>
   )
}

export default Settings