import { StyleSheet } from 'react-native';

import theme from './theme';

const globalStyles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    gap: 10,
    backgroundColor: theme.colors.white,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    padding: 10,
  },
  picker: {
    margin: 5,
    backgroundColor: theme.colors.appBarTabBackground,
  },
  textInput: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
  textInputValidationFailed: {
    borderColor: theme.colors.red,
  },
});

export default globalStyles;
