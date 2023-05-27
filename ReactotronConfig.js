import Reactotron from 'reactotron-react-native';
import { NativeModules, AsyncStorage } from 'react-native';

import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: hostname })
  .useReactNative()
  .connect();

console.tron = tron;
