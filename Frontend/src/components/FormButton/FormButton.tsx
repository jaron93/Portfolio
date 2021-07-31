import React, { ButtonHTMLAttributes } from 'react'
import styles from './FormButton.module.scss'
import Loading from '../Loading/Loading';
import classNames from 'classnames';
import { IconBaseProps } from 'react-icons';


const cx = classNames;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   loading?: boolean;
   icon?: React.ComponentType<IconBaseProps>;
};

const FormButton: React.FC<ButtonProps> = ({
   children,
   icon: Icon,
   loading,
   ...rest
}) => {
   const classes = cx(styles['btn'], styles['btn-5'])

   return (
      <button className={classes} disabled={loading} {...rest}>
         <span>{loading ? <Loading /> : children}</span>
         <i>{Icon && <Icon className={styles.icon} />}</i>
      </button>
   )
}


export default FormButton;
