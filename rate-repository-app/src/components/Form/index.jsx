import { ActivityIndicator, TextInput, View } from 'react-native';
import { useFormik } from 'formik';

import Button from '../Button';
import Text from '../Text';
import globalStyles from '../../globalStyles';
import theme from '../../theme';

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

  const textInputFieldStyle = (field) => [
    globalStyles.textInput,
    isValidatedFieldWithErrors(field) && globalStyles.textInputValidationFailed,
  ];

  return (
    <View style={globalStyles.container}>
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
      <Button onPress={formik.handleSubmit}>{submitLabel}</Button>
      {error && <Text color="red" textAlign="center">Error: {error}</Text>}
      {loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
    </View>
  );
};

export default Form;
