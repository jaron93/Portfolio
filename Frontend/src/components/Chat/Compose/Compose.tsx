import styles from './Compose.module.scss'

export default function Compose({ leftItems, inputItems, rightItems, onChange, value, onKeyDown }: any) {

   return (
      <div className={styles.compose}>
         {leftItems}
         <div className={styles.inputContainer}>
            <input
               type="text"
               placeholder="Type a message..."
               onChange={onChange}
               value={value}
               onKeyDown={onKeyDown}
            />
            {inputItems}
         </div>
         {rightItems}
      </div>
   );
}