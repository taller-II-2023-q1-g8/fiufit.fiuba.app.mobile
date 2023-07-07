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

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
