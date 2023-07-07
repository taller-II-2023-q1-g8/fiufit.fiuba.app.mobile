import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';

import {
  fetchExercises,
  AddExcerciseToPlanRequest,
  fetchPlanExercises,
  removeExerciseFromPlan
} from '../../requests';

import { hasSelectedFilters } from './filtering';
import PlanExercises from './layout';

export default function PlanExercisesScreen({ route }) {
  const { plan } = route.params;
  const [exercises, setExercises] = useState([]);
  const [addedExcersises, setAddedExcersises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exercisesQuery, setExercisesQuery] = useState({
    title: '',
    muscles: ''
  });

  async function fetchData() {
    fetchExercises('')
      .then((response) => response.json())
      .then((fetchedExercises) => {
        setExercises(fetchedExercises);
        setFilteredExercises(fetchedExercises);
      });

    fetchPlanExercises(plan.id)
      .then((response) => response.json())
      .then((fetchedExercises) => {
        setAddedExcersises(fetchedExercises);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleItemPress = (exerciseID, reps, weight) => {
    const values = {};
    values.reps = reps;
    values.weight = weight;
    AddExcerciseToPlanRequest(plan.id, exerciseID, values);
  };

  const handleAddedItemPress = (exerciseID) => {
    removeExerciseFromPlan(plan.id, exerciseID);
  };

  return (
    <PlanExercises
      plan={plan}
      excersises={filteredExercises}
      addedExcersises={addedExcersises}
      handleOnTitleChange={handleOnTitleChange}
      handleOnMusclesChange={handleOnMusclesChange}
      handleItemPress={handleItemPress}
      handleAddedItemPress={handleAddedItemPress}
    />
  );
}

PlanExercisesScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};
