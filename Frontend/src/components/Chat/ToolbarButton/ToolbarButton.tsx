import React, { ButtonHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons';
import styles from './ToolbarButton.module.scss';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   icon?: React.ComponentType<IconBaseProps>;
   size?: number
};

const ToolbarButton: React.FC<ButtonProps> = ({
   children,
   icon: Icon,
   color,
   size,
   ...rest
}) => {
   return (
      <button {...rest}>
         <i> {Icon && <Icon className={styles.icon} size={size} color={color} />}</i>
      </button>
   )
}

export default ToolbarButton;