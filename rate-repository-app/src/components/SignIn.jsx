import { ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
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
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(4, 'Username must be at least 4 characters long')
    .max(16, 'Username length cannot exceed 16 characters')
    .required('Username is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(16, 'Password length cannot exceed 16 characters')
    .required('Password is required'),
});

export const SignInContainer = ({ error, onSubmit }) => {
  // NOTE: The form has been refactored into it's own component as of exercise 10.21,
  //       which makes this container unnecessary. It's left here only cause of the
  //       earlier exercise where we made a test for this sign-in container. It would be
  //       smarter to test the Form component directly and delete this intermediate container.
  return (
    <Form
      error={error?.message}
      loading={null}
      formFields={formFields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitLabel='Sign In'
    />
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, result] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      if (data?.authenticate?.accessToken) {
        // TODO: Handle else?
        navigate('/');
      }
    } catch (error) {
      console.error('SignIn error:', error);
    }
  };

  if (result.loading) {
    return (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    );
  }

  return (
    <SignInContainer error={result.error} onSubmit={onSubmit} />
  );
};

export default SignIn;
