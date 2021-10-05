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
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import emoji from 'emoji-mart/dist-es/components/emoji/emoji';
import { Backdrop } from '@mui/material';

export default function Compose(
   { onChange,
      value,
      onKeyDown,
      onSelect,
      thumbOnClick
   }: any) {

   const textareaRef = useRef<HTMLTextAreaElement | null>(null);
   const targetRef = useRef<HTMLDivElement>(null)
   const [openEmoji, setOpenEmoji] = useState(false);

   useEffect(() => {
      if (textareaRef && textareaRef.current) {
         textareaRef.current.style.height = "0px";
         const scrollHeight = textareaRef.current.scrollHeight;
         textareaRef.current.style.height = scrollHeight + "px";
      }
   }, [value]);

   useOnClickOutside(targetRef, () => setOpenEmoji(false));

   return (

      <div className={styles.compose}>
         {/*Left Add Picture Button*/}
         <ToolbarButton
            key="picture"
            icon={AiFillPicture}
            style={{ fontSize: '25' }}
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
            <ToolbarButton
               key="smile"
               icon={FaSmile}
               color={'#7b7b7bab'}
               style={{ fontSize: '22' }}
               onClick={() => setOpenEmoji(true)}
            />
         </div>


         {/*Right Thumb Button*/}
         <ToolbarButton
            key="thumb"
            icon={FaThumbsUp}
            onClick={thumbOnClick}
            style={{ fontSize: '25' }}
         />


         <Backdrop open={openEmoji} invisible={true}>
            < div ref={targetRef}>
               <Picker
                  style={{ position: 'absolute', bottom: '65px', right: '50px' }}
                  emojiTooltip={true}
                  onSelect={onSelect}
                  showPreview={false}
                  showSkinTones={false}
                  useButton={true}
               />
            </div>
         </Backdrop>

      </div >
   );
}