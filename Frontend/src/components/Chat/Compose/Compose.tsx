// React, styles
import { useEffect, useRef, useState } from 'react';
import styles from './Compose.module.scss'

// Components
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

// Icons 
import { AiFillPicture } from 'react-icons/ai';
import { FaSmile, FaThumbsUp } from 'react-icons/fa';

export default function Compose(
   { onChange,
      value,
      onKeyDown,
      onSelect,
      thumbOnClick
   }: any) {

   const targetRef = useRef<HTMLDivElement>(null)
   const [openEmoji, setOpenEmoji] = useState(false);

   useEffect(() => {
      const checkIfClickedOutside = (e: any) => {
         // If the menu is open and the clicked target is not within the menu,
         // then close the menu
         if (openEmoji && targetRef.current && !targetRef.current.contains(e.target)) {
            setOpenEmoji(false)
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)

      return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [openEmoji])

   return (

      <div className={styles.compose}>
         {/*Left Add Picture Button*/}
         <ToolbarButton
            key="picture"
            icon={AiFillPicture}
            style={{ fontSize: '25' }}
         />

         <div className={styles.inputContainer}>
            <input
               type="text"
               placeholder="Type a message..."
               onChange={onChange}
               value={value}
               onKeyDown={onKeyDown}
            />
            {/*Middle Emoji Button*/}
            <ToolbarButton
               key="smile"
               icon={FaSmile}
               color={'#7b7b7bab'}
               style={{ fontSize: '22' }}
               onClick={() => setOpenEmoji(!openEmoji)}
            />
         </div>
         {/*Right Thumb Button*/}
         <ToolbarButton
            key="thumb"
            icon={FaThumbsUp}
            style={{ fontSize: '25' }}
            onClick={thumbOnClick}
         />

         {openEmoji &&
            // This div is only for reference with function to close Picker on click outside component 
            <div ref={targetRef}>
               <Picker
                  style={{ position: 'absolute', bottom: '50px', right: '50px' }}
                  set='apple'
                  emojiTooltip={true}
                  title='Pick your emoji…'
                  onSelect={onSelect}
                  showPreview={false}
                  showSkinTones={false}
               />
            </div>
         }
      </div>
   );
}