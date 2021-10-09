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

// MUI
import { ClickAwayListener } from '@mui/material';

export default function Compose(
   { onChange,
      value,
      onKeyDown,
      onSelect,
      thumbOnClick
   }: any) {

   const textareaRef = useRef<HTMLTextAreaElement | null>(null);
   const [openEmoji, setOpenEmoji] = useState(false);

   useEffect(() => {
      if (textareaRef && textareaRef.current) {
         textareaRef.current.style.height = "0px";
         const scrollHeight = textareaRef.current.scrollHeight;
         textareaRef.current.style.height = scrollHeight + "px";
      }
   }, [value]);

   return (

      <div className={styles.compose}>
         {/*Left Add Picture Button*/}
         <ToolbarButton
            key="picture"
            icon={AiFillPicture}
            size={25}
         />

         <div className={styles.inputContainer}>
            <textarea
               placeholder="Type a message..."
               onChange={onChange}
               value={value}
               onKeyDown={onKeyDown}
               ref={textareaRef}
            />

            {/*Middle Emoji Button*/}

            <FaSmile
               key="smile"
               color={'#7b7b7bab'}
               size={22}
               style={{ cursor: 'pointer' }}
               onClick={() => setOpenEmoji(!openEmoji)}
            />
         </div>

         {/*Right Thumb Button*/}
         <ToolbarButton
            key="thumb"
            icon={FaThumbsUp}
            onClick={thumbOnClick}
            size={25}
         />

         {openEmoji &&
            <ClickAwayListener onClickAway={() => setOpenEmoji(false)}>
               <div>
                  <Picker
                     style={{ position: 'absolute', bottom: '65px', right: '50px' }}
                     emojiTooltip={true}
                     onSelect={onSelect}
                     showPreview={false}
                     showSkinTones={false}
                     useButton={false}
                  />

               </div>
            </ClickAwayListener>
         }

      </div >
   );
}