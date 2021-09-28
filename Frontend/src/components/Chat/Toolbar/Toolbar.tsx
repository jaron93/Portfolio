import React from 'react'
import styles from './Toolbar.module.scss'

export default function Toolbar({ title, leftItems, rightItems }: any) {

   return (
      <div className={styles.toolbar}>
         <div className={styles.left}>{leftItems}</div>
         <h1 className={styles.title}>{title}</h1>
         <div className={styles.right}>{rightItems}</div>
      </div>
   )
}

