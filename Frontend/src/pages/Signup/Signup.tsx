import React, { useEffect } from 'react';

import styles from "./Signup.module.scss"
import { useForm, SubmitHandler } from 'react-hook-form';
import { signupUser, clearState } from '../../store/slices/user';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


type ISignUpFormData = {
   username: string;
   email: string;
   password: string;
}

const Signup: React.FC = () => {
   const dispatch = useDispatch()
   const { register, handleSubmit } = useForm()
   const history = useHistory();

   const isSuccess = useSelector(state => state.user)
   const isError = useSelector(state => state.user)
   const isFailed = useSelector(state => state.user)

   const onSubmit: SubmitHandler<ISignUpFormData> = data => {
      dispatch(signupUser(data));
   }

   /* 
      useEffect(() => {
         if (isSuccess) {
            dispatch(clearState());
            history.push('/');
         }
         if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
         }
      }, [isSuccess, isError, dispatch, history, errorMessage]); */


   return (
      <>

         <div className={styles.container}>
            <header>
               <h1>
                  Sign Up
               </h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
               <label>Username</label>
               <input {...register("username")} />
               <label>E-mail</label>
               <input {...register("email")} />
               <label>Password</label>
               <input {...register("password")} />

               <input type="submit" />
            </form>
         </div>

      </>
   );
};
export default Signup;