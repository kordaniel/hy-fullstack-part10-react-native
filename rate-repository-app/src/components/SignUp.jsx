import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useCreateUser from '../hooks/useCreateUser';
import Form from './Form';

const formFields = {
  username: {
    initialValue: '',
    placeholderText: 'Username',
  },
  password: {
    initialValue: '',
    placeholderText: 'Password',
    props: {
      secureTextEntry: true,
    },
  },
  passwordConfirmation: {
    initialValue: '',
    placeholderText: 'Password confirmation',
    props: {
      secureTextEntry: true,
    },
  },
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username length cannot exceed 30 characters')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .max(30, 'Password length cannot exceed 30 characters')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser, result] = useCreateUser();

  const onSubmit = async (values) => {
    const success = await createUser({
      username: values.username,
      password: values.password,
    });
    if (success) {
      navigate('/');
    }
  };

  return (
    <Form
      error={result.error?.message}
      loading={result.loading}
      formFields={formFields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitLabel="Sign up"
    />
  );
}

export default SignUp;
