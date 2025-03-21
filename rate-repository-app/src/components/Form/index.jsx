import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';

import Text from '../Text';
import theme from '../../theme';

const textInputStyle = {
  borderWidth: 1,
  borderColor: theme.colors.textSecondary,
  borderRadius: 5,
  padding: 10,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    gap: 10,
    backgroundColor: theme.colors.white,
  },
  textInput: textInputStyle,
  textInputValidationFailed: {
    ...textInputStyle,
    borderColor: theme.colors.red,
  },
  textSubmitBtn: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
});

const Form = ({
  error,
  loading,
  formFields,
  validationSchema,
  onSubmit,
  submitLabel = 'Submit'
}) => {
  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.entries(formFields).map(([field, val]) =>
        [field, val.initialValue]
      )
    ),
    validationSchema,
    onSubmit
  });

  const isValidatedFieldWithErrors = (field) =>
    validationSchema?.fields && validationSchema.fields.hasOwnProperty(field) &&
    formik.touched[field] && formik.errors[field];

  const textInputFieldStyle = (field) => !isValidatedFieldWithErrors(field)
    ? styles.textInput
    : styles.textInputValidationFailed;

  return (
    <View style={styles.container}>
      {Object.entries(formFields).map(([field, val]) => (
        <View key={field}>
          <TextInput
            style={textInputFieldStyle(field)}
            placeholderTextColor={theme.colors.textSecondary}
            placeholder={val.placeholderText}
            {...val.props}
            value={formik.values[field]}
            onChangeText={formik.handleChange(field)}
          />
          {isValidatedFieldWithErrors(field) && (
            <Text color="red">{formik.errors[field]}</Text>
          )}
        </View>
      ))}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={styles.textSubmitBtn}
          fontSize="subheading"
          fontWeight="bold"
          color="white"
          textAlign="center"
          bgColor={theme.colors.primary}
        >
          {submitLabel}
        </Text>
      </Pressable>
      {error && <Text color="red" textAlign="center">Error: {error}</Text>}
      {loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
    </View>
  );
};

export default Form;
