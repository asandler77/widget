/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CountDownTimer from './components/CountDownTimer';
import {BluredText} from './components/BluredText';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BluredText />
    </SafeAreaView>
  );
};

export default App;
