import React, { useEffect } from 'react';

import styles from "./Login.module.scss"
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginUser, /* clearState */ } from '../../store/slices/user';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { HiUserCircle } from 'react-icons/hi'
import FormInput from '../../components/FormInput/FormInput';
import { FiLock } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';

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

            <form onSubmit={handleSubmit(onSubmit)}>
               <h1>Sign in</h1>
               <HiUserCircle className={styles.icon} />
               <label>Username</label>
               <FormInput
                  id="username"
                  name="username"
                  type="username"
                  register={register}
                  icon={FaUserAlt}
                  placeholder="example"
               />
               <br />
               <label>Password</label>
               <FormInput
                  id="password"
                  name="password"
                  type="password"
                  register={register}
                  icon={FiLock}
                  placeholder="******"
               />
               <br />
               <input type="submit" />
            </form>

         </div>

      </>
   );
};
export default Signin;