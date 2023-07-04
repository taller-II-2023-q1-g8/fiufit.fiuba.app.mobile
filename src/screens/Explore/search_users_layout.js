import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { func, array, bool, object } from 'prop-types';

import texts from '../../texts';
import SearchField from '../../components/Fields/SearchField';
import { colors } from '../../colors';
import defaultProfPic from '../../assets/profile-pic-def.png';
import { getProfilePicURL } from '../../utils';
import GenericSelectField from '../../components/Fields/GenericSelectField';

import { styles } from './styles';
import TextField from '../../components/Fields/TextField';
import { phoneFieldType } from '../../components/Fields/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.profileName}>{user.username}</Text>
            {user.verification === 2 ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: colors.main_soft,
                  marginLeft: 10
                }}
              >
                <Ionicons name="checkmark" size={20} color={colors.white} />
              </View>
            ) : null}
          </View>
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

function SearchUsers({
  data,
  handleOnSearchChange,
  handleItemPress,
  handleOnRoleChange,
  filterUsers,
  handleOnDistanceChange
}) {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.formContainer} enabled>
        <SearchField onChangeText={handleOnSearchChange} placeholder={texts.Fields.searchUsersPlaceholder} />
        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 18, color: colors.white }}>Filtros</Text>
        <GenericSelectField
          titleStyle={{ fontWeight: 'bold', paddingTop: 18, color: colors.white }}
          containerStyle={{ display: 'flex', flexDirection: 'row' }}
          name="a"
          title=" Rol"
          items={roleOptions}
          onChangeText={handleOnRoleChange}
        />
        {filterUsers.rol === 'Trainer' ? (
          <TextField
            title={texts.Explore.distanceTitle}
            placeholder={texts.Explore.distancePlaceholder}
            keyboardType={phoneFieldType}
            onChangeText={handleOnDistanceChange}
          />
        ) : null}
        <FlatList
          data={data}
          renderItem={({ item }) => <Item handleItemPress={handleItemPress} user={item} />}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default React.memo(SearchUsers);

Item.propTypes = {
  handleItemPress: func,
  user: array
};

SearchUsers.propTypes = {
  data: array.isRequired,
  handleItemPress: func,
  handleOnSearchChange: func,
  handleOnRoleChange: func,
  filterUsers: object,
  handleOnDistanceChange: func
};
