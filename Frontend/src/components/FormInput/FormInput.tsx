import React, { useCallback, useRef, useState } from 'react'
import styles from './FormInput.module.scss'
import classNames from 'classnames';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';


type InputProps = {
   register: any,
   type: string,
   name: string,
   placeholder: string,
   errors: object,
   icon?: React.ComponentType<IconBaseProps>;
}

let cn = classNames;

const FormInput: React.FC<InputProps> = ({ register, name, errors, icon: Icon, ...inputProps }) => {

   const inputRef = useRef<HTMLInputElement>(null);
   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
   }, []);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      setIsFilled(!!inputRef.current?.value);

   }, []);

   const handleContainerFocus = useCallback(() => {
      inputRef.current?.focus();
   }, []);

   return (
      <div className={cn(
         styles.container,
         isFocused && styles['isFocused'],
         isFilled && styles['isFilled'],
         errors && styles['isErrors']
      )}
         onClick={handleContainerFocus}
      >

         {Icon && <Icon size={20} color="white" />}
         <input
            {...register(name)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            {...inputProps}
            aria-invalid={errors ? true : false}
         />
         {errors && (
            <div className={styles.tooltip}>
               <span>{errors}</span>
               <FiAlertCircle
                  color="#c53030"
                  size={20}
                  style={{ cursor: 'help' }}
               />

            </div>

         )}
      </div>


   )
}

export default FormInput
