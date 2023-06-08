import React from 'react';
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

import { styles } from './styles';

function Item({ handleItemPress, itemData }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(itemData.id)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{itemData.title}</Text>
          <Text style={styles.profileType}>Plan de Entrenamiento</Text>
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

export default function SearchTrainingPlans({
  data,
  filters,
  handleOnTitleChange,
  handleItemPress,
  refreshing,
  onRefresh
}) {
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
          renderItem={({ item }) => <Item handleItemPress={handleItemPress} itemData={item} />}
          ItemSeparatorComponent={ItemSeparatorView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

Item.propTypes = {
  handleItemPress: func,
  itemData: object.isRequired
};

SearchTrainingPlans.propTypes = {
  data: array.isRequired,
  handleItemPress: func,
  handleOnTitleChange: func,
  filters: array,
  refreshing: bool,
  onRefresh: func
};
