import React, { useEffect } from 'react';

import styles from "./Signup.module.scss"
import { useForm, SubmitHandler } from 'react-hook-form';
import { signupUser, clearState } from '../../store/slices/user';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button'

import { HiOutlineMail } from 'react-icons/hi'
import { FiLock } from 'react-icons/fi';
import { FaUserAlt, FaFileSignature } from 'react-icons/fa';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface ISignupFormData {
   username: string;
   email: string;
   password: string;
}

const Signup: React.FC = () => {

   const validationSchema = Yup.object().shape({
      username: Yup.string()
         .required('Username is required'),
      email: Yup.string()
         .required('E-mail is required'),
      password: Yup.string()
         .required('Password is required'),
   });
   const formOptions = { resolver: yupResolver(validationSchema) };

   const dispatch = useDispatch()
   const { register, handleSubmit, formState: { errors } } = useForm(formOptions)
   const history = useHistory();

   const { status, error } = useSelector(state => state.user)

   const { addToast } = useToasts();

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

            <FaFileSignature size={80} style={{ fill: 'white', margin: "0 auto" }} />

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
               <Button color="green">Create an account</Button>
            </form>
         </div>

      </>
   );
};
export default Signup;