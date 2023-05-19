import texts from '../../../texts';
import ICONS from '../../constants';

export const getAthleteTabBarIcon = (name) => {
  if (name === texts.Home.name) return ICONS.HOME;
  if (name === texts.SearchUsers.name) return ICONS.LIST;
  if (name === texts.SearchTrainingPlans.name) return ICONS.LIST;
  if (name === texts.UserProfile.name) return ICONS.PERSON;
};

export const getTrainerTabBarIcon = (name) => {
  if (name === texts.TrainerHome.iconTitle) return ICONS.HOME;
};
