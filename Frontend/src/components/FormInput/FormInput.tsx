import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './FormInput.module.scss'
import classNames from 'classnames';


import { IconBaseProps } from 'react-icons';

type InputProps = {
   id: string,
   register: any,
   type: string,
   name: string,
   placeholder: string,
   icon?: React.ComponentType<IconBaseProps>;
}

let cn = classNames;

const FormInput: React.FC<InputProps> = ({ register, name, icon: Icon, ...inputProps }) => {


   const inputRef = useRef<HTMLInputElement>(null);
   const [isFocused, setIsFocused] = useState(false);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
   }, []);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);

   }, []);

   const handleContainerFocus = useCallback(() => {
      inputRef.current?.focus();
   }, []);

   return (
      <div className={cn(styles.container, isFocused && styles['isFocused'])}
         onClick={handleContainerFocus}
      >

         {Icon && <Icon size={20} color="white" />}
         <input
            {...register(name)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            {...inputProps}
         />
      </div>
   )
}

export default FormInput
