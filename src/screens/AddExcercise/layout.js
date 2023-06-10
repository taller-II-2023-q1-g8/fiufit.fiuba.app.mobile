import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Modal,
  Pressable,
  TextInput
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { array, func, object } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';

import { styles } from './styles';

function Item({ handleItemPress, itemData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reps, onChangeReps] = useState('');
  const [weight, onChangeWeight] = useState('');
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{itemData.title}</Text>
          <Text style={styles.profileType}>{itemData.muscles}</Text>
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeReps}
                value={reps}
                placeholder="reps"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeWeight}
                value={weight}
                placeholder="weight"
                keyboardType="numeric"
              />
              <View style={styles.item}>
                <Pressable
                  style={[styles.submitButton]}
                  onPress={() => {
                    handleItemPress(itemData.id, reps, weight);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
                <Pressable style={[styles.submitButton]} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}

function AddedItem({ handleAddedItemPress, itemData }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleAddedItemPress(itemData.id)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{itemData.title}</Text>
          <Text style={styles.profileType}>{`${itemData.muscles}`}</Text>
          <Text style={styles.profileType}>{`reps: ${itemData.reps}`}</Text>
          <Text style={styles.profileType}>{`weight: ${itemData.weight}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ItemSeparatorView() {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        opacity: 0.2,
        backgroundColor: colors.gray
      }}
    />
  );
}

export default function ChooseExercises({
  excersises,
  addedExcersises,
  handleOnTitleChange,
  handleOnMusclesChange,
  handleItemPress,
  handleAddedItemPress
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField
          onChangeText={handleOnTitleChange}
          placeholder={texts.Fields.searchExercisesTitlesPlaceholder}
        />
        <SearchField
          onChangeText={handleOnMusclesChange}
          placeholder={texts.Fields.searchExercisesMusclesPlaceholder}
        />
        <View style={styles.item}>
          <View>
            <Text style={styles.textStyle}>Ejercicios</Text>
            <FlatList
              data={excersises}
              renderItem={({ item }) => <Item handleItemPress={handleItemPress} itemData={item} />}
              ItemSeparatorComponent={ItemSeparatorView}
            />
          </View>
          <View>
            <Text style={styles.textStyle}>Agregados</Text>
            <FlatList
              data={addedExcersises}
              renderItem={({ item }) => (
                <AddedItem handleAddedItemPress={handleAddedItemPress} itemData={item} />
              )}
              ItemSeparatorComponent={ItemSeparatorView}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

Item.propTypes = {
  handleItemPress: func,
  itemData: object.isRequired
};

AddedItem.propTypes = {
  handleAddedItemPress: func,
  itemData: object.isRequired
};

ChooseExercises.propTypes = {
  excersises: array.isRequired,
  addedExcersises: array.isRequired,
  handleOnTitleChange: func,
  handleOnMusclesChange: func,
  handleItemPress: func,
  handleAddedItemPress: func
};
