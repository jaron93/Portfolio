import styles from './Online.module.scss'

import image from '../../../assets/person/6.jpeg'

export default function Online() {

   return (
      <li className={styles.element}>
         <div className={styles.container}>
            <img src={image} alt="" />
            <span className={styles.online}></span>
         </div>
         <span className={styles.username}>Franek Kimono</span>
      </li>
   );
}
