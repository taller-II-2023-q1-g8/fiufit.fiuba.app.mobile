import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import {
  AddExcerciseToPlanRequest,
  fetchExercises,
  fetchPlanExercises,
  removeExerciseFromPlan
} from '../../requests';

import ExercisesInPlan from './layout';

export default function ExercisesInPlanScreen({ navigation, route }) {
  const { plan } = route.params;
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [addedExcersises, setAddedExcersises] = useState([]);
  const [swipedRow, setSwipedRow] = useState(null);
  // Modal visibility & input value
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseSelected, setExerciseSelected] = useState();
  const [repsInputValue, setRepsInputValue] = useState();
  const [weightInputValue, setWeightInputValue] = useState();
  async function fetchData() {
    const validExercises = [];
    await fetchExercises('')
      .then((response) => response.json())
      .then((fetchedExercises) => {
        fetchedExercises.forEach((fetchedEx, idx) => {
          validExercises.push({
            id: fetchedEx.id,
            title: fetchedEx.title,
            muscles: fetchedEx.muscles
          });
        });
        setExercises(validExercises);
      });
    const exercisesFromPlan = [];
    fetchPlanExercises(plan.id)
      .then((response) => response.json())
      .then((fetchedExercises) => {
        fetchedExercises.forEach((fetchedEx, idx) => {
          // eslint-disable-next-line camelcase
          const { reps, weight, created_at, updated_at, ...newEx } = fetchedEx;
          const aux = validExercises.find((x) => x.id === newEx.id);
          exercisesFromPlan.push({
            exercise: aux,
            reps: fetchedEx.reps,
            weight: fetchedEx.weight,
            key: idx + 1
          });
        });
        setAddedExcersises(exercisesFromPlan);
        setExerciseSelected(validExercises[0]);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  const handleRemoveExercise = (exercise) => {
    removeExerciseFromPlan(plan.id, exercise.exercise.id);
  };
  const handleClearExercises = () => {
    // Borrar ejercicios del plan.
    addedExcersises.forEach((addedEx) => {
      handleRemoveExercise(addedEx);
    });
    setSwipedRow(null);
    setAddedExcersises([]);
  };

  const handleAddExercise = (exercise) => {
    const newAddedExercises = [...addedExcersises, exercise];
    // Mandar requests al microservicio despues
    const values = {};
    values.reps = exercise.reps;
    values.weight = exercise.weight;
    console.log(exercise);
    AddExcerciseToPlanRequest(plan.id, exercise.exercise.id, values);
    setAddedExcersises(newAddedExercises);
    setModalVisible(false);
  };
  const [exerciseToBeEdited, setExerciseToBeEdited] = useState(null);

  const handleTriggerEdit = (item) => {
    console.log(item);
    setExerciseToBeEdited(item);
    setExerciseSelected(item.exercise);
    setWeightInputValue(item.weight.toString());
    setRepsInputValue(item.reps.toString());
    setModalVisible(true);
  };

  const handleEditExercise = (editedExercise) => {
    const newExercises = [...addedExcersises];
    const exIndex = addedExcersises.findIndex((exercise) => exercise.key === editedExercise.key);
    newExercises.splice(exIndex, 1, editedExercise);
    // Aca editar ejercicio en backend.
    setAddedExcersises(newExercises);
    setModalVisible(false);
    setExerciseToBeEdited(null);
  };

  const handleOnExerciseChange = (name, newExercise) => {
    console.log('abc  ', newExercise);
    setExerciseSelected(newExercise);
  };

  return (
    <ExercisesInPlan
      addedExercises={addedExcersises}
      exerciseSelected={exerciseSelected}
      exerciseToBeEdited={exerciseToBeEdited}
      modalVisible={modalVisible}
      setAddedExercises={setAddedExcersises}
      setExerciseToBeEdited={setExerciseToBeEdited}
      setModalVisible={setModalVisible}
      setExerciseSelected={setExerciseSelected}
      handleAddExercise={handleAddExercise}
      handleClearExercises={handleClearExercises}
      handleTriggerEdit={handleTriggerEdit}
      handleEditExercise={handleEditExercise}
      swipedRow={swipedRow}
      setSwipedRow={setSwipedRow}
      repsInputValue={repsInputValue}
      weightInputValue={weightInputValue}
      setRepsInputValue={setRepsInputValue}
      setWeightInputValue={setWeightInputValue}
      exercises={exercises}
      handleOnExerciseChange={handleOnExerciseChange}
      handleRemoveExercise={handleRemoveExercise}
    />
  );
}
ExercisesInPlanScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  route: shape({
    params: shape.isRequired
  }).isRequired
};
