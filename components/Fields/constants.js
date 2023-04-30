import { colors } from '../../colors';

import styles from './styles';

export const emailFieldType = 'email-address';
export const passwordFieldType = 'default';
export const phoneFieldType = 'phone-pad';
export const textFieldType = 'text';

export const EMAIL_KEY = 'email';
export const PASSWORD_KEY = 'password';

export const commonFieldProps = (error) => ({
  placeholderTextColor: colors.placeholder,
  returnKeyType: 'next',
  style: { ...styles.fieldInputContainer, ...(error && styles.error) },
  underlineColorAndroid: 'transparent'
});
