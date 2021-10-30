import React, { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import { useAnimation } from '../hooks/useAnimation';

interface Props {
  uri: any;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} }: Props) => {
  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.error(err);
    setIsLoading(false);
  };

  return (
    <View
      style={{
        ...styles.activityContainer,
        ...(style as StyleProp<any>),
      }}>
      {isLoading && (
        <ActivityIndicator
          style={{ ...styles.activityIndicator }}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{ uri }}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as StyleProp<any>),
          opacity,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  activityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
});
