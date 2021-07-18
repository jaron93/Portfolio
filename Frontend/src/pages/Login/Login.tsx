import React, { useEffect } from 'react';

import styles from "./Login.module.scss"
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginUser, /* clearState */ } from '../../store/slices/user';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { HiUserCircle } from 'react-icons/hi'
import loginImg from "../../assets/login.jpg"

type ILoginFormData = {
   username: string;
   password: string;
}

const Signin: React.FC = () => {
   const dispatch = useDispatch()
   const { register, handleSubmit } = useForm()
   const history = useHistory();

   const { status, error } = useSelector(state => state.user)

   const notify = () => toast;

   const onSubmit: SubmitHandler<ILoginFormData> = data => {
      dispatch(loginUser(data));
   }


   useEffect(() => {
      if (status === "failed") {
         toast.error(error);
         notify();
      }
      if (status === "succeeded") {
         toast.success("You are successfully logged in");
         notify();
         history.push('/')
      }
   }, [status, error, history]);


   return (
      <>

         <div className={styles.container}>

            <div className={styles.overlay_container}>
               <img src={loginImg} alt="Login img" className={styles.img} />
            </div>

            <div className={styles.form_container}>

               <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Sign in</h1>
                  <HiUserCircle className={styles.icon} />
                  <label>username</label>
                  <input {...register("username")} />
                  <label>Password</label>
                  <input {...register("password")} />

                  <input type="submit" />
               </form>

            </div>



         </div>

      </>
   );
};
export default Signin;