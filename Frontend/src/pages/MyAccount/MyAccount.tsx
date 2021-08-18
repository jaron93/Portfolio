import React, { FC } from 'react'
import styles from './MyAccount.module.scss'




const MyAccount: FC = () => {
   return (
      <div className={styles.container}>


         <div className={styles.element}>
            <div className={styles.header}>
               <h1>Change username</h1>
            </div>
         </div>

         <div className={styles.element}>
            <div className={styles.header}>
               <h1>Change password</h1>
            </div>
         </div>

         <div className={styles.element}>
            <div className={styles.header}>
               <h1>Delete account</h1>
            </div>
         </div>

         <div className={styles.element}>
            <div className={styles.header}>
               <h1>Change avatar</h1>
            </div>
         </div>

         <div className={styles.element}>
            <div className={styles.header}>
               <h1>Change description</h1>
            </div>
         </div>

         <div className={styles.element}>
            <div className={styles.header}>
               <h1>Others</h1>
            </div>
         </div>

      </div>
   )
}

export default MyAccount
