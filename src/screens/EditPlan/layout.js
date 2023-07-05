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

export default function CreatePlan({
  fields,
  handleSubmitPress,
  loading,
  planPicUrl,
  handlePickImage,
  handleOnChangeTags,
  handleOnAddTag,
  tags,
  handleOnDeleteTag
}) {
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
  handlePickImage: func,
  handleOnChangeTags: func,
  handleOnAddTag: func,
  tags: array,
  handleOnDeleteTag: func
};
