import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

export const BluredText = () => {
  return (
    <View style={styles.container}>
      <Image
        key={'blurryImage'}
        source={{
          uri: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
        }}
        style={styles.absolute}
      />
      <Text style={styles.absolute}>Hi, I am some blurred text</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Text>
        I'm the non blurred text because I got rendered on top of the BlurView
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
