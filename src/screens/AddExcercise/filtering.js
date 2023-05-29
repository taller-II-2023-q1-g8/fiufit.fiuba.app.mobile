const hasSelectedTitle = (title, exercise) => exercise.title.toLowerCase().includes(title.toLowerCase());

const hasSelectedMuscles = (muscles, exercise) =>
  exercise.muscles.toLowerCase().includes(muscles.toLowerCase());

export const hasSelectedFilters = (query, exercise) =>
  hasSelectedTitle(query.title, exercise) && hasSelectedMuscles(query.muscles, exercise);
