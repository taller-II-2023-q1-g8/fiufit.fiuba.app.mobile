import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { string, bool, func, array } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { scrollviewStyle, styles } from './styles';

export default function EditTrainerProfile({ fields, handlePickImage, handleSubmitPress, image, loading }) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
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
    </ImageBackground>
  );
}

EditTrainerProfile.propTypes = {
  fields: array.isRequired,
  handlePickImage: func.isRequired,
  handleSubmitPress: func.isRequired,
  image: string,
  loading: bool.isRequired
};
