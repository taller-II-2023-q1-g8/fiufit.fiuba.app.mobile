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
import { StatusBar } from 'expo-status-bar';
import { string, func, array, bool } from 'prop-types';

import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';
import defaultProfPic from '../../assets/profile-pic-def.png';
import { getProfilePicURL } from '../../utils';
import GenericSelectField from '../../components/Fields/GenericSelectField';

import { styles } from './styles';

export function Item({ handleItemPress, user }) {
  const [profPicUrl, setProfPicUrl] = useState(null);
  const fetchProfPicUrl = async (searchedUsername) => {
    const url = await getProfilePicURL(searchedUsername);
    setProfPicUrl(url);
  };

  useEffect(() => {
    fetchProfPicUrl(user.username);
  }, [user]);

  return (
    <TouchableOpacity key={user.username} activeOpacity={0.8} onPress={() => handleItemPress(user.username)}>
      <View style={styles.item}>
        {profPicUrl !== null ? (
          <Image source={{ uri: profPicUrl }} style={styles.profilePic} />
        ) : (
          <Image source={defaultProfPic} style={styles.profilePic} />
        )}
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.profileType}>{user.role}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function ItemSeparatorView() {
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

const roleOptions = [
  { label: 'Cualquiera', value: 'Any' },
  { label: 'Atleta', value: 'Athlete' },
  { label: 'Entrenador', value: 'Trainer' }
];

export default function SearchUsers({
  data,
  handleOnSearchChange,
  handleItemPress,
  refreshing,
  onRefresh,
  handleOnRoleChange
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField onChangeText={handleOnSearchChange} placeholder={texts.Fields.searchUsersPlaceholder} />
        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 18 }}>Filtros</Text>
        <GenericSelectField
          titleStyle={{ fontWeight: 'bold', paddingTop: 18 }}
          containerStyle={{ display: 'flex', flexDirection: 'row' }}
          name="a"
          title=" Rol"
          items={roleOptions}
          onChangeText={handleOnRoleChange}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => <Item handleItemPress={handleItemPress} user={item} />}
          ItemSeparatorComponent={ItemSeparatorView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

Item.propTypes = {
  handleItemPress: func,
  user: array
};

SearchUsers.propTypes = {
  data: array.isRequired,
  handleItemPress: func,
  handleOnSearchChange: func,
  refreshing: bool,
  onRefresh: func,
  handleOnRoleChange: func
};
