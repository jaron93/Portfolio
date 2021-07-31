import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser, clearState } from '../../store/slices/user';

import FormButton from '../../components/FormButton/FormButton';
import FormInput from '../../components/FormInput/FormInput';

import { useToasts } from 'react-toast-notifications';

import styles from "./Signin.module.scss"

import { FaUserAlt } from 'react-icons/fa';
import { FiLock, FiLogIn } from 'react-icons/fi';
import { HiUserCircle } from 'react-icons/hi'
import { TiWarning } from 'react-icons/ti';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

   const dispatch = useDispatch()
   const history = useHistory();
   const { addToast } = useToasts();

   const { register, handleSubmit, formState: { errors } } = useForm({
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: yupResolver(validationSchema),
      criteriaMode: "firstError",
      shouldFocusError: true
   })

   const { status, error } = useSelector(state => state.user)

   const onSubmit: SubmitHandler<ISigninFormData> = data => {
      dispatch(signinUser(data));
   }

   useEffect(() => {
      if (status === "failed") {
         addToast(error, { appearance: 'error', autoDismiss: true });
         dispatch(clearState())
      }
      if (status === "succeeded") {
         addToast("You're logged in", { appearance: 'success', autoDismiss: true });
         history.push('/')
      }
   }, [status, error, history, dispatch, addToast]);

   return (
      <>
         <div className={styles.main}>

            <div className={styles.container}>

               <header>
                  <h1>Sign in</h1>
               </header>

               <HiUserCircle size={85} style={{ fill: 'white', margin: "0 auto" }} />

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
                  <FormButton
                     icon={FiLogIn}
                     loading={status === "loading" ? true : false}
                  >
                     Login
                  </FormButton>

               </form>

               <div className={styles.footer}>
                  <span>Not a member? </span><Link to="/signup" className={styles.link}>Signup now</Link>
               </div>

            </div>

            <div className={styles.recovery}>
               <TiWarning size={30} style={{ fill: 'orange', margin: "0 auto" }} />
               <span>Password recovery via e-mail has been temporarly disabled.</span>
            </div>

         </div>
      </>
   );
};
export default Signin;