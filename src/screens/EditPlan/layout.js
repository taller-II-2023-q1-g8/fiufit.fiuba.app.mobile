import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import { array, bool, func, string } from 'prop-types';

import texts from '../../texts';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';
import manPic from '../../assets/man.jpeg';

import { scrollviewStyle, styles } from './styles';

export default function CreatePlan({ fields, handleSubmitPress, loading, planPicUrl, handlePickImage }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <ImageBackground source={BackgroundImage} resizeMode="cover">
          <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
              <KeyboardAvoidingView style={styles.formContainer} enabled>
                <TouchableOpacity style={styles.planPicOpacity} activeOpacity={0.5} onPress={handlePickImage}>
                  {planPicUrl !== null ? (
                    <Image source={{ uri: planPicUrl }} style={styles.planPicture} />
                  ) : (
                    <Image source={manPic} style={styles.planPicture} />
                  )}
                  <View style={styles.overlayContainer}>
                    <Text style={styles.overlayText}>Subir Foto</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.title}>{texts.CreatePlan.title}</Text>
                {fields.map((field) => (
                  <View>{field}</View>
                ))}
                <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
                  <Text style={styles.submitButtonText}>{texts.PersonalPlans.submitButtonText}</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </ImageBackground>
      )}
    </>
  );
}

CreatePlan.propTypes = {
  fields: array,
  handleSubmitPress: func,
  loading: bool,
  planPicUrl: string,
  handlePickImage: func
};
