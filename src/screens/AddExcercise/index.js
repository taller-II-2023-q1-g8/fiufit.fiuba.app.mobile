import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';

import {
  fetchExercises,
  AddExcerciseToPlanRequest,
  fetchPlanExercises,
  removeExerciseFromPlan
} from '../../requests';

import { hasSelectedFilters } from './filtering';
import ChooseExercises from './layout';

export default function ChooseExercisesScreen({ route }) {
  const { planID } = route.params;
  const [exercises, setExercises] = useState([]);
  const [addedExcersises, setAddedExcersises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exercisesQuery, setExercisesQuery] = useState({
    title: '',
    muscles: ''
  });

  const filterData = (searchQuery) =>
    exercises.filter((exercise) => hasSelectedFilters(searchQuery, exercise));

  const handleOnTitleChange = (newTitleSearch) => {
    const newQuery = { ...exercisesQuery, title: newTitleSearch };
    setExercisesQuery(newQuery);
    setFilteredExercises(filterData(newQuery));
  };

  const handleOnMusclesChange = (newMusclesSearch) => {
    const newQuery = { ...exercisesQuery, muscles: newMusclesSearch };
    setExercisesQuery(newQuery);
    setFilteredExercises(filterData(newQuery));
  };

  const handleItemPress = (id, reps, weight) => {
    const values = {};
    values.reps = reps;
    values.weight = weight;
    AddExcerciseToPlanRequest(planID, id, values);
  };

  const handleAddedItemPress = (exerciseID) => {
    removeExerciseFromPlan(planID, exerciseID);
  };

  useEffect(() => {
    async function fetchData() {
      fetchExercises('')
        .then((response) => response.json())
        .then((fetchedExercises) => {
          setExercises(fetchedExercises);
          setFilteredExercises(fetchedExercises);
        });

      fetchPlanExercises(planID)
        .then((response) => response.json())
        .then((fetchedExercises) => {
          setAddedExcersises(fetchedExercises);
        });
    }

    fetchData();
  }, []);
  return (
    <ChooseExercises
      excersises={filteredExercises}
      addedExcersises={addedExcersises}
      handleOnTitleChange={handleOnTitleChange}
      handleOnMusclesChange={handleOnMusclesChange}
      handleItemPress={handleItemPress}
      handleAddedItemPress={handleAddedItemPress}
    />
  );
}

ChooseExercisesScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};
