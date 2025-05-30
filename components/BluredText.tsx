import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const BluredText = () => {
  return (
    <View style={styles.container}>
      <Text>I AM BLUUURED</Text>
      <Text>I'm the non blurred text because I got rendered on top</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // центр по вертикали
    alignItems: 'center', // центр по горизонтали
    backgroundColor: 'lightblue',
    flex: 1,
  },
});
