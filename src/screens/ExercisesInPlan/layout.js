import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TextInput,
  ImageBackground,
  Image
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Picker } from '@react-native-picker/picker';
import { array, bool, func, number, object, string } from 'prop-types';

import { colors } from '../../colors';
import GenericSelectField from '../../components/Fields/GenericSelectField';
import BackgroundImage from '../../assets/Background.jpg';
import manPic from '../../assets/man.jpeg';
import { removeExerciseFromPlan } from '../../requests';

import { a, styles } from './styles';

function Header({ handleClearExercises, setSwipedRow }) {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTitle}>Ejercicios</Text>
      <TouchableOpacity onPress={handleClearExercises} style={styles.headerButton}>
        <Ionicons name="trash" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

function ListItems({
  addedExercises,
  setAddedExercises,
  handleTriggerEdit,
  swipedRow,
  setSwipedRow,
  handleRemoveExercise
}) {
  const handleDeleteExercise = (rowMap, rowKey) => {
    const newAddedExercises = [...addedExercises];
    const prevIndex = addedExercises.findIndex((ex) => ex.key === rowKey);
    console.log(newAddedExercises[prevIndex]);
    const removedExercise = newAddedExercises[prevIndex];
    newAddedExercises.splice(prevIndex, 1);
    // Delete here
    handleRemoveExercise(removedExercise);
    setAddedExercises(newAddedExercises);
    setSwipedRow(null);
  };

  const renderItem = (data) => {
    const RowTextStyle = data.item.key === swipedRow ? styles.SwipedExerciseText : styles.ExerciseText;
    // Conseguir foto del ejercicio y ponerla?
    return (
      <View style={styles.ListView}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.profilePic} source={manPic} />
          <View style={{ marginLeft: 10 }}>
            <Text style={RowTextStyle}>{data.item.exercise.title}</Text>
            <Text style={styles.wR}>({data.item.exercise.muscles})</Text>
            <Text style={styles.wR}>
              Reps: {data.item.reps}, Peso: {data.item.weight}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.ListViewHidden}>
      <TouchableOpacity
        style={styles.HiddenButton}
        onPress={() => handleDeleteExercise(rowMap, data.item.key)}
      >
        <Ionicons name="trash" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  const emptyExercises = () => (
    <View style={styles.EmptyView}>
      <Text style={styles.ExerciseText}>El plan no tiene ejercicios</Text>
    </View>
  );

  return (
    <>
      {addedExercises.length === 0 && emptyExercises()}
      {addedExercises.length !== 0 && (
        <SwipeListView
          data={addedExercises}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          // onRowDidOpen={onRowDidOpen}
          leftOpenValue={80}
          previewOpenValue={80}
          previewOpenDelay={3000}
          disableLeftSwipe
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingBottom: 30, marginBottom: 40 }}
          // Handling swiped todo row
          onRowOpen={(rowKey) => {
            console.log(rowKey);
            setSwipedRow(rowKey);
          }}
          onRowClose={() => {
            setSwipedRow(null);
          }}
        />
      )}
    </>
  );
}

function InputModal({
  addedExercises,
  modalVisible,
  setModalVisible,
  exerciseSelected,
  setExerciseSelected,
  handleAddExercise,
  exerciseToBeEdited,
  setExerciseToBeEdited,
  handleEditExercise,
  repsInputValue,
  setRepsInputValue,
  weightInputValue,
  setWeightInputValue,
  exercises,
  handleOnExerciseChange
}) {
  console.log(exerciseSelected);
  const handleSubmit = () => {
    if (!exerciseToBeEdited) {
      if (exerciseSelected === '' || weightInputValue === '' || repsInputValue === '') {
        alert('Input field must not be empty.');
        return;
      }
      handleAddExercise({
        exercise: exerciseSelected,
        reps: repsInputValue,
        weight: weightInputValue,
        key: `${
          (addedExercises[addedExercises.length - 1] && +addedExercises[addedExercises.length - 1].key + 1) ||
          1
        }`
      });
    } else {
      if (exerciseSelected === '' || weightInputValue === '' || repsInputValue === '') {
        alert('Input field must not be empty.');
        return;
      }
      handleEditExercise({
        exercise: exerciseSelected,
        reps: repsInputValue,
        weight: weightInputValue,
        key: exerciseToBeEdited.key
      });
    }
    setWeightInputValue('');
    setRepsInputValue('');
  };

  const handleCloseModal = () => {
    setWeightInputValue('');
    setRepsInputValue('');
    setModalVisible(false);
    setExerciseToBeEdited(null);
  };
  return (
    <>
      <TouchableOpacity style={styles.ModalButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color={colors.white} />
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.ModalContainer}>
          <View style={styles.ModalView}>
            <View style={styles.ModalIcon}>
              <Text style={styles.headerTitle}>Ejercicio</Text>
              <Ionicons name="barbell" size={30} color={colors.white} />
            </View>
            {exercises.length > 0 ? (
              <>
                <View style={styles.StyledPicker}>
                  <Text style={{ fontWeight: 'bold', paddingTop: 18, color: colors.white }}>Ejercicio</Text>
                  <Picker
                    dropdownIconColor={colors.white}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                      setExerciseSelected(itemValue);
                    }}
                    selectedValue={exerciseSelected}
                    style={styles.fieldInputContainer}
                    mode="dropdown"
                  >
                    {exercises.map((exercise) => (
                      <Picker.Item label={exercise.title} value={exercise} />
                    ))}
                  </Picker>
                </View>
                <Text style={{ color: colors.white }}> Musculos: {exerciseSelected?.muscles}</Text>
              </>
            ) : null}
            <TextInput
              style={styles.StyledInput}
              placeholder="Cantidad de repeticiones"
              placeholderTextColor={colors.placeholder}
              onChangeText={(val) => setRepsInputValue(val)}
              value={repsInputValue}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.StyledInput}
              placeholder="Peso en kilos"
              placeholderTextColor={colors.placeholder}
              onChangeText={(val) => setWeightInputValue(val)}
              value={weightInputValue}
              keyboardType="phone-pad"
            />

            <View style={styles.ModalActionGroup}>
              <TouchableOpacity
                onPress={handleCloseModal}
                color={a.primary}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: colors.error
                }}
              >
                <Ionicons name="close" size={28} color={a.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: colors.main_soft
                }}
              >
                <Ionicons name="checkmark" size={28} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
export default function ExercisesInPlan({
  handleClearExercises,
  addedExercises,
  setAddedExercises,
  handleTriggerEdit,
  modalVisible,
  setModalVisible,
  exerciseSelected,
  setExerciseSelected,
  handleAddExercise,
  exerciseToBeEdited,
  setExerciseToBeEdited,
  handleEditExercise,
  swipedRow,
  setSwipedRow,
  repsInputValue,
  setRepsInputValue,
  weightInputValue,
  setWeightInputValue,
  exercises,
  handleOnExerciseChange,
  handleRemoveExercise
}) {
  return (
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <Header handleClearExercises={handleClearExercises} />
        <ListItems
          addedExercises={addedExercises}
          setAddedExercises={setAddedExercises}
          handleTriggerEdit={handleTriggerEdit}
          swipedRow={swipedRow}
          handleRemoveExercise={handleRemoveExercise}
          setSwipedRow={setSwipedRow}
        />
        <InputModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          exerciseSelected={exerciseSelected}
          setExerciseSelected={setExerciseSelected}
          handleAddExercise={handleAddExercise}
          exerciseToBeEdited={exerciseToBeEdited}
          setExerciseToBeEdited={setExerciseToBeEdited}
          handleEditExercise={handleEditExercise}
          addedExercises={addedExercises}
          repsInputValue={repsInputValue}
          weightInputValue={weightInputValue}
          setRepsInputValue={setRepsInputValue}
          setWeightInputValue={setWeightInputValue}
          exercises={exercises}
          handleOnExerciseChange={handleOnExerciseChange}
        />
      </View>
    </ImageBackground>
  );
}

ExercisesInPlan.propTypes = {
  handleClearExercises: func,
  addedExercises: array,
  setAddedExercises: func,
  handleTriggerEdit: func,
  modalVisible: bool,
  setModalVisible: func,
  exerciseSelected: object,
  setExerciseSelected: func,
  handleAddExercise: func,
  exerciseToBeEdited: object,
  setExerciseToBeEdited: func,
  handleEditExercise: func,
  swipedRow: number,
  setSwipedRow: func,
  repsInputValue: string,
  setRepsInputValue: func,
  weightInputValue: string,
  setWeightInputValue: func,
  exercises: array,
  handleOnExerciseChange: func,
  handleRemoveExercise: func
};

ListItems.propTypes = {
  addedExercises: array,
  setAddedExercises: func,
  handleTriggerEdit: func,
  swipedRow: number,
  setSwipedRow: func,
  handleRemoveExercise: func
};
Header.propTypes = {
  handleClearExercises: func,
  setSwipedRow: func
};

InputModal.propTypes = {
  addedExercises: array,
  modalVisible: bool,
  setModalVisible: func,
  exerciseSelected: object,
  setExerciseSelected: func,
  handleAddExercise: func,
  exerciseToBeEdited: object,
  setExerciseToBeEdited: func,
  handleEditExercise: func,
  repsInputValue: string,
  setRepsInputValue: func,
  weightInputValue: string,
  setWeightInputValue: func,
  exercises: array,
  handleOnExerciseChange: func
};
