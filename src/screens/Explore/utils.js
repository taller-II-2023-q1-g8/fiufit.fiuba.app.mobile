import React from 'react';

import GenericSelectField from '../../components/Fields/GenericSelectField';
import { colors } from '../../colors';

const difficultyOptions = [
  { label: 'Cualquiera', value: 'ANY' },
  { label: 'Fácil', value: 'EASY' },
  { label: 'Intermedio', value: 'NORMAL' },
  { label: 'Difícil', value: 'HARD' }
];

const trainingTypeOptions = [
  { label: 'Cualquiera', value: 'ANY' },
  { label: 'Brazos', value: 'ARMS' },
  { label: 'Pecho', value: 'CHEST' },
  { label: 'Piernas', value: 'LEGS' }
];

export const getFilters = (handleOnChange) => [
  <GenericSelectField
    containerStyle={{ display: 'flex', flexDirection: 'row' }}
    items={difficultyOptions}
    name="difficulty"
    onChangeText={handleOnChange}
    title=" Dificultad"
    titleStyle={{ fontWeight: 'bold', paddingTop: 18, color: colors.white }}
  />,
  <GenericSelectField
    containerStyle={{ display: 'flex', flexDirection: 'row' }}
    items={trainingTypeOptions}
    name="tag"
    onChangeText={handleOnChange}
    title=" Tipo de Entrenamiento"
    titleStyle={{ fontWeight: 'bold', paddingTop: 18, color: colors.white }}
  />
];
