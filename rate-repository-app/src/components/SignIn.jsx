import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    gap: 10,
    backgroundColor: theme.colors.white,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
  textSubmitBtn: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
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

const SignIn = () => {
  const [signIn, result] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log('SignIn:', data); // === result.data
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const textInputUsernameValidationErr = formik.touched.username && formik.errors.username;
  const textInputPasswordValidationErr = formik.touched.password && formik.errors.password;
  const textInputUsernameStyle = !textInputUsernameValidationErr
    ? styles.textInput
    : { ...styles.textInput, borderColor: theme.colors.red };
  const textInputPasswordStyle = !textInputPasswordValidationErr
    ? styles.textInput
    : { ...styles.textInput, borderColor: theme.colors.red };

  if (result.loading) {
    return (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={textInputUsernameStyle}
        placeholder='Username'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {textInputUsernameValidationErr && (
        <Text color="red">{formik.errors.username}</Text>
      )}
      <TextInput
        style={textInputPasswordStyle}
        placeholder='Password'
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {textInputPasswordValidationErr && (
        <Text color="red">{formik.errors.password}</Text>
      )}
      {result.error && (
        <Text color="red">{result.error.message}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={styles.textSubmitBtn}
          fontSize="subheading"
          color="white"
          textAlign="center"
          bgColor={theme.colors.primary}
        >
          Sign In
        </Text>
      </Pressable>
      {result.called && result.data?.authenticate?.accessToken && (
        <Text>Logged in with token: {result.data.authenticate.accessToken}</Text>
      )}
    </View>
  );
};

export default SignIn;
