import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Sign in:', values);
    },
  });

  const textInputUsernameValidationErr = formik.touched.username && formik.errors.username;
  const textInputPasswordValidationErr = formik.touched.password && formik.errors.password;
  const textInputUsernameStyle = !textInputUsernameValidationErr
    ? styles.textInput
    : { ...styles.textInput, borderColor: theme.colors.red };
  const textInputPasswordStyle = !textInputPasswordValidationErr
    ? styles.textInput
    : { ...styles.textInput, borderColor: theme.colors.red };

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
    </View>
  );
};

export default SignIn;
