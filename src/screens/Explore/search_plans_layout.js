import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  RefreshControl
} from 'react-native';
import { array, bool, func, object } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';
import { getPlanPicURL, getProfilePicURL } from '../../utils';

import { styles } from './styles';

function Item({ handleItemPress, plan }) {
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(plan.id);
    setPlanPicUrl(url);
  };

  useEffect(() => {
    fetchPlanPicUrl();
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(plan)}>
      <View style={styles.item}>
        {planPicUrl !== null ? (
          <Image source={{ uri: planPicUrl }} style={styles.planPicture} />
        ) : (
          <Image source={manPic} style={styles.planPicture} />
        )}
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{plan.title}</Text>
          <Text style={styles.profileType}>Likes: {plan.likes}</Text>
          <Text style={styles.profileType}>Calificación: {plan.average_calification}</Text>
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

function SearchTrainingPlans({ data, filters, handleOnTitleChange, handleItemPress }) {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField
          onChangeText={handleOnTitleChange}
          placeholder={texts.Fields.searchTrainingPlansPlaceholder}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 18, color: colors.white }}>Filtros</Text>
        {filters}
        <FlatList
          data={data}
          scrollv
          renderItem={({ item }) => <Item handleItemPress={handleItemPress} plan={item} />}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
export default React.memo(SearchTrainingPlans);

Item.propTypes = {
  handleItemPress: func,
  plan: object.isRequired
};

SearchTrainingPlans.propTypes = {
  data: array.isRequired,
  handleItemPress: func,
  handleOnTitleChange: func,
  filters: array
};
