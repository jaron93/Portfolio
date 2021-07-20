import React, { useEffect } from 'react';

import styles from "./Signin.module.scss"
import { useForm, SubmitHandler } from 'react-hook-form';
import { signinUser, clearState } from '../../store/slices/user';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../components/FormInput/FormInput';

import { HiUserCircle } from 'react-icons/hi'
import { FiLock } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface ISigninFormData {
   username: string;
   password: string;
}

const Signin: React.FC = () => {

   const validationSchema = Yup.object().shape({
      username: Yup.string()
         .required('Username is required'),
      password: Yup.string()
         .required('Password is required'),
   });
   const formOptions = { resolver: yupResolver(validationSchema) };

   const dispatch = useDispatch()
   const { register, handleSubmit, formState: { errors } } = useForm(formOptions)
   const history = useHistory();

   const { status, error } = useSelector(state => state.user)

   const notify = () => toast;

   const onSubmit: SubmitHandler<ISigninFormData> = data => {
      dispatch(signinUser(data));
   }


   useEffect(() => {
      if (status === "failed") {
         toast.error(error);
         notify();
         dispatch(clearState())
      }
      if (status === "succeeded") {
         toast.success("You are successfully logged in");
         notify();
         history.push('/')
      }
   }, [status, error, history, dispatch]);


   return (
      <>
         <div className={styles.container}>

            <header>
               <h1>Sign in</h1>
            </header>

            <HiUserCircle size={80} style={{ fill: 'white', margin: "0 auto" }} />

            <form onSubmit={handleSubmit(onSubmit)}>
               <label>Username</label>
               <FormInput
                  name="username"
                  type="username"
                  register={register}
                  icon={FaUserAlt}
                  placeholder="example"
                  errors={errors?.username?.message}
               />
               <label>Password</label>
               <FormInput
                  name="password"
                  type="password"
                  register={register}
                  icon={FiLock}
                  placeholder="******"
                  errors={errors?.password?.message}
               />
               <input type="submit" />
            </form>
         </div>

      </>
   );
};
export default Signin;