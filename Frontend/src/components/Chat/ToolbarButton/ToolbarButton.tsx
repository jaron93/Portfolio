import React, { ButtonHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons';
import styles from './ToolbarButton.module.scss';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   icon?: React.ComponentType<IconBaseProps>;
};

const ToolbarButton: React.FC<ButtonProps> = ({
   children,
   icon: Icon,
   color,
   style,
   ...rest
}) => {
   return (
      <button {...rest}>
         <i> {Icon && <Icon className={styles.icon} style={style} color={color} />}</i>
      </button>
   )
}

export default ToolbarButton;
