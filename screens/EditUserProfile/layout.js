import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PropTypes, { string, bool, func, array } from 'prop-types';

import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { scrollviewStyle, styles } from './styles';

export default function EditUserProfile({ handlePickImage, image, handleSubmitPress, fields, loading }) {
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <TouchableOpacity style={styles.profilePicOpacity} activeOpacity={0.5} onPress={handlePickImage}>
            {image !== null ? (
              <Image source={{ uri: image }} style={styles.profilePicture} />
            ) : (
              <Image source={defaultProfPic} style={styles.profilePicture} />
            )}
            <View style={styles.overlayContainer}>
              <Text style={styles.overlayText}>Subir Foto</Text>
            </View>
          </TouchableOpacity>
          {fields.map((field) => (
            <View>{field}</View>
          ))}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>Actualizar!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

EditUserProfile.propTypes = {
  handlePickImage: func.isRequired,
  image: string,
  handleSubmitPress: func.isRequired,
  fields: array.isRequired,
  loading: bool.isRequired
};
