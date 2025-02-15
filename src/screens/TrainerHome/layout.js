import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { string, bool, func, array, object } from 'prop-types';

import texts from '../../texts';
import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';
import { getPlanPicURL } from '../../utils';

import { styles } from './styles';

const trainerHomeTexts = texts.TrainerHome;

function Item({ handleItemPress, itemData }) {
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(itemData.id);
    setPlanPicUrl(url);
  };

  useEffect(() => {
    fetchPlanPicUrl();
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(itemData)}>
      <View style={styles.item}>
        {planPicUrl !== null ? (
          <Image source={{ uri: planPicUrl }} style={styles.profilePic} />
        ) : (
          <Image source={manPic} style={styles.profilePic} />
        )}
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

export default function TrainerHome({ username, handleTrainerHome, data, handleItemPress, loading }) {
  return (
    <ImageBackground source={BackgroundImage}>
      <Loader loading={loading} />
      {!loading && (
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <Text style={styles.title}>{trainerHomeTexts.homeTitle}</Text>
            <Text style={{ color: colors.white }}>Bienvenido al inicio de entrenadores, {username}!</Text>
            <Text style={{ color: colors.white }}>Tus planes:</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => <Item handleItemPress={handleItemPress} itemData={item} />}
              ItemSeparatorComponent={ItemSeparatorView}
            />
            {/* <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleTrainerHome}>
                <Text style={styles.submitButtonText}>Ir a inicio de atleta</Text>
              </TouchableOpacity> */}
          </KeyboardAvoidingView>
        </View>
      )}
    </ImageBackground>
  );
}
Item.propTypes = {
  handleItemPress: func,
  itemData: object
};

TrainerHome.propTypes = {
  username: string.isRequired,
  handleTrainerHome: func.isRequired,
  data: array.isRequired,
  handleItemPress: func.isRequired,
  loading: bool.isRequired
};
