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
import GenericSelectField from '../../components/Fields/GenericSelectField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../colors';

const defaultTags = [
  { label: 'Abdominales', value: 'ABS' },
  { label: 'Espalda', value: 'BACK' },
  { label: 'Pecho', value: 'CHEST' },
  { label: 'Cardio', value: 'CARDIO' },
  { label: 'Piernas', value: 'LEGS' }
];

export default function EditUserProfile({
  fields,
  handlePickImage,
  handleSubmitPress,
  image,
  loading,
  handleOnChangeTags,
  handleOnAddTag,
  tags,
  handleOnDeleteTag
}) {
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
            <View style={{ flexDirection: 'row' }}>
              <GenericSelectField
                items={defaultTags}
                name="tags"
                onChangeText={handleOnChangeTags}
                title="Tags"
                containerStyle={styles.fieldContainer}
              />
              <TouchableOpacity onPress={handleOnAddTag}>
                <Ionicons
                  name="add"
                  size={35}
                  color={colors.white}
                  style={{ paddingTop: 40, paddingLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
            {tags.map((tag) => (
              <View style={styles.item}>
                <Text style={{ color: colors.white, fontSize: 15, paddingTop: 5 }}>{tag}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => handleOnDeleteTag(tag)}
                  style={{ marginRight: 10, marginBotton: 10 }}
                >
                  <Ionicons
                    name="trash"
                    style={{ width: 30, height: 30, tintColor: colors.white }}
                    size={25}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
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

EditUserProfile.propTypes = {
  fields: array.isRequired,
  handlePickImage: func.isRequired,
  handleSubmitPress: func.isRequired,
  image: string,
  loading: bool.isRequired,
  handleOnChangeTags: func,
  handleOnAddTag: func,
  tags: array,
  handleOnDeleteTag: func
};
