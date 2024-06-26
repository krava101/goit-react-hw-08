import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useId } from "react";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import css from './RegistrationForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPass: '',
}

const ValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('This is required!'),
  email: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('This is required!'),
  password: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('This is required!'),
  confirmPass: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match!').required('This is required!'),
});

export default function RegistrationForm() {

  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const pasId = useId();
  const confirmPassId = useId();

  const handleSubmit = (state, actions) => {
    const values = {
      name: state.name,
      email: state.email,
      password: state.password,
    }
    dispatch(register(values))
    actions.resetForm();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ValidationSchema}>
      <Form className={css.form}>
        <p>Registration</p>
        <Field type="text" name="name" id={nameId} placeholder='Nickname'/>
        <span className={css.error}><ErrorMessage name="name" as="span" /></span>
        <Field type="email" name="email" id={emailId} placeholder='Email'/>
        <span className={css.error}><ErrorMessage name="email" as="span" /></span>
        <Field type="password" name="password" id={pasId} placeholder='Password'/>
        <span className={css.error}><ErrorMessage name="password" as="span" /></span>
        <Field type="password" name="confirmPass" id={confirmPassId} placeholder='Confirm password'/>
        <span className={css.error}><ErrorMessage name="confirmPass" as="span" /></span>
        <button type="submit">Sign up</button>
        <p className={css.toLog}>Do you already have an account? 
        <Link to='/login'>Log in!</Link>
        </p>
      </Form>
    </Formik>
  )
}