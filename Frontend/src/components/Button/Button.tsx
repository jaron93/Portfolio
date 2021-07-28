import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import Loading from '../Loading/Loading';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   loading?: boolean;
   color: 'red' | 'green';
};

const Button: React.FC<ButtonProps> = ({
   children,
   color,
   loading,
   ...rest
}) => (
   <button className={color} disabled={loading} {...rest}>
      {loading ? <Loading /> : children}
   </button>
);

export default Button;
