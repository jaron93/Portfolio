import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearState } from '../../store/slices/user';

import FormButton from '../../components/FormButton/FormButton'
import FormInput from '../../components/FormInput/FormInput';

import { useToasts } from 'react-toast-notifications';

import styles from "./Signup.module.scss"

import { FaUserAlt, FaFileSignature } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi'
import { SiGnuprivacyguard } from 'react-icons/si'

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ISignupFormData {
   username: string;
   email: string;
   password: string;
}

const Signup: React.FC = () => {

   const validationSchema = Yup.object().shape({
      username: Yup
         .string()
         .label('Username')
         .required()
         .min(6)
         .max(30)
         .matches(/^[a-zA-Z0-9]*$/, "Only alphabets and numbers are allowed for this field"),
      email: Yup
         .string()
         .label('E-mail')
         .required()
         .email(),
      password: Yup
         .string()
         .label('Password')
         .required()
         .min(6)
         .max(30),
      confirmPassword: Yup
         .string()
         .required()
         .label('Confirm Password')
         .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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

   const onSubmit: SubmitHandler<ISignupFormData> = data => {
      dispatch(signupUser(data));
   }

   useEffect(() => {
      if (status === "failed") {
         addToast(error, { appearance: 'error', autoDismiss: true });
         dispatch(clearState())
      }
      if (status === "succeeded") {
         addToast('Account Created Successfully!', { appearance: 'success', autoDismiss: true });
         history.push('/signin')
         dispatch(clearState())
      }
   }, [status, error, history, dispatch, addToast]);

   return (
      <>
         <div className={styles.container}>

            <header>
               <h1>Create Account</h1>
            </header>

            <FaFileSignature size={60} style={{ fill: 'white', margin: "0 auto" }} />

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

               <label>Username</label>
               <FormInput
                  name="username"
                  type="username"
                  register={register}
                  icon={FaUserAlt}
                  placeholder="example"
                  errors={errors?.username?.message}
               />
               <label>E-mail</label>
               <FormInput
                  name="email"
                  type="email"
                  register={register}
                  icon={HiOutlineMail}
                  placeholder="example@gmail.com"
                  errors={errors?.email?.message}
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
               <label>Confirm Password</label>
               <FormInput
                  name="confirmPassword"
                  type="password"
                  register={register}
                  icon={FiLock}
                  placeholder="******"
                  errors={errors?.confirmPassword?.message}

               />
               <FormButton
                  icon={SiGnuprivacyguard}
                  loading={status === "loading" ? true : false}
               >Create an account</FormButton>
            </form>

            <div className={styles.footer}>
               <span>Already have an account? </span><Link to="/signin" className={styles.link}>Sign in</Link>
            </div>

         </div>

      </>
   );
};
export default Signup;