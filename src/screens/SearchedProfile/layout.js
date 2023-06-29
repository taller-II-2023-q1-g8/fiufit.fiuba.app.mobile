import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { bool, func, object, string } from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, orderBy, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

import defaultProfPic from '../../assets/profile-pic-def.png';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import manPic from '../../assets/man.jpeg';
import msgIcon from '../../assets/msg-icon.png';
import texts from '../../texts';
import { db } from '../../../firebaseConfig';
import { useStateValue } from '../../state';

import { styles } from './styles';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 170;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight
});

function dateToDisplayString(date) {
  const now = new Date();
  const milisegundosPasados = now - date;
  const segundosPasados = Math.floor(milisegundosPasados / 1000);
  const minutosPasados = Math.floor(segundosPasados / 60);
  const horasPasadas = Math.floor(minutosPasados / 60);
  const diasPasados = Math.floor(horasPasadas / 24);
  const semanasPasadas = Math.floor(diasPasados / 7);
  const mesesPasados = Math.floor(diasPasados / 30);

  if (segundosPasados < 60) {
    return `Hace ${segundosPasados} segundos`;
  }
  if (minutosPasados < 60) {
    return `Hace ${minutosPasados} minutos`;
  }
  if (horasPasadas < 24) {
    return `Hace ${horasPasadas} horas`;
  }
  if (diasPasados < 7) {
    return `Hace ${diasPasados} días`;
  }
  if (semanasPasadas < 5) {
    return `Hace ${semanasPasadas} semanas`;
  }
  if (mesesPasados < 12) {
    return `Hace ${mesesPasados} meses`;
  }

  return 'Hace más de un año';
}

function ItemSeparator() {
  return <View style={{ height: 10 }} />;
}

function SearchedProfile({
  data,
  profPicUrl,
  loading,
  handleFollowPress,
  handleUnfollowPress,
  following,
  handleTrainingPress,
  handleChatPress
}) {
  /**
   * stats
   */
  const [tabIndex, setIndex] = useState(0);
  /*
  const [routes] = useState([
    { key: 'tab1', title: 'Entrenamientos' },
    { key: 'tab2', title: 'Feed' }
  ]);
  */
  const [routes] =
    data.role === 'Trainer'
      ? useState([
          { key: 'tab1', title: 'Entrenamientos' },
          { key: 'tab2', title: 'Feed' }
        ])
      : useState([{ key: 'tab2', title: 'Feed' }]);
  const [canScroll, setCanScroll] = useState(true);

  /**
   * ref
   */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const tabIndexRef = useRef(0);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndexRef.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (listOffset.current[item.key] < HeaderHeight || listOffset.current[item.key] == null) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };
  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach((item) => {
          if (item.key !== routes[tabIndexRef.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      }
    })
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      }
    })
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  /**
   *  helper functions
   */

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  /**
   * render Helper
   */
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolate: 'clamp'
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, { transform: [{ translateY: y }] }]}
      >
        {profPicUrl !== null ? (
          <Image source={{ uri: profPicUrl }} style={styles.profilePicture} />
        ) : (
          <Image source={defaultProfPic} style={styles.profilePicture} />
        )}
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent: 'space-between',
              width: '75%'
            }}
          >
            <Text style={styles.username}>{`${data.firstname} ${data.lastname || ''}`}</Text>
            {following ? (
              <TouchableOpacity
                style={styles.unfollowButton}
                activeOpacity={0.5}
                onPress={handleUnfollowPress}
              >
                <Text style={styles.follow}>Dejar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.followButton} activeOpacity={0.5} onPress={handleFollowPress}>
                <Text style={styles.follow}>Seguir</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ marginRight: 30 }}>
              <Text style={styles.followersText}>{data.followers}</Text>
              <Text style={styles.followersText}>followers</Text>
            </View>
            <View styles={{ marginRight: 20 }}>
              <Text style={styles.followersText}>{data.followed}</Text>
              <Text style={styles.followersText}>following</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleChatPress(data.username, profPicUrl)}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={40}
                color={colors.white}
                style={{ marginLeft: 25 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20, tintColor: colors.white }} source={TrainerIcon} />
            <Text style={{ color: colors.white }}>{data.role}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const rednerTab1Item = ({ item, index }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleTrainingPress(item)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{item.title}</Text>
          <Text style={styles.profileType}>Dificultad {item.difficulty} </Text>
          <Text style={styles.profileType}>Tags {item.tags} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const rednerTab2Item = ({ item, index }) => (
    <View style={styles.trainingCompletedContainer}>
      <View style={styles.trainingCompletedBody}>
        <View style={styles.planInfoContainer}>
          <View style={styles.planDetails}>
            <Text style={styles.planCompletedText}>Plan completado: {dateToDisplayString(item.date)}</Text>
            <Text style={styles.planName}>{item.title}</Text>
            <Text style={styles.planDifficulty}>Dificultad: Díficil</Text>
            <Text style={styles.planDifficulty}>Tags: Ejemplo Ejemplo2</Text>
            <Text style={styles.planDifficulty}>Músculos: Abs</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(item)}>
            <Image source={manPic} style={styles.planImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderLabel = ({ route, focused }) => (
    <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>{route.title}</Text>
  );

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let dataToRender;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        dataToRender = data.createdPlans;
        renderItem = rednerTab1Item;
        break;
      case 'tab2':
        dataToRender = data.completedPlans;
        renderItem = rednerTab2Item;
        break;
      default:
        return null;
    }
    if (data.role === 'Athlete') {
      dataToRender = data.completedPlans;
      renderItem = rednerTab2Item;
    }
    return (
      <Animated.FlatList
        // scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={1}
        ref={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: scrollY } }
                  }
                ],
                { useNativeDriver: true }
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={ItemSeparator}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 10,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight
        }}
        showsHorizontalScrollIndicator={false}
        data={dataToRender}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolate: 'clamp'
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{ translateY: y }],
          width: '100%'
        }}
      >
        <TabBar
          {...props}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          tabStyle={{ borderRightWidth: 1, borderLeftWidth: 1 }}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => (
    <TabView
      onSwipeStart={() => setCanScroll(false)}
      onSwipeEnd={() => setCanScroll(true)}
      onIndexChange={(id) => {
        tabIndexRef.current = id;
        setIndex(id);
      }}
      navigationState={{ index: tabIndex, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      initialLayout={{
        height: 0,
        width: windowWidth
      }}
    />
  );

  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
}

SearchedProfile.propTypes = {
  data: object,
  profPicUrl: string,
  loading: bool,
  handleFollowPress: func,
  handleUnfollowPress: func,
  following: bool,
  handleTrainingPress: func,
  handleChatPress: func
};
export default SearchedProfile;
