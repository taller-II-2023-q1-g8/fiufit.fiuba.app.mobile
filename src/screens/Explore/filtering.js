// Filtering Training Plans
const hasSelectedDifficulty = (difficulty, plan) => difficulty === 'ANY' || difficulty === plan.difficulty;

const hasSelectedTag = (tag, plan) => tag === 'ANY' || plan.tags.includes(tag);

const hasSelectedTitle = (title, plan) => plan.title.toLowerCase().includes(title.toLowerCase());

export const hasSelectedFilters = (query, plan) =>
  hasSelectedTitle(query.title, plan) &&
  hasSelectedDifficulty(query.difficulty, plan) &&
  hasSelectedTag(query.tag, plan);
