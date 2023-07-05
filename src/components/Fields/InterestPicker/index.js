import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { array, func } from 'prop-types';

import GenericSelectField from '../GenericSelectField';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../colors';

const defaultTags = [
  { label: 'Abdominales', value: 'ABS' },
  { label: 'Espalda', value: 'BACK' },
  { label: 'Pecho', value: 'CHEST' },
  { label: 'Cardio', value: 'CARDIO' },
  { label: 'Piernas', value: 'LEGS' }
];
export default function InterestPicker({ tags, handleOnChangeTags, handleOnAddTag, handleOnDeleteTag }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <GenericSelectField
          items={defaultTags}
          name="tags"
          onChangeText={handleOnChangeTags}
          title="Intereses"
          containerStyle={styles.fieldContainer2}
        />
        <TouchableOpacity onPress={handleOnAddTag}>
          <Ionicons name="add" size={35} color={colors.white} style={{ paddingTop: 40, paddingLeft: 20 }} />
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
    </View>
  );
}
InterestPicker.propTypes = {
  handleOnChangeTags: func,
  handleOnAddTag: func,
  tags: array,
  handleOnDeleteTag: func
};
