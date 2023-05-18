import { func, string } from 'prop-types';
import { TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { commonFieldProps, passwordFieldType, textFieldType } from '../constants';
import EyeCloseIcon from '../../../assets/icons/eye_close.png';
import EyeOpenIcon from '../../../assets/icons/eye_open.png';
import styles from '../styles';

function TextField({
  defaultValue = '',
  error,
  keyboardType = textFieldType,
  name,
  onChangeText,
  placeholder,
  title
}) {
  const [hidePassword, setHidePassword] = useState(keyboardType === passwordFieldType);
  const handlePasswordVisibility = () => setHidePassword(!hidePassword);

  return (
    <View style={styles.fieldContainer}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorTitle) }}>{title}</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          autoCapitalize="none"
          id={name}
          name={name}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          secureTextEntry={hidePassword}
          onChangeText={(value) => onChangeText(name, value)}
          placeholder={placeholder}
          {...commonFieldProps(error)}
        />
        {keyboardType === passwordFieldType && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.hidePasswordContainer}
            onPress={handlePasswordVisibility}
          >
            <Image style={styles.hidePasswordIcon} source={hidePassword ? EyeCloseIcon : EyeOpenIcon} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorDescription}>{error}</Text>}
    </View>
  );
}

TextField.propTypes = {
  defaultValue: string,
  error: string.isRequired,
  keyboardType: string.isRequired,
  onChangeText: func.isRequired,
  placeholder: string.isRequired,
  title: string.isRequired,
  name: string
};

export default TextField;
